# create-custom-context

A React Context hook factory that enables using React hooks within context value functions. Perfect for game development, state management, and complex interactive applications.

## Features

- 🎣 Use React hooks in context value functions
- 🔄 Real-time state updates with event listeners
- 📦 Full TypeScript support
- 🪶 Zero dependencies (except React)

## Installation

```bash
npm install create-custom-context
```

## Quick Start

```tsx
import { createCustomContext } from 'create-custom-context';
import { useState, useEffect } from 'react';

// Create context with hooks
const [Provider, useContext] = createCustomContext(() => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return { count, setCount };
});

// Use in components
function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  );
}

function Counter() {
  const { count, setCount } = useContext();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

## Game Development Example

```tsx
const [GameProvider, useGame] = createCustomContext(() => {
  const [weapon, setWeapon] = useState(0);
  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Digit1') setWeapon(0);
      if (e.code === 'Digit2') setWeapon(1);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);
  
  return { weapon, weapons: ['Sword', 'Bow'] };
});
```

## API

### `createCustomContext<T>(contextValue: () => T): [Provider, useContextHook]`

**Parameters:**
- `contextValue`: Function that returns context value (can use React hooks)

**Returns:**
- `Provider`: React component to wrap your app
- `useContextHook`: Hook to access context value

**TypeScript:**
```tsx
const [Provider, useHook] = createCustomContext<{count: number}>(() => ({
  count: useState(0)[0]
}));
```

## Error Handling

The hook throws an error if used outside the Provider:

```tsx
function Component() {
  const data = useHook(); // Error: Hook must be used within Provider
}
```

## License

MIT © [ChenHaoJie9527](https://github.com/ChenHaoJie9527) 