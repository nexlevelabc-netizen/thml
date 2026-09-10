# THML — Thames Housing Management Ltd

Company website for Thames Housing Management Ltd, the wholly owned trading
subsidiary of 25th Avenue Housing Ltd. Public site plus an admin panel for
jobs, news, documents, events and media (images and video).

## Stack

- React 19, TypeScript, Vite, Tailwind CSS
- Hono + tRPC backend
- Postgres database via Drizzle ORM (Neon)
- Media uploads to AWS S3 (with local-disk fallback for development)
- Kimi OAuth sign-in for the admin panel

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the admin panel is at http://localhost:3000/#/admin

Create your local `.env` from `.env.example` and fill in the values
(ask the project maintainer for the Kimi OAuth credentials).

## Deployment (Neon + AWS S3 + GitHub + Render)

### 1. Database — Neon

1. Sign in at https://neon.tech and click **New Project**.
2. Name it `thml`, pick the region closest to your visitors (e.g. London /
   eu-west-2), keep the free plan, and create it.
3. On the project dashboard, copy the **connection string**. It looks like:
   `postgresql://user:password@ep-xxxx.eu-west-2.aws.neon.tech/neondb?sslmode=require`
4. Rename the database if you like (optional) and keep the string safe.

### 2. Media storage — AWS S3

1. In the AWS console, open **S3 → Create bucket**. Name it e.g. `thml-media`,
   region `eu-west-2` (London). Untick **Block all public access** and confirm
   (uploaded media needs to be publicly readable to appear on the site).
2. After creation, open the bucket → **Permissions → Bucket policy** and add:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicRead",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::thml-media/*"
       }
     ]
   }
   ```

3. Still under **Permissions → CORS**, add (needed for browser uploads):

   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["PUT"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": ["ETag"]
     }
   ]
   ```

   (Once the site is live, replace `"*"` in AllowedOrigins with your real
   domain, e.g. `"https://thml.onrender.com"`.)

4. Open **IAM → Users → Create user** (name: `thml-uploader`). Attach an
   inline policy:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::thml-media/*"
       }
     ]
   }
   ```

5. Open the user → **Security credentials → Create access key** → choose
   "Application running outside AWS". Copy the **Access key ID** and
   **Secret access key**.

### 3. Code — GitHub

1. Create a new **private** repository (e.g. `thml-website`).
2. Push this folder. Easiest with GitHub Desktop: *Add local repository →
   choose this folder → Publish repository*. Or with git:

   ```bash
   git init
   git add .
   git commit -m "THML website"
   git remote add origin https://github.com/YOUR-USERNAME/thml-website.git
   git push -u origin main
   ```

   `.env` is git-ignored and will not be uploaded — credentials stay local.

### 4. Hosting — Render

1. Sign in at https://render.com → **New → Web Service** → connect your
   GitHub account and pick the `thml-website` repository.
2. Settings:
   - **Runtime**: Docker (the included Dockerfile is used automatically)
   - **Region**: London (or closest)
   - **Plan**: Free works; Starter keeps it always-on (free instances sleep
     after 15 minutes idle and take ~30 seconds to wake).
3. Under **Environment**, add these variables:

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | the Neon connection string from step 1 |
   | `S3_BUCKET` | your bucket name, e.g. `thml-media` |
   | `S3_REGION` | `eu-west-2` |
   | `AWS_ACCESS_KEY_ID` | from step 2 |
   | `AWS_SECRET_ACCESS_KEY` | from step 2 |
   | `APP_ID` | Kimi OAuth app id (from project maintainer) |
   | `APP_SECRET` | Kimi OAuth secret (from project maintainer) |
   | `VITE_APP_ID` | same as `APP_ID` |
   | `VITE_KIMI_AUTH_URL` | from project maintainer |
   | `KIMI_AUTH_URL` | from project maintainer |
   | `KIMI_OPEN_URL` | from project maintainer |
   | `OWNER_UNION_ID` | from project maintainer |
   | `ADMIN_USERNAME` | admin panel username, e.g. `thmladmin` |
   | `ADMIN_PASSWORD` | admin panel password (choose a strong one) |

4. Click **Deploy**. First deploy takes a few minutes.

### 5. First-time database setup

After the first successful deploy, create the tables and load the starter
content. Locally (with `.env` containing the Neon `DATABASE_URL`):

```bash
npm run db:push
npx tsx db/seed.ts
```

Or run the same two commands in the Render **Shell** tab of the web service.

### 6. Using the admin panel

1. Visit `https://your-render-url/#/login` — the dedicated admin login page.
2. Sign in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in Render.
3. Jobs, news and events have a **Draft / Live** switch — only Live items
   appear on the public site.
4. Uploaded images and videos are stored in S3 and served from there;
   nothing is lost when Render redeploys.

### Custom domain (optional)

Render: **Settings → Custom Domains → Add** your domain, then create the
DNS records Render shows you at your domain registrar. HTTPS is automatic.

## Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server (http://localhost:3000) |
| `npm run build` | Production build into `dist/` |
| `npm start` | Run the production build (Linux/Mac; on Windows run `set NODE_ENV=production` then `node dist\boot.js`) |
| `npm run check` | TypeScript type-check |
| `npm run db:push` | Sync `db/schema.ts` to the database |
| `npx tsx db/seed.ts` | Load starter jobs and news (skips if data exists) |
