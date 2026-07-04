import { useState, useCallback } from 'react';
import { encodeMessage, decodeMessage } from '../utils/emojiCipher.js';
import { generateEmojiPassword, calculateStrength } from '../utils/passwordGenerator.js';
import { useToast } from '../context/ToastContext.jsx';

/**
 * Custom hook to manage secret message logic for the Secret Lab.
 */
export const useSecretMessage = () => {
  const [mode, setMode] = useState('encode'); // 'encode', 'decode', 'password'
  const [theme, setTheme] = useState('random');

  // Encode States
  const [encodeInput, setEncodeInput] = useState('');
  const [encodeKey, setEncodeKey] = useState('');
  const [encodeOutput, setEncodeOutput] = useState('');

  // Decode States
  const [decodeInput, setDecodeInput] = useState('');
  const [decodeKey, setDecodeKey] = useState('');
  const [decodeOutput, setDecodeOutput] = useState('');

  // Password States
  const [pwdBase, setPwdBase] = useState('');
  const [pwdOutput, setPwdOutput] = useState('');
  const [pwdStrength, setPwdStrength] = useState(0);

  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  // Handle encoding
  const handleEncode = useCallback(() => {
    if (!encodeInput.trim()) {
      showToast("Please enter a message first");
      return;
    }
    const result = encodeMessage(encodeInput, theme, encodeKey);
    if (result) {
      setEncodeOutput(result.emojiString);
    }
  }, [encodeInput, theme, encodeKey, showToast]);

  // Handle decoding
  const handleDecode = useCallback(() => {
    if (!decodeInput.trim()) {
      showToast("Please paste your secret emoji");
      return;
    }
    const result = decodeMessage(decodeInput, decodeKey);

    if (result.success) {
      setDecodeOutput(result.text);
    } else {
      if (result.error === 'WRONG_KEY') {
        showToast("Invalid secret key");
      } else if (result.error === 'INVALID_FORMAT' || result.error === 'INVALID_DATA') {
        showToast("Unable to decode this message");
      }
      setDecodeOutput('');
    }
  }, [decodeInput, decodeKey, showToast]);

  // Handle password generation
  const handleGeneratePassword = useCallback(() => {
    // If pwdBase is empty, it will use "emoji" as default in utility
    const pwd = generateEmojiPassword(pwdBase, theme === 'random' ? 'hacker' : theme);
    setPwdOutput(pwd);
    setPwdStrength(calculateStrength(pwd));
  }, [pwdBase, theme]);

  // Reset states based on current mode
  const reset = useCallback(() => {
    if (mode === 'encode') {
      setEncodeInput('');
      setEncodeKey('');
      setEncodeOutput('');
    } else if (mode === 'decode') {
      setDecodeInput('');
      setDecodeKey('');
      setDecodeOutput('');
    } else if (mode === 'password') {
      setPwdBase('');
      setPwdOutput('');
      setPwdStrength(0);
    }
    setIsCopied(false);
  }, [mode]);

  // Copy to clipboard helper
  const copyToClipboard = async (text) => {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      showToast("Copied Successfully");
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

    // Encode
    encodeInput, setEncodeInput,
    encodeKey, setEncodeKey,
    encodeOutput,
    handleEncode,

    // Decode
    decodeInput, setDecodeInput,
    decodeKey, setDecodeKey,
    decodeOutput,
    handleDecode,

    // Password
    pwdBase, setPwdBase,
    pwdOutput,
    pwdStrength,
    handleGeneratePassword,

    reset,
    copyToClipboard,
    isCopied,
    themes: cipherThemes
  };
};
