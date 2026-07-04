import React from 'react';
import { motion } from 'framer-motion';

const SkeuoButton = ({
  children,
  onClick,
  className = '',
  primary = false,
  active = false,
  disabled = false,
  size = 'md',
  'aria-label': ariaLabel,
  title
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg font-bold min-h-[56px]',
  };

  // Base styles for the physical button feel
  const baseShadow = "shadow-[6px_6px_12px_#d1cdc7,-6px_-6px_12px_#ffffff]";
  const hoverShadow = "hover:shadow-[8px_8px_16px_#d1cdc7,-8px_-8px_16px_#ffffff]";
  const pressedShadow = "active:shadow-[inset_4px_4px_8px_#d1cdc7,inset_-4px_-4px_8px_#ffffff]";

  // Color states
  let colorClass = "bg-[#f5f0e8] text-[#0f172a]"; // Normal: soft beige background, dark navy text

  if (primary || active) {
    colorClass = "bg-[#ff6b6b] text-white"; // Active/Primary: accent color, white text
  }

  if (disabled) {
    colorClass = "bg-[#e5e0d8] text-[#777777] cursor-not-allowed opacity-70";
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { y: -4, scale: 1.02 }}
      whileTap={disabled ? {} : { y: 2, scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className={`
        relative flex items-center justify-center gap-2
        ${sizeClasses[size]}
        ${colorClass}
        rounded-xl
        transition-all duration-200
        ${disabled ? 'shadow-none' : `${baseShadow} ${hoverShadow} ${pressedShadow}`}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default SkeuoButton;
