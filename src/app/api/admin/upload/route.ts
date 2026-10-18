import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { isAdmin } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "unauthorised" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "no file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "file too large (max 8 MB)" }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return Response.json({ error: `unsupported type: ${file.type}` }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "uploads", "products");
  await fs.mkdir(dir, { recursive: true });

  const name = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, name), buffer);

  return Response.json({ path: `/uploads/products/${name}` });
}
