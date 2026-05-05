/// <reference types="@cloudflare/workers-types" />

import type { Context } from "hono";
import type { AppEnv } from "../hono/appEnv";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const PREFIX_SET = new Set(["courses", "tournaments", "news", "carousel"]);
const MAX_BYTES = 12 * 1024 * 1024;

function extForMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

function sanitizeKeySegments(key: string): boolean {
  if (!key.trim() || key.startsWith("/")) return false;
  const parts = key.split("/").filter(Boolean);
  if (parts.length < 2) return false;
  return parts.every((p) => p !== ".." && !p.includes("\\"));
}

export async function postUpload(c: Context<AppEnv>) {
  const bucket = c.env.MEDIA_BUCKET;
  if (!bucket) {
    return c.json({ message: "Media storage not configured" }, 503);
  }

  try {
    const form = await c.req.formData();
    const file = form.get("file");
    const prefixRaw = form.get("prefix");

    const prefix =
      typeof prefixRaw === "string" ? prefixRaw.trim() : String(prefixRaw ?? "");
    if (!PREFIX_SET.has(prefix)) {
      return c.json(
        { message: "prefix must be courses, tournaments, news, or carousel" },
        400
      );
    }

    if (!file || typeof file === "string" || !(file instanceof File)) {
      return c.json({ message: "file field with image data is required" }, 400);
    }

    const mime = (file.type || "").toLowerCase();
    if (!ALLOWED_TYPES.has(mime)) {
      return c.json(
        {
          message: "Only JPEG, PNG, WebP, and GIF images are allowed",
        },
        400
      );
    }

    const buf = await file.arrayBuffer();
    if (buf.byteLength === 0 || buf.byteLength > MAX_BYTES) {
      return c.json({ message: "Image must be non-empty and at most 12MB" }, 400);
    }

    const id = crypto.randomUUID();
    const ext = extForMime(mime);
    const key = `${prefix}/${id}.${ext}`;
    await bucket.put(key, buf, { httpMetadata: { contentType: mime } });

    const origin = new URL(c.req.url).origin;
    const url = `${origin}/api/uploads/${key}`;
    return c.json({ url, key });
  } catch (e) {
    console.error("Upload error:", e);
    return c.json({ message: "Upload failed" }, 500);
  }
}

export async function getUpload(c: Context<AppEnv>) {
  const bucket = c.env.MEDIA_BUCKET;
  if (!bucket) {
    return c.json({ message: "Media storage not configured" }, 503);
  }

  const key = c.req.param("key") || "";
  if (!sanitizeKeySegments(key)) {
    return c.json({ message: "Not found" }, 404);
  }

  const obj = await bucket.get(key);
  if (!obj) {
    return c.json({ message: "Not found" }, 404);
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  const body = obj.body;
  if (!body) {
    return c.json({ message: "Not found" }, 404);
  }

  return new Response(body, { headers });
}
