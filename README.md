# create-custom-context

A powerful React Context hook factory that enables the use of React hooks within context value functions. Perfect for complex state management scenarios like game development, theme systems, and real-time applications.

## ✨ Features

- 🎣 **Hook Support** - Use React hooks directly in context value functions
- 🎮 **Game Development Ready** - Perfect for hotkey systems, weapon switching, UI state
- 🔄 **Real-time Updates** - Supports event listeners and dynamic state
- 📦 **TypeScript Ready** - Full TypeScript support with type inference
- 🪶 **Lightweight** - Zero dependencies (except React)
- ⚡ **Performance Optimized** - Efficient re-rendering with React's built-in optimization

## 📦 Installation

```bash
npm install create-custom-context
# or
yarn add create-custom-context
# or
pnpm add create-custom-context
```

## 🚀 Quick Start

```tsx
import { createCustomContext } from 'create-custom-context';
import { useState, useEffect } from 'react';

// Create a game hotkey system
const [GameProvider, useGameHotkeys] = createCustomContext(() => {
  const [currentWeapon, setCurrentWeapon] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Digit1') setCurrentWeapon(0); // Sword
      if (e.code === 'Digit2') setCurrentWeapon(1); // Bow
      if (e.code === 'Digit3') setCurrentWeapon(2); // Magic Staff
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const weapons = ['Sword', 'Bow', 'Magic Staff'];
  return { currentWeapon, weaponName: weapons[currentWeapon] };
});

// Use in your components
function GameUI() {
  const { weaponName } = useGameHotkeys();
  return <div>Current Weapon: {weaponName}</div>;
}

function App() {
  return (
    <GameProvider>
      <GameUI />
    </GameProvider>
  );
}
```

## 📖 API Reference

### `createCustomContext<T>(useContextValue, defaultValue?)`

Creates a custom context with a hook-enabled value function.

#### Parameters

- `useContextValue: () => T` - A function that can use React hooks and returns the context value
- `defaultValue?: T` - Optional default value for the context

#### Returns

An array containing:
- `[0] Provider: React.ComponentType<{ children: ReactNode }>` - The context provider component
- `[1] useContext: () => T` - Hook to consume the context value

#### TypeScript

```tsx
type CreateContextHookReturnType<T> = [
  Provider: FunctionComponent<{ children: ReactNode }>,
  useContextHook: () => T,
];
```

## 🎯 Use Cases

### 🎮 Game Development

```tsx
// Weapon switching system
const [WeaponProvider, useWeapon] = createCustomContext(() => {
  const [weaponId, setWeaponId] = useState(0);
  const [ammo, setAmmo] = useState(100);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const num = parseInt(e.code.replace('Digit', ''));
      if (num >= 1 && num <= 3) {
        setWeaponId(num - 1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return { weaponId, ammo, setAmmo };
});
```

### 🎨 Theme System

```tsx
// Theme with keyboard shortcut
const [ThemeProvider, useTheme] = createCustomContext(() => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyT') {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return { theme, setTheme };
});
```

### 🔔 Notification System

```tsx
// Auto-dismissing notifications
const [NotificationProvider, useNotifications] = createCustomContext(() => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = useCallback((message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  }, []);

  return { notifications, addNotification };
});
```

## 🧪 Testing

The library includes comprehensive tests using Vitest and React Testing Library:

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📁 Project Structure

```
create-custom-context/
├── src/
│   ├── create-custom-context.tsx  # Main implementation
│   ├── index.ts                   # Entry point
│   └── test/                      # Test files
│       ├── create-custom-context.spec.tsx
│       ├── game-hotkeys.test.tsx
│       └── demo-app.tsx
├── dist/                          # Build output
└── ...config files
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Run tests
pnpm test

# Format code
pnpm format

# Check unused code
pnpm lint

# Check code quality
pnpm check

# Build library
pnpm build
```

## 🔧 Development Tools

- **TypeScript** - Type checking
- **Biome** - Code formatting and linting (with ultracite preset)
- **tsup** - Build tool
- **Vitest** - Testing framework
- **Knip** - Dead code elimination

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Add tests for your changes
4. Run `pnpm check` to ensure code quality
5. Submit a pull request

## 📄 License

MIT © [ChenHaoJie9527](https://github.com/ChenHaoJie9527)

## 🔗 Links

- [GitHub Repository](https://github.com/ChenHaoJie9527/create-custom-context)
- [npm Package](https://www.npmjs.com/package/create-custom-context) 