import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use dark theme
  const [theme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply dark theme to document root
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    root.classList.remove('light');
    root.classList.add('dark');
    
    // Set CSS custom properties for dark theme
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--bg-secondary', '#1e293b');
    root.style.setProperty('--bg-tertiary', '#334155');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#cbd5e1');
    root.style.setProperty('--text-tertiary', '#94a3b8');
    root.style.setProperty('--border-primary', '#334155');
    root.style.setProperty('--border-focus', '#0ea5e9');
  }, [theme]);

  const value = {
    theme,
    isDark: true,
    isScrolled
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
