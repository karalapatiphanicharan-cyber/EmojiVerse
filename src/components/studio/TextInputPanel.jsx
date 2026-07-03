import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TextInputPanel = ({ text, setText, onGenerate, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your magic word..."
            className="w-full px-6 py-4 text-lg rounded-2xl bg-white shadow-inner border-none focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-300"
            maxLength={15}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98, translateY: 2 }}
          disabled={isLoading}
          className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-skeuo-raised font-bold text-lg whitespace-nowrap transition-opacity ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
        >
          {isLoading ? (
            "Creating magic..."
          ) : (
            <>
              Create Emoji Art <Sparkles size={20} />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default TextInputPanel;
