import React from 'react';
import { motion } from 'framer-motion';

const EmojiParticles = ({ emojis = ['✨', '⭐', '💫'], count = 10, origin = { x: 0, y: 0 } }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 200;

        return (
          <motion.div
            key={i}
            initial={{
              x: origin.x,
              y: origin.y,
              opacity: 1,
              scale: 0
            }}
            animate={{
              x: origin.x + Math.cos(angle) * distance,
              y: origin.y + Math.sin(angle) * distance,
              opacity: 0,
              scale: 1.5,
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: Math.random() * 0.2
            }}
            className="absolute text-xl"
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

export default EmojiParticles;
