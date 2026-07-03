export const transitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 20
  },
  smooth: {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
  }
};

export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const hoverLift = {
  hover: {
    y: -5,
    transition: transitions.spring
  },
  tap: {
    y: 2,
    transition: transitions.spring
  }
};

export const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
