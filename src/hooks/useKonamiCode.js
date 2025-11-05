/**
 * Konami Code Hook
 * ↑↑↓↓←→←→BA - The classic cheat code
 */

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function useKonamiCode(callback) {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newKeys = [...keys, e.key].slice(-KONAMI_CODE.length);
      setKeys(newKeys);

      if (newKeys.join(',') === KONAMI_CODE.join(',')) {
        callback();
        setKeys([]); // Reset after trigger
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, callback]);

  return null;
}
