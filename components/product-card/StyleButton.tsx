import React from 'react';

interface StyleButtonProps {
    isGenerating: boolean;
    hasSelectedColor: boolean;
    hasGeneratedImage: boolean;
    onStyleWithAI: () => void;
}

export const StyleButton: React.FC<StyleButtonProps> = ({
    isGenerating,
    hasSelectedColor,
    hasGeneratedImage,
    onStyleWithAI,
}) => {
    return (
        <button
            onClick={onStyleWithAI}
            disabled={!hasSelectedColor || isGenerating}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-md transition-all ${
                !hasSelectedColor || isGenerating
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95'
            }`}
        >
            {hasGeneratedImage ? (
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
    );
};
