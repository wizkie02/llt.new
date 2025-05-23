import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    surface: string;
    surfaceHover: string;
    muted: string;
    success: string;
    warning: string;
    error: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Vietnam-inspired color palette
const lightColors = {
  primary: '#0093DE',      // Blue
  secondary: '#BF0603',    // Red
  accent: '#28965A',       // Green
  background: '#F2F7FC',   // Light Blue/Gray
  text: '#2A3B4A',         // Deep indigo
  surface: '#FFFFFF',      // White
  surfaceHover: '#F3F3F3', // Light gray hover
  muted: '#6C757D',        // Medium gray text
  success: '#28965A',      // Green (same as accent)
  warning: '#FFC107',      // Amber
  error: '#BF0603',        // Red (same as secondary)
};

const darkColors = {
  primary: '#0093DE',      // Blue
  secondary: '#BF0603',    // Red
  accent: '#28965A',       // Green
  background: '#151E26',   // Dark Blue/Gray
  text: '#F7F8F9',         // Off white
  surface: '#1F2937',      // Dark slate
  surfaceHover: '#4B5563', // Slate hover
  muted: '#9CA3AF',        // Light gray text
  success: '#28965A',      // Green (same as accent)
  warning: '#FFC107',      // Amber
  error: '#BF0603',        // Red (same as secondary)
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [colors, setColors] = useState(lightColors);

  // Update colors when theme changes
  useEffect(() => {
    setColors(theme === 'light' ? lightColors : darkColors);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
