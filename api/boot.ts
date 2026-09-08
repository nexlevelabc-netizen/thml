import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler, authenticateRequest } from "./kimi/auth";
import { Paths } from "@contracts/constants";
import path from "path";
import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 220 * 1024 * 1024 }));
app.get(Paths.oauthCallback, createOAuthCallbackHandler());

// Admin media upload (images, videos, documents)
const UPLOAD_DIR = path.resolve(import.meta.dirname, "../public/uploads");
const EXT_RE = /^\.(png|jpe?g|webp|gif|mp4|webm|mov|pdf)$/i;

app.post("/api/upload", async (c) => {
  try {
    const user = await authenticateRequest(c.req.raw.headers);
    if (!user || user.role !== "admin") {
      return c.json({ error: "Forbidden" }, 403);
    }
  } catch {
    return c.json({ error: "Unauthenticated" }, 401);
  }

  const form = await c.req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return c.json({ error: "No file" }, 400);
  }
  const ext = path.extname(file.name || "").toLowerCase();
  if (!EXT_RE.test(ext)) {
    return c.json({ error: "Unsupported file type" }, 415);
  }
  const name = `${Date.now()}-${randomBytes(5).toString("hex")}${ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return c.json({ url: `/uploads/${name}`, fileName: file.name, size: file.size, mime: file.type });
});

app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStatic } = await import("@hono/node-server/serve-static");
  const { serveStaticFiles } = await import("./lib/vite");
  // serve uploaded media from the persistent uploads directory
  app.use("/uploads/*", serveStatic({ root: "./public" }));
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
