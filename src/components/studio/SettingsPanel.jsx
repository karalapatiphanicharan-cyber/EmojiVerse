import React from 'react';
import SliderControl from './SliderControl';

const SettingsPanel = () => {
  const [size, setSize] = React.useState(32);
  const [spacing, setSpacing] = React.useState(10);
  const [speed, setSpeed] = React.useState(50);

  return (
    <div className="w-80 h-[calc(100vh-120px)] skeuo-raised p-8 flex flex-col gap-10 m-4 overflow-y-auto">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Global Settings</h3>

      <div className="space-y-12">
        <SliderControl
          label="Emoji Size"
          value={size}
          min={16}
          max={128}
          onChange={setSize}
        />

        <SliderControl
          label="Spacing"
          value={spacing}
          min={0}
          max={50}
          onChange={setSpacing}
        />

        <SliderControl
          label="Anim Speed"
          value={speed}
          min={1}
          max={100}
          onChange={setSpeed}
        />
      </div>

      <div className="mt-auto pt-10">
        <button className="w-full py-4 skeuo-raised bg-studio-accent text-white font-bold rounded-2xl hover:brightness-105 active:shadow-skeuo-pressed transition-all">
          Export Art
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
