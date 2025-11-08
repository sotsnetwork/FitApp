import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SearchHistoryContextType {
  searchHistory: string[];
  addToHistory: (query: string) => Promise<void>;
  removeFromHistory: (query: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

const STORAGE_KEY = '@search_history';

export function SearchHistoryProvider({ children }: { children: ReactNode }) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  React.useEffect(() => {
    // Load search history from storage
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setSearchHistory(JSON.parse(data));
      }
    });
  }, []);

  const addToHistory = async (query: string) => {
    if (!query.trim()) return;
    
    const trimmedQuery = query.trim().toLowerCase();
    // Remove if already exists, then add to beginning
    const updated = [trimmedQuery, ...searchHistory.filter((item) => item !== trimmedQuery)].slice(0, 20); // Keep last 20
    setSearchHistory(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeFromHistory = async (query: string) => {
    const updated = searchHistory.filter((item) => item !== query);
    setSearchHistory(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = async () => {
    setSearchHistory([]);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
}

