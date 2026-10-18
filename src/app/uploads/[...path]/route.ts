import fs from "node:fs/promises";
import path from "node:path";

export const instant = false;

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
};

/**
 * Serves runtime uploads. They live outside `public/` because Next only ships
 * files that existed at build time; anything uploaded later needs a handler.
 */
export async function GET(_request: Request, ctx: RouteContext<"/uploads/[...path]">) {
  const { path: segments } = await ctx.params;
  const base = path.join(process.cwd(), "uploads");
  const target = path.resolve(base, ...segments);

  if (!target.startsWith(path.resolve(base))) {
    return new Response("forbidden", { status: 403 });
  }

  try {
    const data = await fs.readFile(target);
    const ext = path.extname(target).slice(1).toLowerCase();
    return new Response(new Uint8Array(data), {
      headers: {
        "content-type": MIME[ext] ?? "application/octet-stream",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("not found", { status: 404 });
  }
}
