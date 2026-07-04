import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const AchievementCard = ({ title, description, icon, isUnlocked }) => {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05, rotate: 1 } : {}}
      className={`relative p-6 rounded-3xl border-2 transition-all duration-500 overflow-hidden
                 ${isUnlocked
                   ? 'bg-white border-amber-200 shadow-skeuo-raised'
                   : 'bg-gray-50 border-gray-100 opacity-60'}`}
    >
      <div className="flex items-center gap-5">
        <div className={`text-4xl filter ${isUnlocked ? '' : 'grayscale contrast-50'}`}>
          {isUnlocked ? icon : <Lock className="text-gray-300" size={32} />}
        </div>

        <div>
          <h4 className={`text-sm font-black uppercase tracking-tight ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
            {title}
          </h4>
          <p className="text-[10px] font-bold text-gray-400 mt-0.5 leading-tight">
            {description}
          </p>
        </div>
      </div>

      {isUnlocked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-1 -right-1 w-8 h-8 bg-amber-400 rounded-bl-2xl flex items-center justify-center shadow-lg"
        >
          <span className="text-[10px] font-black text-amber-900">NEW</span>
        </motion.div>
      )}

      {!isUnlocked && (
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gray-300 animate-pulse" />
        </div>
      )}
    </motion.div>
  );
};

export default AchievementCard;
