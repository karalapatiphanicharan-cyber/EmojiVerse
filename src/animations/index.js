/**
 * Animation Variants for EmojiVerse Animation Studio
 */

export const rainVariants = {
  hidden: { y: -500, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      delay: i * 0.01,
    }
  })
};

export const explosionVariants = {
  hidden: { x: 0, y: 0, scale: 0, opacity: 1 },
  visible: (i) => ({
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 600,
    rotate: (Math.random() - 0.5) * 720,
    scale: 1.5,
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      delay: i * 0.005,
    }
  }),
  reset: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const typewriterVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      delay: i * 0.05,
    }
  })
};

export const waveVariants = {
  animate: (i) => ({
    y: [0, -40, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: (i % 20) * 0.1, // Column-based delay
    }
  })
};

export const bounceVariants = {
  animate: (i) => ({
    y: [0, -60, 0],
    scaleY: [1, 0.8, 1.2, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeOut",
      delay: Math.random() * 0.5,
    }
  })
};
