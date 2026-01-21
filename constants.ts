export const PRODUCTS = [
  {
    id: "1",
    name: "Classic Leather Tote",
    description:
      "A timeless leather tote bag perfect for daily use. Features a spacious interior and durable construction.",
    baseImageId: "1059", // Picsum ID
    defaultColor: "Tan",
    availableColors: [
      { name: "Tan", hex: "#D2B48C", code: "tan" },
      { name: "Black", hex: "#000000", code: "black" },
      { name: "Burgundy", hex: "#800020", code: "burgundy" },
    ],
  },
  {
    id: "2",
    name: "Minimalist Sneaker",
    description:
      "Clean lines and premium materials make this sneaker a wardrobe staple. Comfortable for all-day wear.",
    baseImageId: "103", // Picsum ID (feet/shoes)
    defaultColor: "White",
    availableColors: [
      { name: "White", hex: "#FFFFFF", code: "white" },
      { name: "Navy", hex: "#000080", code: "navy" },
      { name: "Grey", hex: "#808080", code: "grey" },
    ],
  },
  {
    id: "3",
    name: "Ceramic Vase",
    description:
      "Handcrafted ceramic vase with a modern silhouette. Perfect for fresh flowers or as a standalone piece.",
    baseImageId: "431",
    defaultColor: "Sage",
    availableColors: [
      { name: "Sage", hex: "#9CAF88", code: "sage" },
      { name: "Terracotta", hex: "#E2725B", code: "terracotta" },
      { name: "Cream", hex: "#FFFDD0", code: "cream" },
    ],
  },
  {
    id: "4",
    name: "Modern Armchair",
    description:
      "Mid-century modern armchair with solid wood legs. A perfect accent piece for any living room.",
    baseImageId: "68",
    defaultColor: "Teal",
    availableColors: [
      { name: "Teal", hex: "#008080", code: "teal" },
      { name: "Mustard", hex: "#FFDB58", code: "mustard" },
      { name: "Charcoal", hex: "#36454F", code: "charcoal" },
    ],
  },
  {
    id: "5",
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling headphones with plush ear cushions. Immersive sound quality.",
    baseImageId: "35",
    defaultColor: "Silver",
    availableColors: [
      { name: "Silver", hex: "#C0C0C0", code: "silver" },
      { name: "Matte Black", hex: "#28282B", code: "matte_black" },
      { name: "Rose Gold", hex: "#B76E79", code: "rose_gold" },
    ],
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    description:
      "Chic oversized sunglasses with UV protection. Elevate your summer style instantly.",
    baseImageId: "338",
    defaultColor: "Tortoise",
    availableColors: [
      { name: "Tortoise", hex: "#E5AA70", code: "tortoise" },
      { name: "Black", hex: "#1A1A1A", code: "black" },
      { name: "Gold", hex: "#FFD700", code: "gold" },
    ],
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
