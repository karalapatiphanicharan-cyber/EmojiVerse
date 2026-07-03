import { useState, useCallback } from 'react';
import { floodFill, applyBrush } from '../utils/paintHelpers';

export const useEmojiPainter = (initialGrid, history) => {
  const [tool, setTool] = useState('brush');
  const [brushSize, setBrushSize] = useState('small');
  const [isPainting, setIsPainting] = useState(false);

  const paintCell = useCallback((x, y, emoji) => {
    const currentGrid = history.state;

    if (tool === 'brush') {
      const newGrid = applyBrush(currentGrid, x, y, emoji, brushSize);
      history.setState(newGrid);
    } else if (tool === 'eraser') {
      const newGrid = applyBrush(currentGrid, x, y, "", brushSize);
      history.setState(newGrid);
    } else if (tool === 'fill') {
      const newGrid = floodFill(currentGrid, x, y, emoji);
      history.setState(newGrid);
    } else if (tool === 'random') {
      const randomEmojis = ['🔥', '💎', '🌸', '🚀', '⭐', '🌈', '🤖', '🐱'];
      const randomEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
      const newGrid = applyBrush(currentGrid, x, y, randomEmoji, brushSize);
      history.setState(newGrid);
    }
  }, [tool, brushSize, history]);

  return {
    tool,
    setTool,
    brushSize,
    setBrushSize,
    isPainting,
    setIsPainting,
    paintCell
  };
};
