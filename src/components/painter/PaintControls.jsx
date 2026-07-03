import React from 'react';

const PaintControls = ({ brushSize, setBrushSize }) => {
  const sizes = [
    { id: 'small', label: 'S', px: '1x1' },
    { id: 'medium', label: 'M', px: '3x3' },
    { id: 'large', label: 'L', px: '5x5' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Brush Size</h3>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => setBrushSize(size.id)}
            className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center transition-all ${
              brushSize === size.id
                ? 'bg-blue-500 text-white shadow-inner'
                : 'bg-white text-gray-500 shadow-skeuo-raised hover:bg-gray-50'
            }`}
          >
            <span className="font-bold">{size.label}</span>
            <span className="text-[10px] opacity-70">{size.px}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaintControls;
