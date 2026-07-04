/**
 * Keyword to emoji dictionary for the Emoji AI Brain.
 */
const emojiDictionary = {
  // Activities
  coding: ['👨‍💻', '💻', '🤖', '⚡'],
  programming: ['👨‍💻', '💻', '⌨️'],
  working: ['💼', '🏢', '☕'],
  sleeping: ['😴', '💤', '🛌'],
  eating: ['🍕', '🍔', '🌮', '🥗'],
  running: ['🏃', '👟', '💨'],
  gaming: ['🎮', '🕹️', '👾'],
  reading: ['📚', '📖', '🤓'],
  writing: ['✍️', '📝', '📓'],
  studying: ['🎓', '📖', '✏️'],
  traveling: ['✈️', '🌍', '🧳'],
  hiking: ['🥾', '🏔️', '🌲'],
  swimming: ['🏊', '🌊', '🩱'],
  dancing: ['💃', '🕺', '💃', '🎵'],

  // Objects/Tech
  phone: ['📱', '📞'],
  computer: ['💻', '🖥️'],
  car: ['🚗', '🚕', '🏎️'],
  bike: ['🚲', '🏍️'],
  plane: ['✈️', '🛩️'],
  rocket: ['🚀', '🛰️'],
  camera: ['📷', '📸'],
  watch: ['⌚', '⏰'],
  money: ['💰', '💵', '💸'],
  gift: ['🎁', '🎈', '🎉'],

  // Nature/Time
  night: ['🌙', '⭐', '🌌'],
  day: ['☀️', '🌞', '🏙️'],
  morning: ['🌅', '☕', '🍳'],
  evening: ['🌆', '🍹'],
  sun: ['☀️', '🌞'],
  moon: ['🌙', '🌕'],
  star: ['⭐', '🌟'],
  cloud: ['☁️', '🌦️'],
  rain: ['🌧️', '☔'],
  snow: ['❄️', '☃️'],
  fire: ['🔥', '🌋'],
  water: ['💧', '🌊'],
  tree: ['🌳', '🌲', '🌴'],
  flower: ['🌸', '🌻', '🌹'],

  // Emotions/People
  love: ['❤️', '💕', '😍', '💖'],
  happy: ['😊', '😄', '✨'],
  sad: ['😢', '😭', '💔'],
  angry: ['😡', '🤬', '💢'],
  scared: ['😱', '😨', '👻'],
  cool: ['😎', '🤙', '🧊'],
  smart: ['🧠', '🤓', '💡'],
  friend: ['👯', '🤝', '🙌'],
  family: ['👪', '🏠'],
  cat: ['🐱', '🐈', '🐾'],
  dog: ['🐶', '🐕', '🦴'],

  // Common Verbs
  go: ['➡️', '🏃'],
  want: ['✨', '🙏'],
  need: ['🆘', '⚠️'],
  like: ['👍', '❤️'],
  hate: ['👎', '💢'],
  feel: ['💭', '🧠'],
  think: ['🤔', '💭'],
  see: ['👁️', '👀'],
  hear: ['👂', '🎧'],

  // Places
  home: ['🏠', '🏡'],
  school: ['🏫', '🎓'],
  office: ['🏢', '💼'],
  gym: ['💪', '🏋️', '🏃'],
  beach: ['🏖️', '🏝️', '🌊'],
  space: ['🚀', '🌌', '👽'],
  city: ['🏙️', '🌃'],
  nature: ['🌲', '🏔️', '🌿']
};

/**
 * Converts a sentence into emoji expressions using keyword intelligence.
 * @param {string} text - Input sentence
 * @returns {string} - Emoji string
 */
export const translateToEmoji = (text) => {
  if (!text) return '';

  const words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
  let result = [];

  words.forEach(word => {
    // Exact match
    if (emojiDictionary[word]) {
      const options = emojiDictionary[word];
      result.push(options[Math.floor(Math.random() * options.length)]);
    } else {
      // Check for partial matches (e.g., "coding" for "coder")
      const foundKey = Object.keys(emojiDictionary).find(key =>
        word.includes(key) || key.includes(word)
      );
      if (foundKey && word.length > 3) {
        const options = emojiDictionary[foundKey];
        result.push(options[Math.floor(Math.random() * options.length)]);
      }
    }
  });

  // Remove duplicates and return
  return Array.from(new Set(result)).join(' ');
};

export default {
  translateToEmoji,
  emojiDictionary
};
