'use client';

// =============================================================================
// Burj Al Wasl — Landing Theme Provider
// =============================================================================
// Self-contained dark/light theme scoped to the landing page only.
// Sets `data-theme` on a `.landing` wrapper so CSS variables cascade without
// affecting the rest of the multi-page site.
// =============================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const STORAGE_KEY = 'bw-landing-theme';

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggle: () => {},
});

export function useLandingTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export function LandingThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div
        className="landing relative min-h-screen w-full overflow-x-hidden font-sans transition-colors duration-500"
        data-theme={theme}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
