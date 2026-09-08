import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const publishedEnum = pgEnum("published", ["draft", "live"]);
export const mediaKindEnum = pgEnum("media_kind", ["image", "video"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const jobs = pgTable("jobs", {
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
  published: publishedEnum("published").default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});
export type Job = typeof jobs.$inferSelect;

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 60 }).notNull(),
  date: varchar("date", { length: 60 }).notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body"),
  imageUrl: text("imageUrl"),
  published: publishedEnum("published").default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});
export type NewsItem = typeof news.$inferSelect;

export const documents = pgTable("documents", {
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

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  date: varchar("date", { length: 60 }).notNull(),
  time: varchar("time", { length: 60 }),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  published: publishedEnum("published").default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});
export type Event = typeof events.$inferSelect;

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  kind: mediaKindEnum("kind").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  mime: varchar("mime", { length: 120 }),
  sizeBytes: varchar("sizeBytes", { length: 40 }),
  eventId: integer("eventId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Media = typeof media.$inferSelect;
