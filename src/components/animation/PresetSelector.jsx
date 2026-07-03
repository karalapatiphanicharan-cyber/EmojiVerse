import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Bomb, Type, Waves, MousePointer2 } from 'lucide-react';

const PresetSelector = ({ activePreset, onSelect }) => {
  const presets = [
    { id: 'rain', label: 'Rain', icon: CloudRain, color: 'text-blue-500' },
    { id: 'explosion', label: 'Explosion', icon: Bomb, color: 'text-red-500' },
    { id: 'typewriter', label: 'Typewriter', icon: Type, color: 'text-gray-700' },
    { id: 'wave', label: 'Wave', icon: Waves, color: 'text-cyan-500' },
    { id: 'bounce', label: 'Bounce', icon: MousePointer2, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        {presets.map((p) => {
          const Icon = p.icon;
          return (
            <motion.button
              key={p.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(p.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                activePreset === p.id
                  ? 'bg-white shadow-skeuo-pressed ring-2 ring-blue-500/20'
                  : 'bg-white/40 hover:bg-white shadow-skeuo-raised text-gray-500'
              }`}
            >
              <div className={`p-3 rounded-xl bg-gray-50 ${activePreset === p.id ? p.color : 'text-gray-400'}`}>
                <Icon size={20} />
              </div>
              <span className="font-bold text-sm tracking-tight">{p.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PresetSelector;
