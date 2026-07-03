import React from 'react';
import SliderControl from './SliderControl';

const StyleControls = ({ settings, setSettings, isPainter }) => {
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const bgOptions = [
    { id: 'paper', label: 'Paper', icon: '📄' },
    { id: 'wood', label: 'Wood', icon: '🪵' },
    { id: 'dark', label: 'Dark', icon: '🌑' },
    { id: 'glass', label: 'Glass', icon: '💎' },
  ];

  const sizeOptions = [
    { id: 'small', label: 'S' },
    { id: 'medium', label: 'M' },
    { id: 'large', label: 'L' },
  ];

  const densityOptions = [
    { id: 'compact', label: 'Compact' },
    { id: 'normal', label: 'Normal' },
    { id: 'wide', label: 'Wide' },
  ];

  const fontStyleOptions = [
    { id: 'block', label: 'Block' },
    { id: 'outline', label: 'Outline' },
    { id: 'shadow', label: 'Shadow' },
    { id: 'glitch', label: 'Glitch' },
  ];

  return (
    <div className="space-y-8">
      {!isPainter && (
        <>
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Font Style</h3>
            <div className="grid grid-cols-2 gap-2">
              {fontStyleOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateSetting('fontStyle', opt.id)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    settings.fontStyle === opt.id
                      ? 'bg-blue-500 text-white shadow-inner'
                      : 'bg-white text-gray-600 shadow-skeuo-raised hover:shadow-skeuo-pressed'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <SliderControl
            label="Letter Spacing"
            value={settings.letterSpacing}
            onChange={(val) => updateSetting('letterSpacing', val)}
            min={0}
            max={4}
          />

          <SliderControl
            label="Line Height"
            value={settings.lineHeight}
            onChange={(val) => updateSetting('lineHeight', val)}
            min={1}
            max={3}
          />
        </>
      )}

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Emoji Size</h3>
        <div className="flex gap-2">
          {sizeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateSetting('emojiSize', opt.id)}
              className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                settings.emojiSize === opt.id
                  ? 'bg-blue-500 text-white shadow-inner'
                  : 'bg-white text-gray-600 shadow-skeuo-raised hover:shadow-skeuo-pressed'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {!isPainter && (
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Emoji Density</h3>
          <div className="flex flex-col gap-2">
            {densityOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSetting('density', opt.id)}
                className={`w-full py-2 rounded-xl font-bold transition-all ${
                  settings.density === opt.id
                    ? 'bg-blue-500 text-white shadow-inner'
                    : 'bg-white text-gray-600 shadow-skeuo-raised hover:shadow-skeuo-pressed'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Background Style</h3>
        <div className="grid grid-cols-2 gap-3">
          {bgOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateSetting('bgStyle', opt.id)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                settings.bgStyle === opt.id
                  ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-500 shadow-inner'
                  : 'bg-white text-gray-600 shadow-skeuo-raised hover:shadow-skeuo-pressed'
              }`}
            >
              <span className="text-xl mb-1">{opt.icon}</span>
              <span className="text-xs font-bold">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleControls;
