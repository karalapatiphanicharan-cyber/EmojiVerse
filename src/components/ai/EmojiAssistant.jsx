import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';

const EmojiAssistant = ({ results, isProcessing, onProcess }) => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isProcessing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setChat(prev => [...prev, userMsg]);
    onProcess(input);
    setInput('');
  };

  useEffect(() => {
    if (results && !isProcessing) {
      const botMsg = {
        role: 'bot',
        content: `Your emoji mood: ${results.mood.emoji} ${results.mood.label}\n\n${results.emojiResponse}`
      };
      setChat(prev => [...prev, botMsg]);
    }
  }, [results, isProcessing]);

  return (
    <div className="h-full flex flex-col p-4 bg-stone-900/30 rounded-[32px] border border-stone-700/50">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar"
      >
        {chat.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
            <Bot size={48} className="mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest">Awaiting neural input...</p>
          </div>
        )}

        {chat.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${
              msg.role === 'user'
                ? 'bg-indigo-600/20 border border-indigo-500/30 rounded-tr-none'
                : 'bg-stone-800 border border-stone-700 rounded-tl-none'
            }`}>
              <div className="shrink-0 mt-1">
                {msg.role === 'user' ? <User size={14} className="text-indigo-400" /> : <Bot size={14} className="text-amber-400" />}
              </div>
              <p className="text-xs text-stone-200 whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </p>
            </div>
          </motion.div>
        ))}

        {isProcessing && (
          <div className="flex justify-start">
             <div className="bg-stone-800 p-4 rounded-2xl rounded-tl-none border border-stone-700 flex gap-2">
               <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" />
               <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.2s]" />
               <div className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
      </div>

      <div className="relative group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Say something to AI..."
          className="w-full bg-stone-900 text-stone-200 p-4 pr-14 rounded-2xl border-2 border-stone-700 focus:border-indigo-500 focus:outline-none transition-all shadow-inner"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isProcessing}
          className="absolute right-2 top-2 p-2 bg-indigo-500 text-white rounded-xl shadow-lg hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50 disabled:bg-stone-700"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default EmojiAssistant;
