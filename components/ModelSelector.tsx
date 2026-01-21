import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_MODELS } from '../constants';

interface ModelSelectorProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  className?: string; // Allow passing extra classes for positioning/sizing within parent
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModelId, 
  onSelectModel,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedModelName = AI_MODELS.find(m => m.id === selectedModelId)?.name || 'Select Model';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-2 px-3 rounded-lg flex items-center justify-between gap-2 border border-transparent hover:border-slate-300 transition-all outline-none focus:ring-2 focus:ring-indigo-500/50"
      >
        <span className="truncate">{selectedModelName}</span>
        <svg 
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-[60]"
          >
             <div className="py-1 max-h-60 overflow-y-auto">
               <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select AI Model
               </div>
               {AI_MODELS.map((model) => (
                 <button
                   key={model.id}
                   onClick={() => {
                     onSelectModel(model.id);
                     setIsOpen(false);
                   }}
                   className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between group ${
                     selectedModelId === model.id 
                       ? 'bg-indigo-50 text-indigo-700 font-medium' 
                       : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                   }`}
                 >
                   <span>{model.name}</span>
                   {selectedModelId === model.id && (
                     <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                     </svg>
                   )}
                 </button>
               ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
