export const themes = {
  space: [
    "🚀", "🌙", "⭐", "🪐", "👽", "🛸", "🌠", "☄️",
    "🌌", "🔭", "🛰️", "👾", "🤖", "🌑", "☀️", "🌍"
  ],
  nature: [
    "🌱", "🌳", "🌸", "🍄", "🍃", "🌵", "🌻", "🌞",
    "🌿", "🍂", "🍏", "🦋", "🍀", "🍁", "🌼", "🌊"
  ],
  food: [
    "🍕", "🍔", "🍟", "🌭", "🍦", "🍩", "🍪", "🍰",
    "🍫", "🍧", "🍡", "🥣", "🥪", "🍱", "🍛", "🥤"
  ],
  animals: [
    "🐱", "🐶", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
    "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐒"
  ],
  random: [
    "🔥", "🌙", "🐱", "🚀", "🍕", "🎮", "⭐", "🌊",
    "🌱", "💜", "🐻", "🌸", "😊", "🙂", "😄", "✨"
  ]
};

export const getThemeEmoji = (themeId, index) => {
  const pool = themes[themeId] || themes.random;
  return pool[index % 16];
};

export const getEmojiIndex = (themeId, emoji) => {
  const pool = themes[themeId] || themes.random;
  return pool.indexOf(emoji);
};
