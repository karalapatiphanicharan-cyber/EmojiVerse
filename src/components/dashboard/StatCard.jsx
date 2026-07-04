import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-6 rounded-[2.5rem] shadow-skeuo-raised border-2 border-white relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${color}`} />

      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-xl`}>
          <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          {title}
        </h3>
      </div>

      <div className="relative">
        <span className="text-4xl font-black text-gray-900 tracking-tighter">
          {value}
        </span>
        <div className="h-1 w-12 bg-gray-100 mt-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className={`h-full w-full ${color}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
