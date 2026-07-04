/**
 * Export Manager
 * Unified API for exporting EmojiVerse creations in multiple formats.
 */

import { downloadAsPng, downloadAsTxt } from './downloadHelper';

/**
 * Unified export function
 * @param {Object} options
 * @param {string} options.type - 'png', 'txt', 'gif', 'json'
 * @param {Array} options.matrix - The pixel/emoji matrix
 * @param {string} options.elementId - DOM element ID for canvas capture (PNG)
 * @param {string} options.filename - Desired filename
 * @param {Object} options.settings - Additional settings (bgStyle, size, etc.)
 */
export const exportCreation = async ({ type, matrix, elementId, filename, settings }) => {
  const finalFilename = filename || `emojiverse-${Date.now()}`;

  switch (type) {
    case 'png':
      return downloadAsPng(elementId, `${finalFilename}.png`);

    case 'txt':
      return downloadAsTxt(matrix, `${finalFilename}.txt`);

    case 'gif':
      if (settings?.animation) {
         // GIF logic usually needs a worker and multiple frames,
         // here we trigger the existing gifExporter helper if available
         // but for phase 7 we simplify the interface
         return alert("GIF Exporting starting..."); // Placeholder for integration
      }
      break;

    case 'json':
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matrix));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${finalFilename}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      return true;

    case 'clipboard':
      return copyArtToClipboard(matrix);

    default:
      console.error('Unknown export type:', type);
      return false;
  }
};
