import { useEffect, useState } from 'react';
import { createCustomContext } from '../create-custom-context';

// Example of a game weapon system
const [_GameProvider, _useGameHotkeys] = createCustomContext(() => {
  const [_currentWeapon, setCurrentWeapon] = useState(0);
  const [_combo, setCombo] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Digit1') {
        setCurrentWeapon(0);
      }
      if (e.code === 'Digit2') {
        setCurrentWeapon(1);
      }
      if (e.code === 'Digit3') {
        setCurrentWeapon(2);
      }

      if (e.code === 'Space') {
        setCombo((prev) => [...prev, 'attack']);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const _weapons = ['Sword', 'Bow', 'Magic Staff'];

  return {
    currentWeapon: _currentWeapon,
    weaponName: _weapons[_currentWeapon],
    combo: _combo,
    clearCombo: () => setCombo([]),
  };
});
