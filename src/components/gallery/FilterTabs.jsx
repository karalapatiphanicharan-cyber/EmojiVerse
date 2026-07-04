import React from 'react';
import { motion } from 'framer-motion';

const FilterTabs = ({ activeFilter, setFilter }) => {
  const tabs = [
    { id: 'all', label: 'All Arts', icon: '🌎' },
    { id: 'art', label: 'Text', icon: '🎨' },
    { id: 'painter', label: 'Drawings', icon: '🖌️' },
    { id: 'animation', label: 'Motion', icon: '✨' },
    { id: 'ai', label: 'AI Bot', icon: '🤖' },
    { id: 'secret', label: 'Vault', icon: '🔐' },
    { id: 'favorites', label: 'Loved', icon: '❤️' },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className={`px-5 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 border-2
                     ${activeFilter === tab.id
                       ? 'bg-amber-400 border-amber-500 text-amber-950 font-black shadow-lg scale-105'
                       : 'bg-white border-white text-gray-400 font-bold shadow-skeuo-raised hover:border-gray-200'}`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[10px] uppercase tracking-widest">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
