import GIF from 'gif.js';

/**
 * Utility to export an animated emoji creation as a GIF.
 *
 * @param {HTMLElement} element - The DOM element to capture (e.g., the preview container).
 * @param {Object} options - Export options.
 * @param {number} options.duration - Duration in seconds.
 * @param {number} options.fps - Frames per second.
 * @param {Function} options.onProgress - Progress callback (0-1).
 */
export const exportToGif = async (element, options = {}) => {
  const {
    duration = 2,
    fps = 15,
    onProgress = () => {},
    quality = 10,
    workerPath = '/gif.worker.js'
  } = options;

  return new Promise(async (resolve, reject) => {
    try {
      // Lazy load html2canvas to keep bundle size small if not used
      const html2canvas = (await import('html2canvas')).default;

      const gif = new GIF({
        workers: 2,
        quality: quality,
        workerScript: workerPath,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      const frameCount = duration * fps;
      const delay = 1000 / fps;

      console.log(`Starting GIF export: ${frameCount} frames at ${fps}fps`);

      // We need to capture frames.
      // Note: Capturing live Framer Motion animations with html2canvas is resource intensive.
      // A better approach for production might involve a canvas-based renderer,
      // but for Phase-3 we will use the DOM-to-Canvas approach.

      for (let i = 0; i < frameCount; i++) {
        // Capture the current state of the element
        const canvas = await html2canvas(element, {
          backgroundColor: null,
          logging: false,
          useCORS: true,
          scale: 1, // Keep scale 1 for GIF to avoid massive files
        });

        gif.addFrame(canvas, { delay: delay, copy: true });
        onProgress((i + 1) / frameCount * 0.5); // First 50% is capturing
      }

      gif.on('progress', (p) => {
        onProgress(0.5 + p * 0.5); // Last 50% is rendering
      });

      gif.on('finished', (blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      });

      gif.on('error', (err) => {
        reject(err);
      });

      gif.render();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Triggers a download for the generated GIF URL.
 */
export const downloadGif = (url, filename = 'emojiverse-animation.gif') => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
