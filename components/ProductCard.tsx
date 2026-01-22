import React, { useState, useCallback, useContext } from 'react';
import { Product, ProductColor, AppContext } from '../types';
import { urlToBase64 } from '../utils/imageUtils';
import { generateStyledProductImage } from '../services/geminiService';
import { ProductImageArea } from './product-card/ProductImageArea';
import { ColorSelector } from './product-card/ColorSelector';
import { StyleButton } from './product-card/StyleButton';
import { ProductLightbox } from './product-card/ProductLightbox';

interface ProductCardProps {
  product: Product;
  onApiKeyMissing: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onApiKeyMissing }) => {
  const appContext = useContext(AppContext);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [customColor, setCustomColor] = useState<string>("#000000");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // We use the image URL from the product definition
  const imageUrl = product.imageUrl;

  const handleStyleWithAI = useCallback(async () => {
    if (!selectedColor) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null); // Reset previous result

    try {
      // 1. Convert current image URL to base64
      const base64Img = await urlToBase64(imageUrl);

      // 2. Call Service (which now calls n8n)
      const targetColor = selectedColor.name === 'Custom' ? selectedColor.hex : selectedColor.name;
      const newImageBase64 = await generateStyledProductImage(
        base64Img,
        targetColor,
        product.name,
        appContext?.selectedModel || ''
      );

      // 3. Set result
      setGeneratedImage(newImageBase64);
    } catch (err: any) {
      const msg = err.message || "Failed to generate image.";
      setError(msg);
      // If the error implies missing config, prompt the user
      if (msg.includes("not configured") || msg.includes("Missing")) {
          onApiKeyMissing();
      }
    } finally {
      setIsGenerating(false);
    }
  }, [imageUrl, selectedColor, product.name, appContext?.selectedModel, onApiKeyMissing]);

  const downloadImage = () => {
    if (!generatedImage || !selectedColor) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `${product.name}-${selectedColor.name}-styled.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    setGeneratedImage(null);
    setError(null);
  };

  const handleCustomColorChange = (newColor: string) => {
    setCustomColor(newColor);
    setSelectedColor({ name: 'Custom', hex: newColor });
    setGeneratedImage(null);
    setError(null);
  };

  return (
    <>
      <ProductLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        image={generatedImage}
        productName={product.name}
        onDownload={downloadImage}
      />

      <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
        
        {/* Image Area */}
        <ProductImageArea 
          productName={product.name}
          selectedColorName={selectedColor?.name}
          imageUrl={imageUrl}
          generatedImage={generatedImage}
          isGenerating={isGenerating}
          onDownload={downloadImage}
          onReset={() => setGeneratedImage(null)}
          onOpenLightbox={() => setIsLightboxOpen(true)}
        />

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>
          </div>

          {/* Color Selection */}
          <ColorSelector 
            availableColors={product.availableColors}
            selectedColor={selectedColor}
            customColor={customColor}
            onColorSelect={handleColorSelect}
            onCustomColorChange={handleCustomColorChange}
          />

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100">
              {error}
            </div>
          )}

          {/* Action Button */}
          <StyleButton 
            isGenerating={isGenerating}
            hasSelectedColor={!!selectedColor}
            hasGeneratedImage={!!generatedImage}
            onStyleWithAI={handleStyleWithAI}
          />
        </div>
      </div>
    </>
  );
};
