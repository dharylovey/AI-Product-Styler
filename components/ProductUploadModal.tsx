import React from 'react';
import { createPortal } from 'react-dom';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onApiKeyMissing: () => void;
}

export const ProductUploadModal: React.FC<ProductUploadModalProps> = ({
  isOpen,
  onClose,
  product,
  onApiKeyMissing
}) => {
  if (!isOpen || !product) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Your Product</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
            <ProductCard 
                product={product}
                onApiKeyMissing={onApiKeyMissing}
            />
        </div>
      </div>
    </div>,
    document.body
  );
};
