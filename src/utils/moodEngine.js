/**
 * Mood detection engine for the Emoji AI Lab.
 */

const moodMap = {
  happy: {
    keywords: ['happy', 'great', 'awesome', 'excited', 'good', 'love', 'amazing', 'fun', 'win'],
    emoji: '😊',
    label: 'Happy',
    suggestions: ['✨', '🌈', '🎉', '🌟', '💖'],
    style: 'block',
    animation: 'bounce'
  },
  sad: {
    keywords: ['sad', 'bad', 'crying', 'unhappy', 'broken', 'lost', 'lonely', 'miss', 'fail'],
    emoji: '😢',
    label: 'Sad',
    suggestions: ['🌧️', '💔', '🩹', '🫂', '☁️'],
    style: 'outline',
    animation: 'rain'
  },
  angry: {
    keywords: ['angry', 'mad', 'hate', 'annoyed', 'furious', 'stupid', 'worst', 'stop', 'quit'],
    emoji: '😡',
    label: 'Angry',
    suggestions: ['💢', '🤬', '🌋', '🔥', '🧨'],
    style: 'glitch',
    animation: 'explosion'
  },
  excited: {
    keywords: ['excited', 'can\'t wait', 'party', 'celebrate', 'hype', 'wow', 'omg', 'yes'],
    emoji: '🤩',
    label: 'Excited',
    suggestions: ['⚡', '🚀', '🔥', '💥', '🧨'],
    style: 'block',
    animation: 'explosion'
  },
  focused: {
    keywords: ['exam', 'test', 'study', 'work', 'code', 'build', 'read', 'learn', 'focus'],
    emoji: '🧠',
    label: 'Focused',
    suggestions: ['📚', '☕', '💪', '💡', '🎯'],
    style: 'block',
    animation: 'typewriter'
  },
  sleepy: {
    keywords: ['sleepy', 'tired', 'lazy', 'bored', 'night', 'bed', 'rest', 'exhausted'],
    emoji: '😴',
    label: 'Sleepy',
    suggestions: ['💤', '🛌', '☕', '🥱', '🌌'],
    style: 'shadow',
    animation: 'wave'
  },
  scared: {
    keywords: ['scared', 'afraid', 'nervous', 'worry', 'anxious', 'ghost', 'dark', 'help'],
    emoji: '😰',
    label: 'Nervous',
    suggestions: ['🛡️', '🫂', '💡', '💪', '🍀'],
    style: 'glitch',
    animation: 'bounce'
  }
};

/**
 * Detects mood from text and suggests emojis.
 * @param {string} text - Input text
 * @returns {Object} - Detected mood object
 */
export const analyzeMood = (text) => {
  if (!text) return null;

  const words = text.toLowerCase().split(/\s+/);
  let bestMood = null;
  let maxMatches = 0;

  Object.entries(moodMap).forEach(([key, data]) => {
    const matches = words.filter(word =>
      data.keywords.some(keyword => word.includes(keyword))
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMood = { id: key, ...data };
    }
  });

  // Default to happy if nothing detected
  return bestMood || { id: 'neutral', emoji: '😐', label: 'Neutral', suggestions: ['✨', '💭', '🌈'] };
};

export default {
  analyzeMood,
  moodMap
};
