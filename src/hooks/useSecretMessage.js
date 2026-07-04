import { useState, useCallback } from 'react';
import { encodeMessage, decodeMessage } from '../utils/emojiCipher.js';
import { themes } from '../utils/emojiThemes.js';
import { generateEmojiPassword, calculateStrength } from '../utils/passwordGenerator.js';
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
  const [output, setOutput] = useState(''); // This will store { display, full } or just string
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  // Handle encoding
  const handleEncode = useCallback(() => {
    if (!inputText) return;
    const encoded = encodeMessage(inputText, theme, secretKey);

    // Save to storage immediately as requested
    saveSecretMessage(encoded);

    // Set output to show display emojis, but keep full string for copying
    setOutput({
      display: encoded.emojiString,
      full: encoded.fullString
    });
  }, [inputText, theme, secretKey]);

  // Handle decoding
  const handleDecode = useCallback(() => {
    if (!inputText) return;
    const result = decodeMessage(inputText, secretKey);

    if (result.success) {
      setOutput(result.text);
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
    const pwd = generateEmojiPassword(userName || 'User', theme === 'random' ? 'hacker' : theme);
    setOutput(pwd);
    setPasswordStrength(calculateStrength(pwd));
  }, [theme]);

  // Reset state
  const reset = () => {
    setInputText('');
    setOutput('');
    setSecretKey('');
    setIsCopied(false);
  };

  // Copy to clipboard helper
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
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
    reset,
    copyToClipboard,
    isCopied,
    themes: cipherThemes
  };
};
