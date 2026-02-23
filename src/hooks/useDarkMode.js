import { useEffect, useState } from 'react';

/**
 * Custom hook for dark mode toggle
 * Manages theme state and persistence
 * @param {string} defaultTheme - 'light' or 'dark' (default: system preference)
 */
export const useDarkMode = (defaultTheme = null) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    // Check default theme parameter
    if (defaultTheme) return defaultTheme;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('light-theme', 'dark-theme');
    
    // Add current theme class
    root.classList.add(`${theme}-theme`);
    
    // Update data attribute for CSS
    root.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark'
  };
};

/**
 * Hook for theme-aware color values
 * Returns appropriate color based on current theme
 */
export const useThemeColor = (lightColor, darkColor) => {
  const { theme } = useDarkMode();
  return theme === 'dark' ? darkColor : lightColor;
};

/**
 * Hook for animated theme transitions
 * Adds smooth transition when theme changes
 */
export const useThemeTransition = (duration = 300) => {
  const { theme, toggleTheme } = useDarkMode();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleWithTransition = () => {
    setIsTransitioning(true);
    
    // Add transition class
    document.documentElement.classList.add('theme-transitioning');
    
    // Toggle theme
    toggleTheme();
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, duration);
  };

  return {
    theme,
    toggleTheme: toggleWithTransition,
    isTransitioning
  };
};