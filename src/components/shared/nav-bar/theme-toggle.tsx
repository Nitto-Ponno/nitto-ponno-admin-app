'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="hover:bg-muted rounded-full p-2 transition-all"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 transition-all" />
      ) : (
        <Sun className="h-5 w-5 transition-all" />
      )}
    </button>
  );
};

export default ThemeToggle;
