import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const jobs = mysqlTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  location: varchar("location", { length: 255 }).notNull(),
  type: varchar("type", { length: 120 }).notNull(),
  closingDate: varchar("closingDate", { length: 60 }).notNull(),
  summary: text("summary").notNull(),
  overview: text("overview"),
  responsibilities: text("responsibilities"),
  requirements: text("requirements"),
  published: mysqlEnum("published", ["draft", "live"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});
export type Job = typeof jobs.$inferSelect;

export const news = mysqlTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 60 }).notNull(),
  date: varchar("date", { length: 60 }).notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body"),
  imageUrl: text("imageUrl"),
  published: mysqlEnum("published", ["draft", "live"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});
export type NewsItem = typeof news.$inferSelect;

export const documents = mysqlTable("documents", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  description: text("description"),
  fileUrl: text("fileUrl").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileSize: varchar("fileSize", { length: 40 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Document = typeof documents.$inferSelect;

export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  date: varchar("date", { length: 60 }).notNull(),
  time: varchar("time", { length: 60 }),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  published: mysqlEnum("published", ["draft", "live"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});
export type Event = typeof events.$inferSelect;

export const media = mysqlTable("media", {
  id: serial("id").primaryKey(),
  kind: mysqlEnum("kind", ["image", "video"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  mime: varchar("mime", { length: 120 }),
  sizeBytes: varchar("sizeBytes", { length: 40 }),
  eventId: bigint("eventId", { mode: "number", unsigned: true }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Media = typeof media.$inferSelect;

// (content tables above) See docs/Database.md for schema examples and patterns.
//
// Example:
// export const posts = mysqlTable("posts", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   content: text("content"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });
//
// Note: FK columns referencing a serial() PK must use:
//   bigint("columnName", { mode: "number", unsigned: true }).notNull()
