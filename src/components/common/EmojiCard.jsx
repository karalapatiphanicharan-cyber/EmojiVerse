import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../hooks/useAnimation';

const EmojiCard = ({ emoji, title, description, color }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, rotate: 1 }}
      className="skeuo-card p-6 flex flex-col items-center text-center group cursor-pointer"
    >
      <div
        className="w-16 h-16 mb-4 flex items-center justify-center text-4xl rounded-2xl skeuo-inner shadow-inner"
        style={{ backgroundColor: `${color}20` }}
      >
        {emoji}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

export default EmojiCard;
