import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Heart, ExternalLink, Maximize2 } from 'lucide-react';
import { toggleFavorite } from '../../utils/storageManager';
import { soundManager } from '../../utils/soundManager';

const CreationCard = ({ item, isFavorite, onDelete, onView }) => {
  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(item.id);
    soundManager.play('click');
    onView(); // Trigger re-render in parent if needed, though usually handled by state
  };

  const typeLabels = {
    art: 'Text Art',
    painter: 'Painting',
    animation: 'Motion Art',
    ai: 'AI Creation',
    secret: 'Secret Vault',
    converter: 'Photo Conv'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10, rotate: -1 }}
      className="bg-white p-4 pb-14 skeuo-card border-[12px] border-white relative group cursor-pointer"
      onClick={() => onView(item)}
    >
      <div className="aspect-square bg-studio-bg skeuo-inner flex items-center justify-center text-6xl mb-6 overflow-hidden relative p-4 group-hover:shadow-inner transition-shadow">
        <span className="group-hover:scale-110 transition-transform duration-500">{item.thumbnail}</span>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
           <button className="p-3 bg-white rounded-full text-gray-900 shadow-xl hover:scale-110 transition-transform">
              <Maximize2 size={20} />
           </button>
        </div>
      </div>

      <div className="px-2">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight truncate flex-1">
            {item.name}
          </h3>
          <button
            onClick={handleToggleFav}
            className={`transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-300'}`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
            {typeLabels[item.type] || 'Artwork'}
          </span>
          <span className="text-[9px] text-gray-400 font-bold uppercase">
            {new Date(item.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Stacked photo effect */}
      <div className="absolute -bottom-2 -right-2 w-full h-full bg-white/40 -z-10 rounded-3xl border border-white/50" />
      <div className="absolute -bottom-4 -right-4 w-full h-full bg-white/20 -z-20 rounded-3xl border border-white/50" />
    </motion.div>
  );
};

export default CreationCard;
