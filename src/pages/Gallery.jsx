import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../hooks/useAnimation';

const GalleryCard = ({ title, emoji, date }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8, rotate: -1 }}
    className="bg-white p-4 pb-12 skeuo-card border-[12px] border-white"
  >
    <div className="aspect-square bg-studio-bg skeuo-inner flex items-center justify-center text-6xl mb-6 overflow-hidden">
      <motion.span
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {emoji}
      </motion.span>
    </div>
    <div className="px-2">
      <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight">{title}</h3>
      <p className="text-xs text-gray-400 font-bold mt-1">{date}</p>
    </div>
    {/* Physical photo card detail: Tape or Clip would be nice, but keeping it clean skeuo */}
  </motion.div>
);

const Gallery = () => {
  const creations = [
    { id: 1, title: "Fire Art", emoji: "🔥", date: "Oct 24, 2023" },
    { id: 2, title: "Love Design", emoji: "❤️", date: "Nov 02, 2023" },
    { id: 3, title: "Space Mode", emoji: "🚀", date: "Dec 15, 2023" },
    { id: 4, title: "Ocean Vibes", emoji: "🌊", date: "Jan 10, 2024" },
    { id: 5, title: "Forest Spirit", emoji: "🌲", date: "Feb 14, 2024" },
    { id: 6, title: "Neon Nights", emoji: "🌃", date: "Mar 01, 2024" },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-black text-gray-900 mb-4">My Emoji Creations</h2>
        <p className="text-gray-500 font-medium italic">A physical collection of your digital imagination</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        {creations.map((item) => (
          <GalleryCard key={item.id} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
