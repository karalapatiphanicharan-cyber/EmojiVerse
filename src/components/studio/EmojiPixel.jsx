import React from 'react';

const EmojiPixel = ({ emoji, size }) => {
  return (
    <div
      className="flex items-center justify-center select-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.75}px`
      }}
    >
      {emoji}
    </div>
  );
};

export default EmojiPixel;
