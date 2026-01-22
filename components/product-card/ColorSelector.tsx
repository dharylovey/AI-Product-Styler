import React, { useRef } from 'react';
import { ProductColor } from '../../types';

interface ColorSelectorProps {
    availableColors: ProductColor[];
    selectedColor: ProductColor | null;
    customColor: string;
    onColorSelect: (color: ProductColor) => void;
    onCustomColorChange: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
    availableColors,
    selectedColor,
    customColor,
    onColorSelect,
    onCustomColorChange,
}) => {
    const colorInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="mt-auto">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                Select Color Variant
            </label>
            <div className="flex flex-wrap gap-2 mb-6">
                {availableColors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                        <button
                            key={color.name}
                            onClick={() => onColorSelect(color)}
                            className={`relative w-8 h-8 rounded-full flex-shrink-0 border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500 border-white scale-110' : 'border-slate-200 hover:scale-105'}`}
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

                {/* Color Picker Button */}
                <div className="relative">
                    <button
                        onClick={() => colorInputRef.current?.click()}
                        className={`relative w-8 h-8 rounded-full flex-shrink-0 border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 ${selectedColor?.name === 'Custom' ? 'ring-2 ring-offset-2 ring-indigo-500 border-white scale-110' : 'border-slate-200 hover:scale-105'}`}
                        title="Custom Color"
                        aria-label="Select custom color"
                    >
                        <span className="sr-only">Pick a custom color</span>
                        {selectedColor?.name === 'Custom' && (
                            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/20">
                                <svg className="w-4 h-4 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                        )}
                    </button>
                    <input
                        ref={colorInputRef}
                        type="color"
                        className="absolute opacity-0 pointer-events-none w-0 h-0"
                        value={customColor}
                        onChange={(e) => onCustomColorChange(e.target.value)}
                    />
                </div>
            </div>

            {/* Selected Color Label */}
            {selectedColor && (
                <div className="mb-4 text-sm text-slate-600 font-medium">
                    Selected: <span className="text-indigo-600" style={{ color: selectedColor.name === 'Custom' ? selectedColor.hex : undefined }}>
                        {selectedColor.name === 'Custom' ? selectedColor.hex.toUpperCase() : selectedColor.name}
                    </span>
                </div>
            )}
        </div>
    );
};
