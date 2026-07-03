import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

const MultiEmojiTray = ({ selectedEmojis, onAdd, onRemove, onReorder }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Emoji Brush Tray</h3>
        <span className="text-xs font-bold text-gray-400">{selectedEmojis.length}/10</span>
      </div>

      <div className="flex flex-wrap gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-[24px] shadow-skeuo-inner min-h-[80px]">
        <AnimatePresence>
          {selectedEmojis.map((emoji, index) => (
            <motion.div
              key={`${emoji}-${index}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ y: -2 }}
              className="relative group w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-skeuo-raised text-2xl cursor-grab active:cursor-grabbing"
            >
              {emoji}
              <button
                onClick={() => onRemove(index)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X size={12} strokeWidth={3} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {selectedEmojis.length < 10 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-500 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-colors"
          >
            <Plus size={24} />
          </motion.button>
        )}
      </div>

      <p className="text-[10px] text-gray-400 text-center font-medium">
        Art cycles through your selected emojis per row
      </p>
    </div>
  );
};

export default MultiEmojiTray;
