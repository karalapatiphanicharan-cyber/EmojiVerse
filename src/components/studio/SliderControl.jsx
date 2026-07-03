import React from 'react';

const SliderControl = ({ label, value, min = 0, max = 100, onChange }) => {
  return (
    <div className="space-y-3 px-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">{label}</label>
        <span className="text-xs font-mono font-bold text-studio-accent bg-studio-accent/10 px-2 py-0.5 rounded-full">{value}</span>
      </div>
      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-2 skeuo-inner shadow-inner pointer-events-none" />
        {/* Progress */}
        <div
          className="absolute h-2 bg-studio-accent/30 rounded-full pointer-events-none"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="
            absolute w-full h-2 opacity-0 cursor-pointer z-10
          "
        />
        {/* 3D Thumb Replacement */}
        <div
          className="absolute w-6 h-6 skeuo-raised bg-studio-surface border-2 border-white rounded-full pointer-events-none shadow-md"
          style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 12px)` }}
        />
      </div>
    </div>
  );
};

export default SliderControl;
