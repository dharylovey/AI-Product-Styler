import React from 'react';

interface ProductImageAreaProps {
  productName: string;
  selectedColorName?: string;
  imageUrl: string;
  generatedImage: string | null;
  isGenerating: boolean;
  onDownload: () => void;
  onReset: () => void;
  onOpenLightbox: () => void;
}

export const ProductImageArea: React.FC<ProductImageAreaProps> = ({
  productName,
  selectedColorName,
  imageUrl,
  generatedImage,
  isGenerating,
  onDownload,
  onReset,
  onOpenLightbox,
}) => {
  return (
    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
      {generatedImage ? (
        <div className="relative w-full h-full">
          <img
            src={generatedImage}
            alt={`${productName} in ${selectedColorName}`}
            className="h-full w-full object-cover animate-in fade-in duration-700 cursor-zoom-in"
            onClick={onOpenLightbox}
          />
          <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
            ✨ AI Styled
          </div>
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onDownload(); }}
              className="bg-white/90 text-slate-700 hover:text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-colors flex items-center gap-1"
              title="Download Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onReset(); }}
              className="bg-white/90 text-slate-700 hover:text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={productName}
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
  );
};
