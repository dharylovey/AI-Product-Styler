import { createContext } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  defaultColor: string;
  availableColors: ProductColor[];
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface GeneratedImage {
  originalProductId: string;
  colorName: string;
  imageUrl: string;
  timestamp: number;
}

export interface AppContextType {
  openConfigModal: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
