import { z } from "zod";
import { eq, desc, isNotNull } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { jobs, news, documents, events, media } from "@db/schema";
import { s3Enabled, safeExtension, createPresignedUpload, deleteByPublicUrl } from "./storage";
import { sendContactEmail, sendQuoteEmail, sendPropertyEnquiryEmail } from "./email";

const published = z.enum(["draft", "live"]);

const jobInput = z.object({
  title: z.string().min(2),
  location: z.string().min(2),
  type: z.string().min(2),
  closingDate: z.string().min(2),
  summary: z.string().min(2),
  overview: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  published,
});

const newsInput = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  date: z.string().min(2),
  excerpt: z.string().min(2),
  body: z.string().optional(),
  imageUrl: z.string().optional(),
  published,
});

const documentInput = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  description: z.string().optional(),
  fileUrl: z.string().min(1),
  fileName: z.string().min(1),
  fileSize: z.string().optional(),
});

const eventInput = z.object({
  title: z.string().min(2),
  date: z.string().min(2),
  time: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  published,
});

const mediaInput = z.object({
  kind: z.enum(["image", "video"]),
  title: z.string().min(1),
  url: z.string().min(1),
  mime: z.string().optional(),
  sizeBytes: z.string().optional(),
  eventId: z.number().optional(),
});

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 7)
  );
}

export const contentRouter = createRouter({
  // ------- public reads (live only) -------
  jobsPublic: publicQuery.query(() =>
    getDb().select().from(jobs).where(eq(jobs.published, "live")).orderBy(desc(jobs.createdAt)),
  ),
  newsPublic: publicQuery.query(() =>
    getDb().select().from(news).where(eq(news.published, "live")).orderBy(desc(news.createdAt)),
  ),
  eventsPublic: publicQuery.query(() =>
    getDb().select().from(events).where(eq(events.published, "live")).orderBy(desc(events.createdAt)),
  ),
  documentsPublic: publicQuery.query(() =>
    getDb().select().from(documents).orderBy(desc(documents.createdAt)),
  ),
  eventMediaPublic: publicQuery.query(() =>
    getDb().select().from(media).where(isNotNull(media.eventId)).orderBy(desc(media.createdAt)),
  ),

  // ------- form submissions (public, sends emails) -------
  submitContact: publicQuery
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      type: z.string().min(1),
      subject: z.string().optional(),
      message: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      await sendContactEmail(input);
      return { success: true };
    }),

  submitQuote: publicQuery
    .input(z.object({
      name: z.string().min(1),
      company: z.string().optional(),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string().min(1),
      address: z.string().optional(),
      description: z.string().min(1),
      timeframe: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await sendQuoteEmail(input);
      return { success: true };
    }),

  submitPropertyEnquiry: publicQuery
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      propertyTitle: z.string().min(1),
      message: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await sendPropertyEnquiryEmail(input);
      return { success: true };
    }),

  // ------- admin lists -------
  jobsAll: adminQuery.query(() => getDb().select().from(jobs).orderBy(desc(jobs.createdAt))),
  newsAll: adminQuery.query(() => getDb().select().from(news).orderBy(desc(news.createdAt))),
  documentsAll: adminQuery.query(() => getDb().select().from(documents).orderBy(desc(documents.createdAt))),
  eventsAll: adminQuery.query(() => getDb().select().from(events).orderBy(desc(events.createdAt))),
  mediaAll: adminQuery.query(() => getDb().select().from(media).orderBy(desc(media.createdAt))),

  // ------- jobs -------
  createJob: adminQuery.input(jobInput).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(jobs).values({ ...input, slug: slugify(input.title) }).returning({ id: jobs.id });
    return { id };
  }),
  updateJob: adminQuery.input(jobInput.extend({ id: z.number() })).mutation(async ({ input }) => {
    const { id, ...data } = input;
    await getDb().update(jobs).set(data).where(eq(jobs.id, id));
  }),
  deleteJob: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await getDb().delete(jobs).where(eq(jobs.id, input.id));
  }),

  // ------- news -------
  createNews: adminQuery.input(newsInput).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(news).values({ ...input, slug: slugify(input.title) }).returning({ id: news.id });
    return { id };
  }),
  updateNews: adminQuery.input(newsInput.extend({ id: z.number() })).mutation(async ({ input }) => {
    const { id, ...data } = input;
    await getDb().update(news).set(data).where(eq(news.id, id));
  }),
  deleteNews: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await getDb().delete(news).where(eq(news.id, input.id));
  }),

  // ------- uploads -------
  // Returns a presigned S3 URL when S3 is configured, otherwise tells the
  // client to fall back to the local /api/upload endpoint.
  createUploadUrl: adminQuery
    .input(z.object({ fileName: z.string().min(1), contentType: z.string().min(1) }))
    .mutation(async ({ input }) => {
      if (!s3Enabled()) return { mode: "local" as const };
      const ext = safeExtension(input.fileName);
      const { uploadUrl, publicUrl, key } = await createPresignedUpload(ext, input.contentType);
      return { mode: "s3" as const, uploadUrl, publicUrl, fileName: key.split("/").pop()! };
    }),

  // ------- documents -------
  createDocument: adminQuery.input(documentInput).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(documents).values(input).returning({ id: documents.id });
    return { id };
  }),
  updateDocument: adminQuery.input(documentInput.extend({ id: z.number() })).mutation(async ({ input }) => {
    const { id, ...data } = input;
    await getDb().update(documents).set(data).where(eq(documents.id, id));
  }),
  deleteDocument: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const [row] = await getDb().select().from(documents).where(eq(documents.id, input.id));
    if (row) await deleteByPublicUrl(row.fileUrl);
    await getDb().delete(documents).where(eq(documents.id, input.id));
  }),

  // ------- events -------
  createEvent: adminQuery.input(eventInput).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(events).values(input).returning({ id: events.id });
    return { id };
  }),
  updateEvent: adminQuery.input(eventInput.extend({ id: z.number() })).mutation(async ({ input }) => {
    const { id, ...data } = input;
    await getDb().update(events).set(data).where(eq(events.id, id));
  }),
  deleteEvent: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await getDb().delete(events).where(eq(events.id, input.id));
  }),

  // ------- media -------
  createMedia: adminQuery.input(mediaInput).mutation(async ({ input }) => {
    const [{ id }] = await getDb().insert(media).values(input).returning({ id: media.id });
    return { id };
  }),
  deleteMedia: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const [row] = await getDb().select().from(media).where(eq(media.id, input.id));
    if (row) await deleteByPublicUrl(row.url);
    await getDb().delete(media).where(eq(media.id, input.id));
  }),
});
