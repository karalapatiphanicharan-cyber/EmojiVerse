import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import EmojiGridCell from './EmojiGridCell';

const EmojiPaintCanvas = ({ grid, onPaint, isPainting, setIsPainting, selectedEmoji }) => {
  const containerRef = useRef(null);

  const handlePointerDown = (x, y) => {
    setIsPainting(true);
    onPaint(x, y, selectedEmoji);
  };

  const handlePointerEnter = (x, y) => {
    if (isPainting) {
      onPaint(x, y, selectedEmoji);
    }
  };

  const handlePointerUp = useCallback(() => {
    setIsPainting(false);
  }, [setIsPainting]);

  // Global pointer up listener
  React.useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerUp]);

  return (
    <div
      className="bg-white rounded-[32px] shadow-skeuo-inner p-4 overflow-auto max-h-[600px] custom-scrollbar"
      onPointerLeave={() => {
        // Don't stop painting when leaving canvas, only on pointer up
      }}
    >
      <div
        className="inline-grid"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 20px)`,
          gridTemplateRows: `repeat(${grid.length || 0}, 20px)`,
        }}
      >
        {grid.map((row, y) =>
          row.map((emoji, x) => (
            <EmojiGridCell
              key={`${x}-${y}`}
              emoji={emoji}
              onPointerDown={() => handlePointerDown(x, y)}
              onPointerEnter={() => handlePointerEnter(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmojiPaintCanvas;
