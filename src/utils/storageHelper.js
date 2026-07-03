const RECENT_EMOJIS_KEY = 'emojiverse_recent_emojis';
const MAX_RECENT = 12;

export const getRecentEmojis = () => {
  const stored = localStorage.getItem(RECENT_EMOJIS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveRecentEmoji = (emoji) => {
  if (!emoji) return;

  let recent = getRecentEmojis();

  // Remove if already exists to move to front
  recent = recent.filter(e => e !== emoji);

  // Add to front
  recent.unshift(emoji);

  // Keep only MAX_RECENT
  recent = recent.slice(0, MAX_RECENT);

  localStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(recent));
};
