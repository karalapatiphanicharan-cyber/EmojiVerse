import { useState, useCallback, useEffect } from 'react';
import { encodeMessage, decodeMessage, CIPHER_THEMES } from '../utils/emojiCipher.js';
import { generateEmojiPassword, calculateStrength } from '../utils/passwordGenerator.js';
import { saveSecretMessage, getSecretMessage } from '../utils/secretStorage.js';

/**
 * Custom hook to manage secret message logic for the Secret Lab.
 */
export const useSecretMessage = () => {
  const [mode, setMode] = useState('encode'); // 'encode', 'decode', 'password'
  const [theme, setTheme] = useState('random');
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [output, setOutput] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [history, setHistory] = useState([]);

  // Handle encoding
  const handleEncode = useCallback(() => {
    if (!inputText) return;
    const encoded = encodeMessage(inputText, theme, secretKey);
    setOutput(encoded);
  }, [inputText, theme, secretKey]);

  // Handle decoding
  const handleDecode = useCallback(() => {
    if (!inputText) return;
    const decoded = decodeMessage(inputText, theme, secretKey);
    setOutput(decoded);
  }, [inputText, theme, secretKey]);

  // Handle password generation
  const handleGeneratePassword = useCallback((userName) => {
    const pwd = generateEmojiPassword(userName || 'User', theme === 'random' ? 'hacker' : theme);
    setOutput(pwd);
    setPasswordStrength(calculateStrength(pwd));
  }, [theme]);

  // Save to history/storage
  const saveToSecretVault = useCallback(() => {
    if (!output || mode === 'password') return null;
    const id = saveSecretMessage(output, theme, secretKey);
    return id;
  }, [output, theme, secretKey, mode]);

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
    saveToSecretVault,
    reset,
    copyToClipboard,
    isCopied,
    themes: CIPHER_THEMES
  };
};
