import React from 'react';
import { motion } from 'framer-motion';

const SkeuoButton = ({ children, onClick, className = '', primary = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold',
  };

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ y: 2, scale: 0.98 }}
      onClick={onClick}
      className={`
        relative flex items-center justify-center gap-2
        ${sizeClasses[size]}
        ${primary ? 'bg-studio-accent text-white' : 'bg-studio-surface text-gray-700'}
        rounded-xl
        transition-colors duration-200
        shadow-[6px_6px_12px_#d1cdc7,-6px_-6px_12px_#ffffff]
        hover:shadow-[8px_8px_16px_#d1cdc7,-8px_-8px_16px_#ffffff]
        active:shadow-[inset_4px_4px_8px_#d1cdc7,inset_-4px_-4px_8px_#ffffff]
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default SkeuoButton;
