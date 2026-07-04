/**
 * Sound Manager
 * Handles skeuomorphic audio feedback for EmojiVerse.
 */

import { getSettings } from './storageManager';

const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Soft pop
  success: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3', // Sparkle/success
  save: 'https://assets.mixkit.co/active_storage/sfx/1110/1110-preview.mp3', // Camera shutter or mechanical save
  trash: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Crumple
  achievement: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' // Achievement fanfare
};

class SoundManager {
  constructor() {
    this.audioCache = {};
    this.enabled = getSettings().soundEnabled;
  }

  play(soundKey) {
    if (!this.enabled || !SOUNDS[soundKey]) return;

    try {
      if (!this.audioCache[soundKey]) {
        this.audioCache[soundKey] = new Audio(SOUNDS[soundKey]);
        this.audioCache[soundKey].volume = 0.4;
      }

      const audio = this.audioCache[soundKey];
      audio.currentTime = 0;
      audio.play().catch(e => console.warn('Audio play blocked by browser policies'));
    } catch (e) {
      console.error('Failed to play sound:', e);
    }
  }

  setEnabled(val) {
    this.enabled = val;
  }
}

export const soundManager = new SoundManager();
