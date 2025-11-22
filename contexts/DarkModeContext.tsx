import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserProfile } from './UserProfileContext';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => Promise<void>;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

const STORAGE_KEY = '@dark_mode';

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const { profile, updateProfile } = useUserProfile();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode from profile or storage
  useEffect(() => {
    const loadDarkMode = async () => {
      if (profile?.darkMode !== undefined) {
        setIsDarkMode(profile.darkMode);
      } else {
        try {
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          if (stored !== null) {
            setIsDarkMode(JSON.parse(stored));
          }
        } catch (error) {
          console.error('Error loading dark mode:', error);
        }
      }
    };
    loadDarkMode();
  }, [profile?.darkMode]);

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    try {
      await updateProfile({ darkMode: newValue });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error toggling dark mode:', error);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}

