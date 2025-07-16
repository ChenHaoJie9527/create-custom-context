import { fireEvent, render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createCustomContext } from '../create-custom-context';

// Example of a game weapon system
const [GameProvider, useGameHotkeys] = createCustomContext(() => {
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

function GameUI() {
  const { combo, clearCombo, weaponName } = useGameHotkeys();
  return (
    <div>
      <div data-testid="weapon">Current Weapon: {weaponName}</div>
      <div data-testid="combo">Combo: {combo.length}</div>
      <button onClick={clearCombo} type="button">
        Clear Combo
      </button>
    </div>
  );
}

describe('Game Hotkeys System', () => {
  // Call the function before each test run
  beforeEach(() => {
    document.removeEventListener('keydown', () => ({}));
  });
  // Call the function after each test run
  afterEach(() => {
    document.removeEventListener('keydown', () => ({}));
  });
  it('should switch weapons with number keys', () => {
    render(
      <GameProvider>
        <GameUI />
      </GameProvider>
    );

    expect(screen.getByTestId('weapon')).toHaveTextContent('Sword');
    fireEvent.keyDown(document, {
      code: 'Digit2',
    });
    expect(screen.getByTestId('weapon')).toHaveTextContent('Bow');
    fireEvent.keyDown(document, {
      code: 'Digit3',
    });
    expect(screen.getByTestId('weapon')).toHaveTextContent('Magic Staff');
  });
});
