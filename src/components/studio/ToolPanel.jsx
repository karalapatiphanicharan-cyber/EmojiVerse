import React from 'react';
import { motion } from 'framer-motion';

const ToolPanel = ({ children }) => {
  return (
    <aside className="w-full lg:w-80 lg:min-w-[20rem] h-auto lg:h-[calc(100vh-6rem)] overflow-y-auto skeuo-raised p-6 flex flex-col gap-8 m-0 lg:m-4 bg-studio-surface/50 border-b lg:border-b-0">
      {children}
    </aside>
  );
};

export default ToolPanel;
