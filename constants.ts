const STANDARD_COLORS = [
  { name: "White", hex: "#FFFFFF", code: "white" },
  { name: "Black", hex: "#000000", code: "black" },
  { name: "Red", hex: "#FF0000", code: "red" },
  { name: "Blue", hex: "#0000FF", code: "blue" },
  { name: "Green", hex: "#008000", code: "green" },
];

export const PRODUCTS = [
  {
    id: "1",
    name: "Classic Leather Tote",
    description:
      "A timeless leather tote bag perfect for daily use. Features a spacious interior and durable construction.",
    imageUrl: "/leatherbag.webp",
    defaultColor: "Tan",
    availableColors: STANDARD_COLORS,
  },
  {
    id: "2",
    name: "Minimalist Sneaker",
    description:
      "Clean lines and premium materials make this sneaker a wardrobe staple. Comfortable for all-day wear.",
    imageUrl: "/shoe.webp",
    defaultColor: "White",
    availableColors: STANDARD_COLORS,
  },
  {
    id: "3",
    name: "Everyday Canvas Bag",
    description:
      "Durable and stylish canvas bag for your daily adventures. Spacious and versatile.",
    imageUrl: "/bag.webp",
    defaultColor: "Beige",
    availableColors: STANDARD_COLORS,
  },
  {
    id: "4",
    name: "Modern Armchair",
    description:
      "Mid-century modern armchair with solid wood legs. A perfect accent piece for any living room.",
    imageUrl: "/armchair.webp",
    defaultColor: "Teal",
    availableColors: STANDARD_COLORS,
  },
  {
    id: "5",
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling headphones with plush ear cushions. Immersive sound quality.",
    imageUrl: "/headphone.webp",
    defaultColor: "Silver",
    availableColors: STANDARD_COLORS,
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    description:
      "Chic oversized sunglasses with UV protection. Elevate your summer style instantly.",
    imageUrl: "/glass.webp",
    defaultColor: "Tortoise",
    availableColors: STANDARD_COLORS,
  },
];

export const MOCK_DELAY_MS = 2000;

export const AI_MODELS = [
  {
    id: "models/imagen-4.0-generate-preview-06-06",
    name: "Imagen 4.0 Preview",
  },
  {
    id: "models/gemini-2.0-flash-exp-image-generation",
    name: "Gemini 2.0 Flash Exp",
  },
  {
    id: "models/gemini-2.5-flash-image",
    name: "Gemini 2.5 Flash (Nano Banana)",
  },
  {
    id: "models/gemini-3-pro-image-preview",
    name: "Gemini 3 Pro (Nano Banana Pro)",
  },
  {
    id: "models/imagen-4.0-ultra-generate-preview-06-06",
    name: "Imagen 4.0 Ultra",
  },
];
