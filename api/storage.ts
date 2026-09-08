import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3-backed media storage. Enabled when S3_BUCKET, S3_REGION (or AWS_REGION),
// AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are all set. When not enabled,
// the admin UI falls back to the local /api/upload endpoint (public/uploads/).

const ALLOWED_EXT = new Set([
  "png", "jpg", "jpeg", "webp", "gif", "mp4", "webm", "mov", "pdf",
]);

const bucket = process.env.S3_BUCKET || "";
const region = process.env.S3_REGION || process.env.AWS_REGION || "";

export function s3Enabled() {
  return Boolean(
    bucket &&
      region &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY,
  );
}

export function publicBase() {
  if (process.env.MEDIA_PUBLIC_BASE) return process.env.MEDIA_PUBLIC_BASE;
  if (bucket && region) return `https://${bucket}.s3.${region}.amazonaws.com`;
  return "";
}

let client: S3Client | undefined;
function getClient() {
  if (!client) client = new S3Client({ region });
  return client;
}

export function safeExtension(fileName: string) {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    throw new Error(`File type .${ext} is not allowed`);
  }
  return ext;
}

export async function createPresignedUpload(ext: string, contentType: string) {
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(getClient(), command, { expiresIn: 600 });
  return { key, uploadUrl, publicUrl: `${publicBase()}/${key}` };
}

export async function deleteByPublicUrl(url: string) {
  const base = publicBase();
  if (!s3Enabled() || !base || !url.startsWith(`${base}/`)) return;
  const key = url.slice(base.length + 1);
  try {
    await getClient().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  } catch {
    // best effort: never block a content delete on storage cleanup
  }
}
