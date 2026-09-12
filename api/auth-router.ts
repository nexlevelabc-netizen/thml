import * as cookie from "cookie";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, authedQuery, adminQuery, publicQuery } from "./middleware";
import { signAdminSession } from "./kimi/auth";
import { getDb } from "./queries/connection";
import { adminUsers } from "../db/schema";

const SALT_ROUNDS = 10;

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),

  // Dedicated admin sign-in: checks env vars first (backward compat), then DB users
  login: publicQuery
    .input(z.object({ username: z.string().min(1), password: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const username = input.username.trim().toLowerCase();
      const password = input.password;

      // 1) Check env var credentials (master admin, always works)
      const envUser = process.env.ADMIN_USERNAME || "";
      const envPass = process.env.ADMIN_PASSWORD || "";
      if (envUser && envPass && username === envUser.toLowerCase() && password === envPass) {
        const token = await signAdminSession(`admin:${envUser}`, "Administrator");
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
      }

      // 2) Check database admin users
      const db = await getDb();
      const [user] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, username))
        .limit(1);

      if (!user || !user.isActive) {
        await new Promise((r) => setTimeout(r, 600));
        return { success: false as const };
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        await new Promise((r) => setTimeout(r, 600));
        return { success: false as const };
      }

      const token = await signAdminSession(`admin:${user.username}`, user.displayName || user.username);
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

  // ===== Admin user management =====

  // List all admin users (current admin only)
  listAdminUsers: adminQuery.query(async () => {
    const db = await getDb();
    const users = await db
      .select({
        id: adminUsers.id,
        username: adminUsers.username,
        displayName: adminUsers.displayName,
        isActive: adminUsers.isActive,
        createdAt: adminUsers.createdAt,
      })
      .from(adminUsers);
    return users;
  }),

  // Create a new admin user
  createAdminUser: adminQuery
    .input(
      z.object({
        username: z.string().min(3).max(100).regex(/^[a-zA-Z0-9_-]+$/),
        password: z.string().min(8),
        displayName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      const username = input.username.trim().toLowerCase();
      
      // Check if username already exists
      const [existing] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, username))
        .limit(1);
      
      if (existing) {
        throw new Error("Username already exists");
      }

      const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
      
      const [newUser] = await db
        .insert(adminUsers)
        .values({
          username,
          passwordHash,
          displayName: input.displayName || username,
          isActive: 1,
        })
        .returning({ id: adminUsers.id, username: adminUsers.username });

      return { success: true, user: newUser };
    }),

  // Update admin user (change password, toggle active)
  updateAdminUser: adminQuery
    .input(
      z.object({
        id: z.number(),
        password: z.string().min(8).optional(),
        displayName: z.string().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      const updates: Record<string, unknown> = {};

      if (input.password) {
        updates.passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
      }
      if (input.displayName !== undefined) {
        updates.displayName = input.displayName;
      }
      if (input.isActive !== undefined) {
        updates.isActive = input.isActive ? 1 : 0;
      }

      if (Object.keys(updates).length === 0) {
        return { success: true };
      }

      await db
        .update(adminUsers)
        .set(updates)
        .where(eq(adminUsers.id, input.id));

      return { success: true };
    }),

  // Delete an admin user
  deleteAdminUser: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(adminUsers).where(eq(adminUsers.id, input.id));
      return { success: true };
    }),

  // Change own password (for the currently logged-in admin)
  changeOwnPassword: authedQuery
    .input(
      z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.user;
      if (!currentUser?.unionId?.startsWith("admin:")) {
        throw new Error("Not an admin user");
      }

      const username = currentUser.unionId.replace("admin:", "").toLowerCase();
      const db = await getDb();

      // Check if this is the env-var master admin
      const envUser = process.env.ADMIN_USERNAME || "";
      const envPass = process.env.ADMIN_PASSWORD || "";
      
      if (username === envUser.toLowerCase()) {
        // Master admin changing password via env - verify current, then can't change (it's env-based)
        // For now, return error saying env-based password can't be changed here
        if (input.currentPassword !== envPass) {
          throw new Error("Current password is incorrect");
        }
        throw new Error("The master admin password is set via environment variables. Please update ADMIN_PASSWORD in your Render environment settings.");
      }

      // Database user changing own password
      const [user] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, username))
        .limit(1);

      if (!user) {
        throw new Error("User not found");
      }

      const valid = await bcrypt.compare(input.currentPassword, user.passwordHash);
      if (!valid) {
        throw new Error("Current password is incorrect");
      }

      const newHash = await bcrypt.hash(input.newPassword, SALT_ROUNDS);
      await db
        .update(adminUsers)
        .set({ passwordHash: newHash })
        .where(eq(adminUsers.id, user.id));

      return { success: true };
    }),
});
