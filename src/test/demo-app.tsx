import { useEffect, useState } from 'react';
import { createCustomContext } from '../create-custom-context';

// 主题系统
const [ThemeProvider, useTheme] = createCustomContext(() => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyT') {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return { theme, setTheme };
});

// 通知系统
const [NotificationProvider, useNotifications] = createCustomContext(() => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  return { notifications, addNotification };
});

// 组件
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { addNotification } = useNotifications();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    addNotification(`Switched to ${newTheme} mode`);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      }}
      type="button"
    >
      Current: {theme} (Ctrl + T to toggle)
    </button>
  );
}

function NotificationList() {
  const { notifications } = useNotifications();

  return (
    <div>
      {notifications.map((notification, index) => (
        <div
          key={`${index}-${notification}`}
          style={{
            background: '#f0f0f0',
            padding: '8px',
            margin: '4px',
            borderRadius: '4px',
          }}
        >
          {notification}
        </div>
      ))}
    </div>
  );
}

export function DemoApp() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <div style={{ padding: '20px' }}>
          <h1>createCustomContext Demo</h1>
          <ThemeToggle />
          <NotificationList />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}
