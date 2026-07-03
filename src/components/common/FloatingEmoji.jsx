import React from 'react';
import { motion } from 'framer-motion';

const FloatingEmoji = ({ emoji, initialX, initialY, delay = 0 }) => {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={{
        y: [initialY, initialY - 30, initialY],
        opacity: [0, 0.4, 0],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none text-4xl select-none"
    >
      {emoji}
    </motion.div>
  );
};

export const EmojiBackground = () => {
  const emojis = ['🎨', '🌈', '✨', '📸', '🔐', '🤖', '🔥', '❤️', '🚀', '⭐', '💎', '🍀'];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingEmoji
          key={i}
          emoji={emojis[i % emojis.length]}
          initialX={Math.random() * 100 + 'vw'}
          initialY={Math.random() * 100 + 'vh'}
          delay={Math.random() * 10}
        />
      ))}
    </div>
  );
};

export default FloatingEmoji;
