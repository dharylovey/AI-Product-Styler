import React from 'react';
import { createPortal } from 'react-dom';

interface ProductLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string | null;
  productName: string;
  onDownload: () => void;
}

export const ProductLightbox: React.FC<ProductLightboxProps> = ({
  isOpen,
  onClose,
  image,
  productName,
  onDownload,
}) => {
  if (!isOpen || !image) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <img 
        src={image} 
        alt={`${productName} - Styled Preview`}
        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()} 
      />
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4" onClick={(e) => e.stopPropagation()}>
         <button
           onClick={onDownload}
           className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
         >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
           </svg>
           Download
         </button>
      </div>
    </div>,
    document.body
  );
};
