import React, { memo } from 'react';

const EmojiGridCell = memo(({ emoji, onPointerEnter, onPointerDown }) => {
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      className="w-[20px] h-[20px] border-[0.5px] border-gray-100 flex items-center justify-center text-[14px] cursor-crosshair hover:bg-gray-50 transition-colors select-none touch-none"
    >
      {emoji}
    </div>
  );
});

EmojiGridCell.displayName = 'EmojiGridCell';

export default EmojiGridCell;
