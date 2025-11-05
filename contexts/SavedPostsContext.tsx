import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedPost {
  id: string;
  title: string;
  activityTag: string;
  isSponsored: boolean;
}

interface SavedPostsContextType {
  savedPosts: SavedPost[];
  savePost: (post: SavedPost) => void;
  unsavePost: (postId: string) => void;
  isSaved: (postId: string) => boolean;
}

const SavedPostsContext = createContext<SavedPostsContextType | undefined>(undefined);

const STORAGE_KEY = '@saved_posts';

export function SavedPostsProvider({ children }: { children: ReactNode }) {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);

  React.useEffect(() => {
    // Load saved posts from storage
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setSavedPosts(JSON.parse(data));
      }
    });
  }, []);

  const savePost = async (post: SavedPost) => {
    const updated = [...savedPosts, post];
    setSavedPosts(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const unsavePost = async (postId: string) => {
    const updated = savedPosts.filter((p) => p.id !== postId);
    setSavedPosts(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isSaved = (postId: string) => {
    return savedPosts.some((p) => p.id === postId);
  };

  return (
    <SavedPostsContext.Provider value={{ savedPosts, savePost, unsavePost, isSaved }}>
      {children}
    </SavedPostsContext.Provider>
  );
}

export function useSavedPosts() {
  const context = useContext(SavedPostsContext);
  if (context === undefined) {
    throw new Error('useSavedPosts must be used within a SavedPostsProvider');
  }
  return context;
}

