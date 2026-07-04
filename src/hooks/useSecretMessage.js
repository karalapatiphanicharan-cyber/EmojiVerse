import { useState, useCallback } from 'react';
import { encodeMessage, decodeMessage } from '../utils/emojiCipher.js';
import { themes } from '../utils/emojiThemes.js';
import { generateEmojiPassword, calculateStrength, calculateStrengthScore } from '../utils/passwordGenerator.js';
import { saveSecretMessage } from '../utils/secretStorage.js';
import { useToast } from '../context/ToastContext.jsx';

/**
 * Custom hook to manage secret message logic for the Secret Lab.
 */
export const useSecretMessage = () => {
  const [mode, setMode] = useState('encode'); // 'encode', 'decode', 'password'
  const [theme, setTheme] = useState('random');
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [output, setOutput] = useState(null); // Stores { display, full } for encode or string for others
  const [passwordStrength, setPasswordStrength] = useState(0); // Numeric score
  const [passwordLabel, setPasswordLabel] = useState(''); // Text label (Strong, etc)
  const [isCopied, setIsCopied] = useState(false);
  const [isExported, setIsExported] = useState(false);
  const { showToast } = useToast();

  // Handle encoding
  const handleEncode = useCallback(() => {
    if (!inputText) return;
    const encoded = encodeMessage(inputText, theme, secretKey);

    // Save to storage
    saveSecretMessage(encoded);

    // Set output to show display emojis, but keep full string for exporting
    setOutput({
      display: encoded.emojiString,
      full: encoded.fullString
    });

    showToast("Encoded successfully ✨");
  }, [inputText, theme, secretKey, showToast]);

  // Handle decoding
  const handleDecode = useCallback(() => {
    if (!inputText) return;
    const result = decodeMessage(inputText, secretKey);

    if (result.success) {
      setOutput(result.text);
      showToast("Decoded successfully 🔓");
    } else {
      if (result.error === 'WRONG_KEY') {
        showToast("Wrong secret key 🔐");
      } else {
        showToast("Message not found or broken 🕵️");
      }
      setOutput('');
    }
  }, [inputText, secretKey, showToast]);

  // Handle password generation
  const handleGeneratePassword = useCallback((userName) => {
    const pwd = generateEmojiPassword(userName, theme === 'random' ? 'hacker' : theme);
    setOutput(pwd);
    setPasswordStrength(calculateStrengthScore(pwd));
    setPasswordLabel(calculateStrength(pwd));
  }, [theme]);

  // Reset state
  const reset = useCallback(() => {
    setInputText('');
    setOutput(null);
    setSecretKey('');
    setIsCopied(false);
    setPasswordStrength(0);
    setPasswordLabel('');
  }, []);

  // Copy to clipboard helper
  const copyToClipboard = async (text, toastMsg = "Copied 🔥", type = 'copy') => {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'export') {
        setIsExported(true);
        setTimeout(() => setIsExported(false), 2000);
      } else {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
      showToast(toastMsg);
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      return false;
    }
  };

  const cipherThemes = {
    space: { icon: '🚀', label: 'Space' },
    nature: { icon: '🌱', label: 'Nature' },
    food: { icon: '🍕', label: 'Food' },
    animals: { icon: '🐱', label: 'Animals' },
    random: { icon: '🎲', label: 'Random' }
  };

  return {
    mode,
    setMode,
    theme,
    setTheme,
    inputText,
    setInputText,
    secretKey,
    setSecretKey,
    output,
    handleEncode,
    handleDecode,
    handleGeneratePassword,
    passwordStrength,
    passwordLabel,
    reset,
    copyToClipboard,
    isCopied,
    isExported,
    themes: cipherThemes
  };
};
