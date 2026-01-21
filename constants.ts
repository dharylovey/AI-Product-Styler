import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Modern Lounge Chair',
    description: 'A comfortable, minimalist lounge chair perfect for any contemporary living room.',
    baseImageId: 1060, // A coffee/woman/indoor vibe, generic enough for "styling"
    defaultColor: 'White',
    availableColors: [
      { name: 'Ruby Red', hex: '#ef4444' },
      { name: 'Ocean Blue', hex: '#3b82f6' },
      { name: 'Midnight Black', hex: '#111827' },
    ],
  },
  {
    id: 'p2',
    name: 'Ceramic Table Vase',
    description: 'Hand-crafted ceramic vase with a smooth matte finish.',
    baseImageId: 201, // Laptop/Work items - AI will likely recolor the main object
    defaultColor: 'Beige',
    availableColors: [
      { name: 'Forest Green', hex: '#15803d' },
      { name: 'Sunset Orange', hex: '#f97316' },
      { name: 'Lavender', hex: '#a855f7' },
    ],
  },
  {
    id: 'p3',
    name: 'Urban Backpack',
    description: 'Durable, water-resistant backpack for the daily commuter.',
    baseImageId: 250, // Camera/Tech - can be restyled
    defaultColor: 'Grey',
    availableColors: [
      { name: 'Mustard Yellow', hex: '#eab308' },
      { name: 'Teal', hex: '#14b8a6' },
      { name: 'Deep Purple', hex: '#7e22ce' },
    ],
  },
  {
    id: 'p4',
    name: 'Classic Canvas Sneakers',
    description: 'Timeless low-top sneakers featuring a durable canvas upper and rubber sole.',
    baseImageId: 21, // Shoes - AI handles shoe context well
    defaultColor: 'White',
    availableColors: [
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Cherry Red', hex: '#dc2626' },
      { name: 'Charcoal', hex: '#374151' },
    ],
  },
  {
    id: 'p5',
    name: 'Mechanical Keyboard',
    description: 'High-performance mechanical keyboard with tactile switches and backlighting.',
    baseImageId: 60, // Desk/Computer setup
    defaultColor: 'Black',
    availableColors: [
      { name: 'Retro Beige', hex: '#d6cbb6' },
      { name: 'Electric Cyan', hex: '#06b6d4' },
      { name: 'Rose Gold', hex: '#fb7185' },
    ],
  },
];

export const MOCK_DELAY_MS = 1500;