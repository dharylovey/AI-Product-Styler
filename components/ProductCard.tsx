import React, { useState, useCallback } from 'react';
import { Product, ProductColor } from '../types';
import { urlToBase64 } from '../utils/imageUtils';
import { generateStyledProductImage } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
  onApiKeyMissing: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onApiKeyMissing }) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use Picsum for demo images. 
  // We use the ID from the product definition to keep it consistent.
  const imageUrl = `https://picsum.photos/id/${product.baseImageId}/600/400`;

  const handleStyleWithAI = useCallback(async () => {
    if (!selectedColor) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null); // Reset previous result

    try {
      // 1. Convert current image URL to base64
      const base64Img = await urlToBase64(imageUrl);

      // 2. Call Service (which now calls n8n)
      const newImageBase64 = await generateStyledProductImage(
        base64Img,
        selectedColor.name,
        product.name
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
  }, [imageUrl, selectedColor, product.name, onApiKeyMissing]);

  const downloadImage = () => {
    if (!generatedImage || !selectedColor) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `${product.name}-${selectedColor.name}-styled.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {generatedImage ? (
           <div className="relative w-full h-full">
             <img
               src={generatedImage}
               alt={`${product.name} in ${selectedColor?.name}`}
               className="h-full w-full object-cover animate-in fade-in duration-700"
             />
             <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
               ✨ AI Styled
             </div>
             <div className="absolute bottom-3 right-3 flex gap-2">
               <button
                 onClick={downloadImage}
                 className="bg-white/90 text-slate-700 hover:text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-colors flex items-center gap-1"
                 title="Download Image"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                 </svg>
                 Download
               </button>
               <button 
                  onClick={() => setGeneratedImage(null)}
                  className="bg-white/90 text-slate-700 hover:text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-colors"
               >
                 Reset
               </button>
             </div>
           </div>
        ) : (
          <img
            src={imageUrl}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isGenerating ? 'opacity-50 blur-sm scale-105' : ''}`}
          />
        )}
        
        {/* Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl">
              <svg className="animate-spin h-8 w-8 text-indigo-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-semibold text-slate-700 animate-pulse">Processing in n8n...</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>
        </div>

        {/* Color Selection */}
        <div className="mt-auto">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
            Select Color Variant
          </label>
          <div className="flex items-center space-x-3 mb-6">
            {product.availableColors.map((color) => {
              const isSelected = selectedColor?.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color);
                    setGeneratedImage(null); // Reset image when color changes
                    setError(null);
                  }}
                  className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500 border-white scale-110' : 'border-slate-200 hover:scale-105'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                       <svg className="w-4 h-4 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100">
              {error}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleStyleWithAI}
            disabled={!selectedColor || isGenerating}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-md transition-all ${
              !selectedColor || isGenerating
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95'
            }`}
          >
             {generatedImage ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Regenerate
                </>
             ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Style it with AI
                </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};