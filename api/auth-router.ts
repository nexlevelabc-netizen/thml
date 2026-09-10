import * as cookie from "cookie";
import { z } from "zod";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, authedQuery, publicQuery } from "./middleware";
import { signAdminSession } from "./kimi/auth";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),

  // Dedicated admin sign-in: credentials live in ADMIN_USERNAME /
  // ADMIN_PASSWORD env vars, so the client never touches the OAuth flow.
  login: publicQuery
    .input(z.object({ username: z.string().min(1), password: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const expectedUser = process.env.ADMIN_USERNAME || "";
      const expectedPass = process.env.ADMIN_PASSWORD || "";
      const ok =
        expectedUser &&
        expectedPass &&
        input.username.trim().toLowerCase() === expectedUser.toLowerCase() &&
        input.password === expectedPass;
      if (!ok) {
        // uniform delay so wrong credentials and missing config look identical
        await new Promise((r) => setTimeout(r, 600));
        return { success: false as const };
      }
      const token = await signAdminSession(`admin:${expectedUser}`, "Administrator");
      const opts = getSessionCookieOptions(ctx.req.headers);
      ctx.resHeaders.append(
        "set-cookie",
        cookie.serialize(Session.cookieName, token, {
          httpOnly: opts.httpOnly,
          path: opts.path,
          sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
          secure: opts.secure,
          maxAge: Session.maxAgeMs / 1000,
        }),
      );
      return { success: true as const };
    }),

  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),
});
