import { useState, useCallback, useEffect } from 'react';
import { processImageToEmoji } from '../utils/imageProcessor';
import { useToast } from '../context/ToastContext';

export const useImageConverter = () => {
  const [image, setImage] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [resultMatrix, setResultMatrix] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { showToast } = useToast();

  const [settings, setSettings] = useState({
    resolution: 32,
    mode: 'emoji', // 'block', 'emoji', 'mixed'
    density: 'medium',
    palette: null, // Custom emoji array
  });

  const handleUpload = useCallback((file) => {
    if (!file.type.startsWith('image/')) {
      showToast("Upload an image file 📸");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Compressing large image...");
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalUrl(e.target.result);
      setImage(file);
      setResultMatrix(null);
    };
    reader.readAsDataURL(file);
  }, [showToast]);

  const convertImage = useCallback(async () => {
    if (!originalUrl) {
      showToast("Choose an image first");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const matrix = await processImageToEmoji(originalUrl, {
        resolution: settings.resolution,
        mode: settings.mode === 'block' ? 'block' : 'art',
        customPalette: settings.palette,
        onProgress: (p) => setProgress(p)
      });

      // Handle Mixed mode separately if needed, though getEmojiForColor already handles it
      // But we might want more control here

      setResultMatrix(matrix);
      showToast("✨ Creation complete!");
    } catch (err) {
      console.error(err);
      showToast("❌ Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [originalUrl, settings, showToast]);

  // Auto-convert when settings change (debounced)
  useEffect(() => {
    if (originalUrl && !isProcessing) {
      const timer = setTimeout(() => {
        convertImage();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [settings.resolution, settings.mode, settings.palette, originalUrl]);

  return {
    image,
    originalUrl,
    resultMatrix,
    isProcessing,
    progress,
    settings,
    setSettings,
    handleUpload,
    convertImage,
    clearImage: () => {
      setImage(null);
      setOriginalUrl(null);
      setResultMatrix(null);
    }
  };
};
