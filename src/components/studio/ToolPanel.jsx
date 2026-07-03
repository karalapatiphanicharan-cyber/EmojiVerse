import React from 'react';
import { Type, Brush, Layers, Sparkles, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const ToolButton = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
      ${active
        ? 'skeuo-pressed text-studio-accent'
        : 'hover:bg-black/5 text-gray-600'}
    `}
  >
    <div className={`p-2 rounded-xl ${active ? 'bg-studio-accent/10 shadow-inner' : 'bg-studio-surface shadow-md'}`}>
      <Icon size={20} />
    </div>
    <span className="font-bold text-sm tracking-wide uppercase">{label}</span>
  </motion.button>
);

const ToolPanel = () => {
  const [activeTool, setActiveTool] = React.useState('text');

  const tools = [
    { id: 'text', icon: Type, label: 'Text Painter' },
    { id: 'brush', icon: Brush, label: 'Emoji Brush' },
    { id: 'gradient', icon: Layers, label: 'Gradient Mode' },
    { id: 'animation', icon: Sparkles, label: 'Animation' },
    { id: 'converter', icon: Image, label: 'Converter' },
  ];

  return (
    <div className="w-72 h-[calc(100vh-120px)] skeuo-raised p-6 flex flex-col gap-8 m-4">
      <div>
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Emoji Tools</h3>
        <div className="space-y-4">
          {tools.map((tool) => (
            <ToolButton
              key={tool.id}
              {...tool}
              active={activeTool === tool.id}
              onClick={() => setActiveTool(tool.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-200/50">
        <div className="p-4 skeuo-inner bg-studio-bg/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Current Tool</p>
          <p className="font-bold text-studio-accent capitalize">{activeTool.replace('-', ' ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
