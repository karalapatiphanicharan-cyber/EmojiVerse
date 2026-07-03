import { useState, useCallback } from 'react';

export const useHistory = (initialState) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = useCallback((newState) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, index + 1);
      newHistory.push(typeof newState === 'function' ? newState(prevHistory[index]) : newState);

      // Limit history size to 50 for performance
      if (newHistory.length > 50) {
        newHistory.shift();
      } else {
        setIndex((prevIndex) => prevIndex + 1);
      }

      return newHistory;
    });
  }, [index]);

  const undo = useCallback(() => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
      return history[index - 1];
    }
    return history[index];
  }, [history, index]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      return history[index + 1];
    }
    return history[index];
  }, [history, index]);

  const reset = useCallback((newState) => {
    setHistory([newState]);
    setIndex(0);
  }, []);

  return {
    state: history[index],
    setState,
    undo,
    redo,
    reset,
    canUndo: index > 0,
    canRedo: index < history.length - 1
  };
};
