import { getEmojiForColor } from './colorEmojiMap';

/**
 * Processes an image and converts it to an emoji matrix.
 */
export const processImageToEmoji = async (imageSrc, options = {}) => {
  const {
    resolution = 32,
    mode = 'emoji',
    customPalette = null,
    onProgress = () => {}
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Target dimensions maintaining aspect ratio
      let targetWidth = resolution;
      let targetHeight = Math.round((img.height / img.width) * resolution);

      // Clamp height for performance
      if (targetHeight > 128) {
        targetHeight = 128;
        targetWidth = Math.round((img.width / img.height) * 128);
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw and resize
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;
      const matrix = [];

      for (let y = 0; y < targetHeight; y++) {
        const row = [];
        for (let x = 0; x < targetWidth; x++) {
          const idx = (y * targetWidth + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          // const a = data[idx + 3];

          const emoji = getEmojiForColor(r, g, b, mode, customPalette);
          row.push(emoji);
        }
        matrix.push(row);

        // Report progress
        if (y % 5 === 0) {
          onProgress(y / targetHeight);
        }
      }

      onProgress(1);
      resolve(matrix);
    };

    img.onerror = (err) => reject(err);
  });
};
