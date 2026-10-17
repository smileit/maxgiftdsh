export type ArtKind =
  | "box"
  | "candle"
  | "diffuser"
  | "throw"
  | "kettle"
  | "cup"
  | "lamp"
  | "journal";

export type CategoryId = "gift-sets" | "home-scent" | "kitchen" | "desk";

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  compareAt?: number;
  tagline: string;
  description: string;
  details: string[];
  materials: string;
  colorway: string;
  art: ArtKind;
  tint: string;
  ink: string;
  badge?: "Bestseller" | "New" | "Limited";
  rating: number;
  reviews: number;
};

export const categories: {
  id: CategoryId;
  name: string;
  blurb: string;
  note: string;
}[] = [
  {
    id: "gift-sets",
    name: "Gift Sets",
    blurb: "Ready to give, wrapped by hand",
    note: "01",
  },
  {
    id: "home-scent",
    name: "Home & Scent",
    blurb: "Objects that change a room",
    note: "02",
  },
  {
    id: "kitchen",
    name: "Kitchen & Table",
    blurb: "For the long, slow mornings",
    note: "03",
  },
  {
    id: "desk",
    name: "Desk & Paper",
    blurb: "Everyday things, considered",
    note: "04",
  },
];

export const products: Product[] = [
  {
    slug: "atlas-gift-box",
    name: "Atlas Gift Box",
    category: "gift-sets",
    price: 148,
    compareAt: 178,
    tagline: "Six small luxuries in one quiet box",
    description:
      "Our signature set: an ember candle, cedar hand balm, a linen-bound journal, loose-leaf tea, a brass token, and a card you write yourself. Packed in a rigid, fabric-wrapped box that is worth keeping.",
    details: [
      "Six full-size pieces, no travel sizes",
      "Fabric-wrapped rigid box, magnetic closure",
      "Hand-tied cotton ribbon in your choice of colour",
      "Blank letterpress card included",
    ],
    materials: "Cotton-wrapped board, brass, glass, stoneware",
    colorway: "Oat & Clay",
    art: "box",
    tint: "#efe4d3",
    ink: "#8d3d20",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 412,
  },
  {
    slug: "ember-candle",
    name: "Ember Candle No. 02",
    category: "home-scent",
    price: 58,
    tagline: "Woodsmoke, fig leaf, a little resin",
    description:
      "Hand-poured in small batches into a reusable stoneware vessel. Sixty hours of burn time, a cotton wick, and a scent that reads warm without ever turning sweet.",
    details: [
      "60 hour burn time",
      "100% soy-coconut wax, cotton wick",
      "Refillable stoneware vessel",
      "Hand-poured in batches of 200",
    ],
    materials: "Stoneware, soy-coconut wax, cotton wick",
    colorway: "Smoked Amber",
    art: "candle",
    tint: "#e9ddcc",
    ink: "#6b3b23",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 286,
  },
  {
    slug: "orchid-diffuser",
    name: "Orchid Reed Diffuser",
    category: "home-scent",
    price: 76,
    tagline: "Bergamot, white orchid, warm paper",
    description:
      "A quiet, continuous scent for hallways and desks. Eight rattan reeds, a hand-blown glass vessel, and a base oil that lasts roughly four months without turning.",
    details: [
      "Lasts 3–4 months",
      "Eight natural rattan reeds",
      "Hand-blown amber glass",
      "Alcohol-free base oil",
    ],
    materials: "Hand-blown glass, rattan, botanical oil",
    colorway: "Amber Glass",
    art: "diffuser",
    tint: "#ece6d6",
    ink: "#7a6a4f",
    rating: 4.7,
    reviews: 148,
  },
  {
    slug: "meridian-throw",
    name: "Meridian Wool Throw",
    category: "home-scent",
    price: 165,
    tagline: "Woven in a mill that has run since 1897",
    description:
      "A generous, weighty throw in undyed lambswool with a hand-knotted fringe. Woven on a century-old loom in the Scottish borders, then washed in soft water so it arrives already broken in.",
    details: [
      "130 × 190 cm",
      "Undyed lambswool, hand-knotted fringe",
      "Woven on a 1897 Dobcross loom",
      "Comes in a cotton travel sleeve",
    ],
    materials: "100% lambswool",
    colorway: "Undyed Oat",
    art: "throw",
    tint: "#e6e1d3",
    ink: "#5d5a4a",
    badge: "Limited",
    rating: 4.9,
    reviews: 96,
  },
  {
    slug: "copper-pour-over",
    name: "Copper Pour-Over Set",
    category: "kitchen",
    price: 118,
    tagline: "A kettle, a dripper, and better mornings",
    description:
      "A hand-hammered copper kettle with a gooseneck spout and a stoneware dripper glazed in matte clay. Built for the slow ritual: bloom, pour, wait, drink.",
    details: [
      "800 ml hammered copper kettle",
      "Stoneware dripper, matte glaze",
      "Fits standard #2 filters",
      "Copper develops a patina with use",
    ],
    materials: "Hammered copper, stoneware",
    colorway: "Copper & Clay",
    art: "kettle",
    tint: "#f0e2d6",
    ink: "#9a4b28",
    rating: 4.8,
    reviews: 173,
  },
  {
    slug: "solstice-tea",
    name: "Solstice Tea Ritual",
    category: "kitchen",
    price: 64,
    tagline: "Three teas, one very good cup",
    description:
      "A trio of single-origin loose-leaf teas — a first-flush Darjeeling, a roasted oolong, and a smoked black — with a stoneware cup and a brass measuring spoon.",
    details: [
      "3 × 40 g loose-leaf tins",
      "Hand-thrown 180 ml stoneware cup",
      "Solid brass spoon",
      "Harvest and farm noted on each tin",
    ],
    materials: "Stoneware, brass, paper tins",
    colorway: "Sage & Brass",
    art: "cup",
    tint: "#e4e6d8",
    ink: "#5f6b4f",
    badge: "New",
    rating: 4.6,
    reviews: 64,
  },
  {
    slug: "lumen-desk-lamp",
    name: "Lumen Desk Lamp",
    category: "desk",
    price: 210,
    tagline: "Warm light that behaves like daylight",
    description:
      "A small, heavy-based task lamp in powder-coated steel. Dimmable from a candle-warm 2200K to a clear 4000K, with a shade that throws light exactly where you point it.",
    details: [
      "Dimmable 2200K–4000K",
      "Powder-coated steel, solid brass joint",
      "USB-C, no visible cable",
      "Weighted base, does not walk across the desk",
    ],
    materials: "Powder-coated steel, brass, glass",
    colorway: "Ink & Brass",
    art: "lamp",
    tint: "#e8e3da",
    ink: "#3d3a33",
    rating: 4.7,
    reviews: 88,
  },
  {
    slug: "keepsake-journal",
    name: "Keepsake Journal",
    category: "desk",
    price: 42,
    tagline: "Linen boards, 128 pages, lies flat",
    description:
      "A sewn-bound journal in book cloth with a ribbon marker and a brass foil rule. Heavy enough to take ink, thin enough to carry every day.",
    details: [
      "128 pages, 120 gsm",
      "Sewn binding, lies completely flat",
      "Book cloth over board",
      "Ribbon marker, brass foil rule",
    ],
    materials: "Book cloth, cotton paper, brass foil",
    colorway: "Clay Linen",
    art: "journal",
    tint: "#f0e6dc",
    ink: "#a2543a",
    rating: 4.8,
    reviews: 210,
  },
];

export const bestsellers = ["atlas-gift-box", "ember-candle", "copper-pour-over", "keepsake-journal"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
