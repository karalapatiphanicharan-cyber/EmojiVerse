import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, RefreshCcw } from 'lucide-react';
import SkeuoButton from '../components/common/SkeuoButton';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center"
      >
        <div className="relative inline-block mb-12">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-[12rem] filter drop-shadow-2xl grayscale contrast-50 opacity-40"
          >
            😵
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md px-8 py-4 rounded-3xl shadow-xl border-2 border-white font-black text-6xl text-stone-900">
            404
          </div>
        </div>

        <h2 className="text-4xl font-black text-stone-900 uppercase tracking-tighter mb-4">
          This emoji got lost
        </h2>
        <p className="text-stone-500 font-bold mb-12 italic">
          The sequence you requested does not exist in our universe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <SkeuoButton
             onClick={() => navigate('/')}
             className="px-8 py-4 bg-stone-900 text-white font-black uppercase text-xs flex items-center justify-center gap-2"
           >
              <Home size={18} /> Go Home
           </SkeuoButton>
           <SkeuoButton
             onClick={() => navigate(-1)}
             className="px-8 py-4 bg-white text-stone-900 font-black uppercase text-xs flex items-center justify-center gap-2"
           >
              <RefreshCcw size={18} /> Go Back
           </SkeuoButton>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
