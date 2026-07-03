import React from 'react';
import { motion } from 'framer-motion';

const CanvasBoard = ({ children }) => {
  return (
    <div className="flex-1 p-8 flex items-center justify-center bg-[#e0ddd7] min-h-[600px]">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl aspect-[4/3] skeuo-card p-12 paper-texture relative overflow-hidden"
      >
        {/* Inner shadow overlay for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.05)] pointer-events-none rounded-[inherit]" />

        <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
          {children || (
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4 opacity-50">✨</div>
              <p className="text-xl font-medium">Your emoji creation appears here</p>
              <p className="text-sm mt-2 italic">Select a tool to start painting</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CanvasBoard;
