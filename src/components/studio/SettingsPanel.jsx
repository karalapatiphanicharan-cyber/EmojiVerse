import React from 'react';

const SettingsPanel = ({ children }) => {
  return (
    <aside className="w-full lg:w-80 lg:min-w-[20rem] h-auto lg:h-[calc(100vh-6rem)] skeuo-raised p-8 flex flex-col gap-10 m-0 lg:m-4 overflow-y-auto bg-studio-surface/50 border-t lg:border-t-0">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Settings & Styles</h3>
      {children}
    </aside>
  );
};

export default SettingsPanel;
