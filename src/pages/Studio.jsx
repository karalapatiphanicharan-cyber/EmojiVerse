import React from 'react';
import ToolPanel from '../components/studio/ToolPanel';
import CanvasBoard from '../components/studio/CanvasBoard';
import SettingsPanel from '../components/studio/SettingsPanel';
import { motion } from 'framer-motion';

const Studio = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-24 min-h-screen flex"
    >
      <ToolPanel />
      <CanvasBoard />
      <SettingsPanel />
    </motion.div>
  );
};

export default Studio;
