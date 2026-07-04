import { useState, useCallback, useMemo } from 'react';
import { translateToEmoji } from '../utils/emojiAI';
import { analyzeMood } from '../utils/moodEngine';
import { generateStory } from '../utils/storyGenerator';
import { generateCaptions } from '../utils/captionEngine';
import { useToast } from '../context/ToastContext';

/**
 * Custom hook to manage Emoji AI Lab state and logic.
 */
export const useEmojiAI = () => {
  const [activeTool, setActiveTool] = useState('brain'); // 'brain', 'mood', 'story', 'caption', 'assistant', 'combo'
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const { showToast } = useToast();

  const handleProcess = useCallback(async (text = inputText, tool = activeTool, options = {}) => {
    if (!text && tool !== 'combo') {
      showToast("Tell Emoji AI something 🤖");
      return;
    }

    setIsProcessing(true);
    setResults(null);

    // Fake AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    try {
      let result = null;
      switch (tool) {
        case 'brain':
          result = translateToEmoji(text);
          if (!result) showToast("Emoji brain needs more words");
          break;
        case 'mood':
          result = analyzeMood(text);
          break;
        case 'story':
          result = generateStory(text, options.style || 'adventure');
          break;
        case 'caption':
          const mood = analyzeMood(text);
          result = generateCaptions(text, mood?.emoji || '✨');
          break;
        case 'assistant':
          const assistantMood = analyzeMood(text);
          const translation = translateToEmoji(text);
          result = {
            mood: assistantMood,
            emojiResponse: translation || '✨'
          };
          break;
        case 'combo':
          result = getCombo(options.category || 'Developer');
          break;
        default:
          break;
      }

      setResults(result);
    } catch (error) {
      console.error("AI Error:", error);
      showToast("Emoji AI got confused 😵");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, activeTool, showToast]);

  const getCombo = (category) => {
    const combos = {
      Developer: ['👨‍💻☕🌙🔥', '💻⚡🚀🤖', '🐛🛠️💪✨'],
      Gym: ['🏋️💪🔥👟', '🥗🥤🏃‍♂️💨', '👊💥🔋🔝'],
      Study: ['📚✍️🧠🎓', '📝☕💡📖', '🎯📉📈✅'],
      Travel: ['✈️🌍🧳📸', '🗺️🏔️🚗🌲', '🏝️🌊🍹☀️'],
      Gaming: ['🎮👾🕹️🎧', '⚔️🛡️🏆🔥', '🏰🐉🏹✨'],
      Food: ['🍕🍔🌮🍟', '🍣🍱🥢🍵', '🍦🍩🍪🥛']
    };
    return combos[category] || combos.Developer;
  };

  const getInspiration = () => {
    const ideas = [
      "Create your name using galaxy emojis",
      "Make a fire animation banner",
      "Express your morning routine in 5 emojis",
      "Tell a space adventure story",
      "Generate captions for a weekend trip",
      "Analyze your mood from today's diary"
    ];
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setInputText(randomIdea);
    showToast("Inspired! 🎲");
  };

  const reset = () => {
    setInputText('');
    setResults(null);
  };

  return {
    activeTool,
    setActiveTool,
    inputText,
    setInputText,
    isProcessing,
    results,
    handleProcess,
    getInspiration,
    reset
  };
};

export default useEmojiAI;
