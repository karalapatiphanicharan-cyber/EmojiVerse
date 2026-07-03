import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Eraser, PaintBucket, Move, Dice5 } from 'lucide-react';

const BrushToolbar = ({ activeTool, setTool }) => {
  const tools = [
    { id: 'brush', icon: Pencil, label: 'Brush' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'fill', icon: PaintBucket, label: 'Fill' },
    { id: 'move', icon: Move, label: 'Move' },
    { id: 'random', icon: Dice5, label: 'Random' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <motion.button
            key={tool.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTool(tool.id)}
            className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
              activeTool === tool.id
                ? 'bg-blue-500 text-white shadow-inner'
                : 'bg-white text-gray-500 shadow-skeuo-raised hover:text-blue-500'
            }`}
          >
            <Icon size={20} />
            <span className="text-[9px] font-bold uppercase mt-1">{tool.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default BrushToolbar;
