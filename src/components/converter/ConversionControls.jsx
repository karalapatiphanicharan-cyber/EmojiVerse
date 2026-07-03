import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sliders, Zap, Palette } from 'lucide-react';

const ConversionControls = ({ settings, setSettings }) => {
  const resolutions = [
    { label: 'S', value: 24, desc: '32x32' },
    { label: 'M', value: 48, desc: '64x64' },
    { label: 'L', value: 80, desc: '128x128' },
  ];

  const modes = [
    { id: 'block', label: 'Blocks', icon: '🟥' },
    { id: 'emoji', label: 'Emoji', icon: '🎨' },
    { id: 'mixed', label: 'Mixed', icon: '✨' },
  ];

  return (
    <div className="space-y-8">
      {/* Resolution */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest px-1">
          <Layers size={14} /> Scan Resolution
        </div>
        <div className="flex gap-2">
          {resolutions.map((r) => (
            <button
              key={r.value}
              onClick={() => setSettings({ ...settings, resolution: r.value })}
              className={`flex-1 group relative py-3 rounded-2xl transition-all ${
                settings.resolution === r.value
                  ? 'bg-blue-600 text-white shadow-skeuo-pressed'
                  : 'bg-white text-gray-400 shadow-skeuo-raised hover:bg-gray-50'
              }`}
            >
              <span className="font-black text-sm">{r.label}</span>
              <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50`}>
                {r.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest px-1">
          <Zap size={14} /> Conversion Mode
        </div>
        <div className="grid grid-cols-1 gap-3">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setSettings({ ...settings, mode: m.id })}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                settings.mode === m.id
                  ? 'bg-white shadow-skeuo-pressed ring-2 ring-blue-500/20'
                  : 'bg-white/50 text-gray-500 shadow-skeuo-raised hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{m.icon}</span>
                <span className="font-bold text-sm">{m.label}</span>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${settings.mode === m.id ? 'bg-blue-500 border-blue-600' : 'border-gray-200'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Density / Performance Info */}
      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-[10px] uppercase tracking-widest mb-2">
          <Sliders size={12} /> Optimization Engine
        </div>
        <p className="text-[10px] text-blue-600 leading-relaxed">
          High resolution converts up to 10,000 pixels. Larger images are automatically optimized for performance.
        </p>
      </div>
    </div>
  );
};

export default ConversionControls;
