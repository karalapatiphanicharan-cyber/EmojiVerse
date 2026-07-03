import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRecentEmojis, saveRecentEmoji } from '../../utils/storageHelper';

const EMOJI_CATEGORIES = [
  { name: 'Smileys', emojis: ['😀', '😂', '😎', '😭', '🤩', '😈'] },
  { name: 'Fire', emojis: ['🔥', '⚡', '💥', '⭐', '✨'] },
  { name: 'Nature', emojis: ['🌸', '🌊', '🌎', '🌙', '☀️'] },
  { name: 'Tech', emojis: ['🤖', '💻', '🚀', '⚙️'] },
  { name: 'Animals', emojis: ['🐱', '🐶', '🦁', '🐼'] },
];

const EmojiPicker = ({ selectedEmoji, onSelect }) => {
  const [recentEmojis, setRecentEmojis] = useState([]);
  const [customEmoji, setCustomEmoji] = useState('');

  useEffect(() => {
    setRecentEmojis(getRecentEmojis());
  }, [selectedEmoji]);

  const handleSelect = (emoji) => {
    onSelect(emoji);
    saveRecentEmoji(emoji);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customEmoji) {
      handleSelect(customEmoji);
      setCustomEmoji('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Emoji Picker</h3>
        <div className="space-y-4">
          {EMOJI_CATEGORIES.map((category) => (
            <div key={category.name}>
              <p className="text-xs text-gray-500 mb-2">{category.name}</p>
              <div className="flex flex-wrap gap-2">
                {category.emojis.map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelect(emoji)}
                    className={`w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all duration-200 ${
                      selectedEmoji === emoji
                        ? 'bg-blue-100 ring-2 ring-blue-500 shadow-inner'
                        : 'bg-white shadow-skeuo-raised hover:shadow-skeuo-pressed'
                    }`}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Custom Emoji</h3>
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="text"
            value={customEmoji}
            onChange={(e) => setCustomEmoji(e.target.value)}
            placeholder="🦄"
            className="w-full px-4 py-2 rounded-xl bg-gray-50 shadow-inner border-none focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            maxLength={2}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow-skeuo-raised font-bold text-sm"
          >
            Add
          </motion.button>
        </form>
      </div>

      {recentEmojis.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Recent</h3>
          <div className="flex flex-wrap gap-2">
            {recentEmojis.map((emoji, index) => (
              <motion.button
                key={`${emoji}-${index}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSelect(emoji)}
                className={`w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all duration-200 ${
                  selectedEmoji === emoji
                    ? 'bg-blue-100 ring-2 ring-blue-500 shadow-inner'
                    : 'bg-white shadow-skeuo-raised hover:shadow-skeuo-pressed'
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
