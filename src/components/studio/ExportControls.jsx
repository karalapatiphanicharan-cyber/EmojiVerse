import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Trash2, Dices, Check } from 'lucide-react';
import { downloadAsTxt, downloadAsPng } from '../../utils/downloadHelper';
import { useToast } from '../../context/ToastContext';

const ExportControls = ({ art, onClear, onRandomize }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = () => {
    if (!art) {
      showToast("🎨 Create art first");
      return;
    }
    navigator.clipboard.writeText(art);
    setCopied(true);
    showToast("📋 Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!art) {
      showToast("📥 Nothing to download");
      return;
    }
    downloadAsTxt(art);
    showToast("📄 Downloading TXT...");
  };

  const handleDownloadPng = () => {
    if (!art) {
      showToast("🖼️ Generate emoji art first");
      return;
    }
    downloadAsPng('emoji-canvas');
    showToast("📸 Capturing art...");
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-skeuo-raised transition-all bg-white text-gray-700"
      >
        {copied ? <><Check size={18} className="text-green-500" /> Copied</> : <><Copy size={18} /> Copy Text</>}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownloadTxt}
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-skeuo-raised transition-all bg-white text-gray-700"
      >
        <Download size={18} /> TXT
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownloadPng}
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-skeuo-raised transition-all bg-white text-gray-700"
      >
        <Download size={18} /> PNG
      </motion.button>

      <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block"></div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRandomize}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold shadow-skeuo-raised"
      >
        <Dices size={18} /> Surprise Me
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-xl font-bold shadow-skeuo-raised"
      >
        <Trash2 size={18} /> Clear
      </motion.button>
    </div>
  );
};

export default ExportControls;
