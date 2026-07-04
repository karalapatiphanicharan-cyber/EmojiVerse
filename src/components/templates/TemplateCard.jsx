import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SkeuoButton from '../common/SkeuoButton';

const TemplateCard = ({ template, onUse }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-[2.5rem] p-6 shadow-skeuo-raised border-2 border-white flex flex-col h-full group"
    >
      <div className={`aspect-video rounded-3xl mb-6 flex items-center justify-center text-6xl relative overflow-hidden ${template.bgColor}`}>
         <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
         <motion.span
           animate={{ scale: [1, 1.1, 1] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="z-10"
         >
           {template.emoji}
         </motion.span>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-2">
          {template.title}
        </h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
          {template.toolLabel}
        </p>
      </div>

      <SkeuoButton
        onClick={() => onUse(template)}
        className="w-full py-4 bg-stone-900 text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
      >
        Use Template <ArrowUpRight size={14} />
      </SkeuoButton>
    </motion.div>
  );
};

export default TemplateCard;
