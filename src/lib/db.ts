import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import type { Family, Product } from "./catalog";
import { seedProducts } from "./catalog";

export type ProductRow = Product & {
  id: number;
  published: boolean;
  sort: number;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = process.env.DATABASE_PATH ?? path.join(DATA_DIR, "maxgift.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS products (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT    NOT NULL UNIQUE,
  title      TEXT    NOT NULL,
  code       TEXT    NOT NULL DEFAULT '',
  family     TEXT    NOT NULL DEFAULT 'non-woven',
  blurb      TEXT    NOT NULL DEFAULT '',
  intro      TEXT    NOT NULL DEFAULT '[]',
  images     TEXT    NOT NULL DEFAULT '[]',
  specs      TEXT    NOT NULL DEFAULT '[]',
  featured   INTEGER NOT NULL DEFAULT 0,
  published  INTEGER NOT NULL DEFAULT 1,
  sort       INTEGER NOT NULL DEFAULT 0,
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_products_sort ON products(published, sort, id);
`;

let db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (db) return db;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(SCHEMA);
  seedIfEmpty(db);
  return db;
}

/** First run only: copy the shipped catalogue into the database. */
function seedIfEmpty(database: DatabaseSync) {
  const row = database.prepare("SELECT COUNT(*) AS n FROM products").get() as { n: number };
  if (row.n > 0) return;

  const insert = database.prepare(
    `INSERT INTO products (slug, title, code, family, blurb, intro, images, specs, featured, published, sort)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
  );
  seedProducts.forEach((p, i) => {
    insert.run(
      p.slug,
      p.title,
      p.code,
      p.family,
      p.blurb,
      JSON.stringify(p.intro),
      JSON.stringify(p.images),
      JSON.stringify(p.specs),
      p.featured ? 1 : 0,
      i,
    );
  });
}

/* ------------------------------------------------------------------ */
/* mapping                                                             */
/* ------------------------------------------------------------------ */

type RawRow = {
  id: number;
  slug: string;
  title: string;
  code: string;
  family: string;
  blurb: string;
  intro: string;
  images: string;
  specs: string;
  featured: number;
  published: number;
  sort: number;
};

function parseJson<T>(value: string, fallback: T): T {
  try {
    const parsed = JSON.parse(value);
    return (Array.isArray(parsed) ? parsed : fallback) as T;
  } catch {
    return fallback;
  }
}

function toProduct(row: RawRow): ProductRow {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    code: row.code,
    family: row.family as Family,
    blurb: row.blurb,
    intro: parseJson<string[]>(row.intro, []),
    images: parseJson<string[]>(row.images, []),
    specs: parseJson<{ label: string; value: string }[]>(row.specs, []),
    featured: row.featured === 1,
    published: row.published === 1,
    sort: row.sort,
  };
}

/* ------------------------------------------------------------------ */
/* reads                                                               */
/* ------------------------------------------------------------------ */

export function listProducts({ includeDrafts = false } = {}): ProductRow[] {
  const sql = includeDrafts
    ? "SELECT * FROM products ORDER BY published DESC, sort ASC, id ASC"
    : "SELECT * FROM products WHERE published = 1 ORDER BY sort ASC, id ASC";
  const rows = getDb().prepare(sql).all() as RawRow[];
  return rows.map(toProduct);
}

export function getProductBySlug(slug: string): ProductRow | null {
  const row = getDb().prepare("SELECT * FROM products WHERE slug = ?").get(slug) as RawRow | undefined;
  return row ? toProduct(row) : null;
}

export function getProductById(id: number): ProductRow | null {
  const row = getDb().prepare("SELECT * FROM products WHERE id = ?").get(id) as RawRow | undefined;
  return row ? toProduct(row) : null;
}

/* ------------------------------------------------------------------ */
/* writes                                                              */
/* ------------------------------------------------------------------ */

export type ProductInput = {
  slug: string;
  title: string;
  code: string;
  family: Family;
  blurb: string;
  intro: string[];
  images: string[];
  specs: { label: string; value: string }[];
  featured: boolean;
  published: boolean;
};

export function createProduct(input: ProductInput): number {
  const database = getDb();
  const next = database.prepare("SELECT COALESCE(MAX(sort), -1) + 1 AS n FROM products").get() as {
    n: number;
  };
  const result = database
    .prepare(
      `INSERT INTO products (slug, title, code, family, blurb, intro, images, specs, featured, published, sort)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.slug,
      input.title,
      input.code,
      input.family,
      input.blurb,
      JSON.stringify(input.intro),
      JSON.stringify(input.images),
      JSON.stringify(input.specs),
      input.featured ? 1 : 0,
      input.published ? 1 : 0,
      next.n,
    );
  return Number(result.lastInsertRowid);
}

export function updateProduct(id: number, input: ProductInput) {
  getDb()
    .prepare(
      `UPDATE products SET slug = ?, title = ?, code = ?, family = ?, blurb = ?, intro = ?,
              images = ?, specs = ?, featured = ?, published = ?, updated_at = datetime('now')
       WHERE id = ?`,
    )
    .run(
      input.slug,
      input.title,
      input.code,
      input.family,
      input.blurb,
      JSON.stringify(input.intro),
      JSON.stringify(input.images),
      JSON.stringify(input.specs),
      input.featured ? 1 : 0,
      input.published ? 1 : 0,
      id,
    );
}

export function deleteProduct(id: number) {
  getDb().prepare("DELETE FROM products WHERE id = ?").run(id);
}

export function setPublished(id: number, published: boolean) {
  getDb()
    .prepare("UPDATE products SET published = ?, updated_at = datetime('now') WHERE id = ?")
    .run(published ? 1 : 0, id);
}

export function moveProduct(id: number, direction: -1 | 1) {
  const database = getDb();
  const all = database.prepare("SELECT id, sort FROM products ORDER BY sort ASC, id ASC").all() as {
    id: number;
    sort: number;
  }[];
  const index = all.findIndex((r) => r.id === id);
  if (index < 0) return;
  const target = index + direction;
  if (target < 0 || target >= all.length) return;

  const reordered = [...all];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
  const update = database.prepare("UPDATE products SET sort = ? WHERE id = ?");
  reordered.forEach((row, i) => update.run(i, row.id));
}

export function slugExists(slug: string, exceptId?: number): boolean {
  const row = exceptId
    ? (getDb().prepare("SELECT id FROM products WHERE slug = ? AND id != ?").get(slug, exceptId) as
        | { id: number }
        | undefined)
    : (getDb().prepare("SELECT id FROM products WHERE slug = ?").get(slug) as
        | { id: number }
        | undefined);
  return Boolean(row);
}
