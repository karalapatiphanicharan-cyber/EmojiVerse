import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const CaptionGenerator = ({ results, isProcessing }) => {
  const { showToast } = useToast();
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast("Caption copied! 📋");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!results && !isProcessing) return null;

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 text-center">AI Captions Generated</div>
      <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
        {results?.map((caption, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-stone-700/50 p-4 rounded-2xl border border-stone-600 hover:border-emerald-500/50 hover:bg-stone-700 transition-all flex justify-between items-center"
          >
            <p className="text-stone-200 text-sm font-medium pr-8">{caption}</p>
            <button
              onClick={() => handleCopy(caption, i)}
              className="p-2 bg-stone-800 rounded-lg text-stone-400 hover:text-white hover:bg-stone-600 transition-all shadow-inner border border-stone-600 shrink-0"
            >
              {copiedIndex === i ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-[9px] font-mono text-stone-500 text-center uppercase">Sequence: Captions_Generated // Status: 200 OK</div>
    </div>
  );
};

export default CaptionGenerator;
