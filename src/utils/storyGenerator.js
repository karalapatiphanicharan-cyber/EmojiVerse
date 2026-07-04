/**
 * Emoji Story Generator for the AI Lab.
 */
import { translateToEmoji } from './emojiAI.js';

const storyStyles = {
  funny: ['😂', '🤡', '🍌', '🤸'],
  adventure: ['🚀', '🗺️', '⛰️', '🧭'],
  romantic: ['❤️', '🌹', '🕯️', '🥂'],
  dark: ['💀', '🖤', '🏚️', '🕯️'],
  fantasy: ['🧙', '🐉', '🏰', '✨']
};

/**
 * Generates an emoji story from text with a specific style.
 * @param {string} text - Input story text
 * @param {string} style - Story style (funny, adventure, etc.)
 * @returns {string} - Emoji story string
 */
export const generateStory = (text, style = 'adventure') => {
  if (!text) return '';

  const baseEmojis = translateToEmoji(text).split(' ');
  const styleEmojis = storyStyles[style] || storyStyles.adventure;

  let story = [];

  // Create a sequence
  baseEmojis.forEach((emoji, index) => {
    story.push(emoji);
    if (index < baseEmojis.length - 1) {
      story.push('➡️');
    }
  });

  // Add style flavor
  story.push('✨');
  story.unshift(styleEmojis[0]);
  story.push(styleEmojis[styleEmojis.length - 1]);

  return story.join('');
};

export default {
  generateStory,
  storyStyles
};
