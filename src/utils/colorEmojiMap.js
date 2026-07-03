/**
 * Color Emoji Map Utility
 * Maps RGB values to emojis based on color modes.
 */

export const COLOR_PALETTE = [
  { name: 'black', rgb: [0, 0, 0], emoji: '⬛', art: '🌑' },
  { name: 'white', rgb: [255, 255, 255], emoji: '⬜', art: '☁️' },
  { name: 'red', rgb: [255, 0, 0], emoji: '🟥', art: '❤️' },
  { name: 'orange', rgb: [255, 165, 0], emoji: '🟧', art: '🔥' },
  { name: 'yellow', rgb: [255, 255, 0], emoji: '🟨', art: '⭐' },
  { name: 'green', rgb: [0, 128, 0], emoji: '🟩', art: '🌱' },
  { name: 'blue', rgb: [0, 0, 255], emoji: '🟦', art: '🌊' },
  { name: 'purple', rgb: [128, 0, 128], emoji: '🟪', art: '💜' },
  { name: 'brown', rgb: [165, 42, 42], emoji: '🟫', art: '🐻' },
  { name: 'pink', rgb: [255, 192, 203], emoji: '🌸', art: '🌸' },
  { name: 'skin-light', rgb: [255, 224, 189], emoji: '😊', art: '😊' },
  { name: 'skin-medium', rgb: [224, 172, 105], emoji: '🙂', art: '🙂' },
  { name: 'skin-dark', rgb: [141, 85, 36], emoji: '😄', art: '😄' },
];

/**
 * Calculates Euclidean distance between two RGB colors
 */
const getColorDistance = (rgb1, rgb2) => {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
    Math.pow(rgb1[1] - rgb2[1], 2) +
    Math.pow(rgb1[2] - rgb2[2], 2)
  );
};

/**
 * Finds the closest emoji for a given RGB color
 */
export const getEmojiForColor = (r, g, b, mode = 'emoji', customPalette = null) => {
  const palette = customPalette || COLOR_PALETTE;
  let closest = palette[0];
  let minDistance = Infinity;

  for (const item of palette) {
    const distance = getColorDistance([r, g, b], item.rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closest = item;
    }
  }

  if (mode === 'block') return closest.emoji;
  if (mode === 'art') return closest.art;
  if (mode === 'mixed') return Math.random() > 0.5 ? closest.emoji : closest.art;

  return closest.art; // Default to emoji style
};
