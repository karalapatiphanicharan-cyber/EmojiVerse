/**
 * Caption generation engine for the Emoji AI Lab.
 */

const captionTemplates = [
  { template: "{emoji} Exploring memories {sparkle}", sparkle: '✨' },
  { template: "{emoji} {text} mode activated {rocket}", rocket: '🚀' },
  { template: "Little moments, big memories {flower}", flower: '🌸' },
  { template: "{text} vibes only {sparkle}", sparkle: '✨' },
  { template: "Current status: {text} {emoji}", emoji: '🔥' },
  { template: "POV: You are {text} {eye}", eye: '👁️' },
  { template: "Living my best life {rainbow}", rainbow: '🌈' },
  { template: "{text} is all I need {heart}", heart: '❤️' }
];

/**
 * Generates captions for a given text.
 * @param {string} text - Input text
 * @param {string} moodEmoji - Main emoji detected for the mood
 * @returns {Array<string>} - Array of generated captions
 */
export const generateCaptions = (text, moodEmoji = '✨') => {
  if (!text) return [];

  // Shuffle templates
  const shuffled = [...captionTemplates].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 5).map(item => {
    return item.template
      .replace(/{text}/g, text)
      .replace(/{emoji}/g, moodEmoji)
      .replace(/{sparkle}|{rocket}|{flower}|{eye}|{rainbow}|{heart}/g, (match) => {
        return item[match.slice(1, -1)] || '✨';
      });
  });
};

export default {
  generateCaptions
};
