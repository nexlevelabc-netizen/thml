import { getDb } from "../api/queries/connection";
import { jobs, news } from "./schema";
import { NEWS, VACANCIES } from "../src/data/content";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  const existingJobs = await db.select().from(jobs).limit(1);
  if (existingJobs.length === 0) {
    await db.insert(jobs).values(
      VACANCIES.map((v) => ({
        title: v.title,
        slug: v.slug,
        location: v.location,
        type: v.type,
        closingDate: v.closing,
        summary: v.overview,
        overview: v.overview,
        responsibilities: v.responsibilities.join("\n"),
        requirements: v.requirements.join("\n"),
        published: "live" as const,
      })),
    );
    console.log(`Seeded ${VACANCIES.length} jobs.`);
  } else {
    console.log("Jobs already present, skipping.");
  }

  const existingNews = await db.select().from(news).limit(1);
  if (existingNews.length === 0) {
    await db.insert(news).values(
      NEWS.map((n) => ({
        title: n.title,
        slug: n.slug,
        category: n.category,
        date: n.date,
        excerpt: n.intro,
        body: n.body.join("\n\n"),
        imageUrl: n.image || null,
        published: "live" as const,
      })),
    );
    console.log(`Seeded ${NEWS.length} news articles.`);
  } else {
    console.log("News already present, skipping.");
  }

  console.log("Done.");
  process.exit(0); // close MySQL connection pool
}

seed();
