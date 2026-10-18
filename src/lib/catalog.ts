export type Family = "non-woven" | "woven" | "insulated" | "natural" | "specialty";

export const company = {
  name: "Maxgift",
  tagline: "Custom eco bags, made in Shenzhen",
  email: "sales@maxgiftpro.com",
  phone: "[0755] 2963 1000",
  address: "28 Floor, Anhui Building, Futian District, Shenzhen, Guangdong, China",
  port: "FOB Ningbo",
};

export const families: { id: Family; name: string; blurb: string }[] = [
  { id: "non-woven", name: "Non-woven", blurb: "Lightweight, printable, the volume workhorse" },
  { id: "woven", name: "Woven", blurb: "Heavier gauge for load-bearing retail" },
  { id: "insulated", name: "Insulated", blurb: "Foil-lined for cold chain and food" },
  { id: "natural", name: "Natural fibre", blurb: "Cotton and jute, plastic-free" },
  { id: "specialty", name: "Specialty", blurb: "Drawstring and shoulder formats" },
];

export type Product = {
  slug: string;
  title: string;
  code: string;
  family: Family;
  blurb: string;
  images: string[];
  intro: string[];
  specs: { label: string; value: string }[];
  featured?: boolean;
};

export const seedProducts: Product[] = [
  {
    slug: "non-woven-bag",
    title: "Non Woven Bag",
    code: "NWB-B24001",
    family: "non-woven",
    blurb: "Foldable and tote styles, printed edge to edge",
    images: [
      "/img/nwb001.jpg",
      "/img/nwb002.jpg",
      "/img/nwb003.jpg",
      "/img/nwb004.jpg",
      "/img/nwb005.jpg",
      "/img/nwb006.jpg",
    ],
    intro: [
      "Durable, lightweight polypropylene: a reusable bag that survives the weekly shop without costing like a premium tote. Tear-resistant and water-resistant, it takes heavy loads and still folds flat.",
      "Sturdy handles, a flat bottom that keeps contents upright, and custom dimensions to fit your product. Print runs from one colour to full-colour process, so the bag carries your artwork rather than fighting it.",
    ],
    specs: [
      { label: "Model", value: "NWB-B24001" },
      { label: "Material", value: "Non woven" },
      { label: "Size", value: "42 × 53 cm / customized" },
      { label: "Colour", value: "Customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Apparel, beverage, food, advertising, packaging" },
      { label: "Feature", value: "Waterproof, custom logo, easy packing" },
      { label: "Port", value: "FOB Ningbo" },
    ],
    featured: true,
  },
  {
    slug: "pp-non-woven-bag",
    title: "PP Non Woven Bag",
    code: "PPNWB-B24002",
    family: "non-woven",
    blurb: "Basket and tote formats in a finer gauge",
    images: ["/img/pnwb001.jpg", "/img/pnwb002.jpg", "/img/pnwb003.jpg"],
    intro: [
      "A tighter weave than standard non-woven, which gives a smoother print surface and a stiffer hand-feel — closer to paper in the hand, still waterproof.",
      "Available as a tote or a basket-style shopper. Good for cosmetics, spirits and subscription boxes where the bag is part of the unboxing.",
    ],
    specs: [
      { label: "Model", value: "PPNWB-B24002" },
      { label: "Material", value: "PP non woven" },
      { label: "Size", value: "32 × 42 cm / customized" },
      { label: "Colour", value: "Customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Apparel, beverage, food, advertising, packaging" },
      { label: "Feature", value: "Lightweight, durable, water-resistant, customizable" },
      { label: "Port", value: "FOB Ningbo" },
    ],
  },
  {
    slug: "pp-woven-bag",
    title: "PP Woven Bag",
    code: "PWB-B24001",
    family: "woven",
    blurb: "Heavier gauge, built for weight",
    images: [
      "/img/pwb001.jpg",
      "/img/pwb002.jpg",
      "/img/pwb003.jpg",
      "/img/pwb004.jpg",
      "/img/pwb005.jpg",
      "/img/pwb006.jpg",
    ],
    intro: [
      "Woven polypropylene in a heavier gauge, for retail programmes that need to carry real weight — bulk grocery, hardware, promotions that get reused for years.",
      "Laminated print holds saturated colour and survives scuffing. Reinforced handles and a stitched top hem are standard; dimensions follow your spec.",
    ],
    specs: [
      { label: "Model", value: "PWB-B24001" },
      { label: "Material", value: "PP woven" },
      { label: "Size", value: "42 × 53 cm / customized" },
      { label: "Colour", value: "Customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Apparel, beverage, food, advertising, packaging" },
      { label: "Feature", value: "Durable, water-resistant, custom logo, easy packing" },
      { label: "Port", value: "FOB Ningbo" },
    ],
    featured: true,
  },
  {
    slug: "cooler-bag",
    title: "Cooler Bag",
    code: "CB-B24001",
    family: "insulated",
    blurb: "Foil-lined, keeps cold for the trip home",
    images: [
      "/img/clb001.jpg",
      "/img/clb002.jpg",
      "/img/clb003.jpg",
      "/img/clb004.jpg",
      "/img/clb005.jpg",
      "/img/clb006.jpg",
    ],
    intro: [
      "An aluminium-foil lining under a PP non-woven shell: chilled and frozen goods hold temperature through a normal delivery run, with a wipe-clean interior.",
      "Built for grocery, meal-kit, seafood and beverage programmes. Zip or flap closures, webbing handles, and a printed exterior that stays legible after repeated folding.",
    ],
    specs: [
      { label: "Model", value: "CB-B24001" },
      { label: "Material", value: "PP non woven, aluminium foil lining" },
      { label: "Size", value: "30 × 40 cm / customized" },
      { label: "Colour", value: "Customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Grocery, meal kit, seafood, beverage" },
      { label: "Feature", value: "Insulated, wipe-clean lining, custom logo" },
      { label: "Port", value: "FOB Ningbo" },
    ],
    featured: true,
  },
  {
    slug: "shoulder-bag",
    title: "Shoulder Bag",
    code: "SB-B24001",
    family: "specialty",
    blurb: "Cotton canvas body, cross-body strap",
    images: [
      "/img/sdb001.jpg",
      "/img/sdb002.jpg",
      "/img/sdb003.jpg",
      "/img/sdb004.jpg",
      "/img/sdb005.jpg",
      "/img/sdb006.jpg",
    ],
    intro: [
      "A cotton canvas shoulder bag with a polyester lining — the format people actually keep using after the campaign ends, which is the point of a reusable bag.",
      "Adjustable webbing strap, internal pocket, and a print area wide enough for a full lock-up. Popular for apparel retail, conferences and merch programmes.",
    ],
    specs: [
      { label: "Model", value: "SB-B24001" },
      { label: "Material", value: "Cotton canvas, polyester lining" },
      { label: "Size", value: "40 × 35 × 10 cm / customized" },
      { label: "Colour", value: "Customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Apparel, accessories, casual, outdoor" },
      { label: "Feature", value: "Durable, comfortable, customizable, versatile" },
      { label: "Port", value: "FOB Ningbo" },
    ],
  },
  {
    slug: "drawstring-bag",
    title: "Drawstring Bag",
    code: "DB-B24001",
    family: "specialty",
    blurb: "Gym and promo staple, packs to nothing",
    images: ["/img/dsb001.jpg", "/img/dsb002.jpg", "/img/dsb003.jpg", "/img/dsb004.jpg"],
    intro: [
      "Lightweight non-woven polypropylene with a drawcord closure. Ships flat, packs into a carton at almost no volume, and prints cheaply at volume.",
      "The standard choice for gyms, sports clubs, schools and event giveaways where cost per unit matters more than structure.",
    ],
    specs: [
      { label: "Model", value: "DB-B24001" },
      { label: "Material", value: "Non woven polypropylene" },
      { label: "Size", value: "40 × 50 cm / customized" },
      { label: "Colour", value: "Customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Apparel, sports, gym, travel, promotional" },
      { label: "Feature", value: "Lightweight, durable, space-saving, customizable" },
      { label: "Port", value: "FOB Ningbo" },
    ],
  },
  {
    slug: "jute-bag",
    title: "Jute Bag",
    code: "JB-B24001",
    family: "natural",
    blurb: "100% natural jute, biodegradable",
    images: [
      "/img/jtb001.jpg",
      "/img/jtb002.jpg",
      "/img/jtb003.jpg",
      "/img/jtb004.jpg",
      "/img/jtb005.jpg",
      "/img/jtb006.jpg",
    ],
    intro: [
      "Woven from natural jute fibre — biodegradable, plastic-free, and heavy enough to stand on a shelf unaided. The texture does most of the brand work.",
      "Unbleached natural ground colours beautifully with a single-colour screen print or a woven label. Used by grocery, lifestyle and zero-waste retail.",
    ],
    specs: [
      { label: "Model", value: "JB-B24001" },
      { label: "Material", value: "Natural jute fibre" },
      { label: "Size", value: "35 × 45 cm / customized" },
      { label: "Colour", value: "Natural, customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Grocery, shopping, eco-friendly, lifestyle" },
      { label: "Feature", value: "Eco-friendly, durable, customizable, reusable" },
      { label: "Port", value: "FOB Ningbo" },
    ],
    featured: true,
  },
  {
    slug: "cotton-bag",
    title: "Cotton Bag",
    code: "CB-B24002",
    family: "natural",
    blurb: "100% natural cotton, breathable and soft",
    images: ["/img/ctb001.jpg", "/img/ctb002.jpg", "/img/ctb003.jpg", "/img/ctb004.jpg"],
    intro: [
      "A 100% natural cotton tote — breathable, soft, and the most forgiving print surface we run. Takes screen print, heat transfer and embroidery.",
      "The default for lifestyle brands, bookshops and events where the bag is meant to be carried again tomorrow, not thrown in a cupboard.",
    ],
    specs: [
      { label: "Model", value: "CB-B24002" },
      { label: "Material", value: "100% natural cotton" },
      { label: "Size", value: "40 × 35 cm / customized" },
      { label: "Colour", value: "Customized" },
      { label: "Packing", value: "Customized" },
      { label: "Artwork", value: "JPG, PDF, AI, EPS — custom design accepted" },
      { label: "Scene", value: "Grocery, shopping, lifestyle, apparel" },
      { label: "Feature", value: "Durable, breathable, customizable, reusable" },
      { label: "Port", value: "FOB Ningbo" },
    ],
    featured: true,
  },
];

export function familyName(id: Family) {
  return families.find((f) => f.id === id)?.name ?? "";
}

export const customisation = [
  { title: "Size", body: "Cut to your product's dimensions — no compromise to the nearest standard." },
  { title: "Colour", body: "Pantone-matched body, handles and lining." },
  { title: "Print", body: "Screen, heat transfer or laminated full colour." },
  { title: "Handles", body: "Die-cut, webbing, rope or cotton tape." },
  { title: "Packing", body: "Polybag, hangtag, header card or retail-ready carton." },
];

export const processSteps = [
  {
    step: "01",
    title: "Artwork",
    body: "Send JPG, PDF, AI or EPS. We check printability and flag anything that will muddy before it costs you a run.",
  },
  {
    step: "02",
    title: "Proof",
    body: "A digital proof with material, size and colour confirmed — signed off before anything is cut.",
  },
  {
    step: "03",
    title: "Sample",
    body: "A physical pre-production sample, so you approve the hand-feel rather than a screen.",
  },
  {
    step: "04",
    title: "Production",
    body: "Cutting, printing, stitching and QC in one building. Progress photos on request.",
  },
  {
    step: "05",
    title: "Shipping",
    body: "FOB Ningbo as standard, or hand over to your forwarder. Cartons labelled to your spec.",
  },
];

export const faqs = [
  {
    q: "What is the minimum order quantity?",
    a: "It depends on the line and the print method. Send your target quantity and we will confirm what is practical for that material before you commit to anything.",
  },
  {
    q: "Can I get a sample before production?",
    a: "Yes. A physical pre-production sample is standard on every order — you approve the material, print and stitching before the run starts.",
  },
  {
    q: "Which artwork files do you accept?",
    a: "JPG, PDF, AI or EPS. Send the vector file where you have one; we check colour separations and printability before quoting.",
  },
  {
    q: "How long does production take?",
    a: "It varies with quantity, print method and material stock. Once artwork is approved we confirm a production calendar with your order.",
  },
  {
    q: "Do you ship FOB or CIF?",
    a: "FOB Ningbo is our standard term. We can quote CIF, or work directly with the forwarder you already use.",
  },
  {
    q: "Can you match a specific colour?",
    a: "Yes — body, handles and lining are matched to a Pantone reference. Send the number with your enquiry.",
  },
];

export const trustPoints = [
  "In-house printing",
  "Custom sizes & colours",
  "Sample before production",
  "FOB Ningbo · worldwide",
];

export const quotes = [
  {
    text: "The eco-bags from Maxgift are truly exceptional. The quality is outstanding, and I am proud to use them in my business. Their commitment to sustainability is unparalleled.",
    name: "David Wilkins",
    role: "Sustainability Manager, Greenleaf Enterprises",
  },
  {
    text: "Maxgift's eco-bags have become an integral part of my daily routine. The durability and functionality make them a perfect choice for an eco-friendly lifestyle.",
    name: "Julia Chen",
    role: "Environmental Activist, Save Our Planet",
  },
  {
    text: "The team has been extremely helpful and responsive throughout the entire purchasing experience. The bags blend style and sustainability.",
    name: "Michael Rodriguez",
    role: "General Manager, City Market Grocery",
  },
];
