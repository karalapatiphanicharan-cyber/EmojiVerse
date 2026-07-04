import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../utils/storageManager';
import { soundManager } from '../utils/soundManager';

export const useSettings = () => {
  const [settings, setSettingsState] = useState(getSettings());

  useEffect(() => {
    // Apply theme to document body
    document.body.className = `theme-${settings.theme}`;
    soundManager.setEnabled(settings.soundEnabled);
  }, [settings]);

  const updateSettings = (newSettings) => {
    const updated = saveSettings(newSettings);
    setSettingsState(updated);
    return updated;
  };

  return {
    settings,
    updateSettings
  };
};
