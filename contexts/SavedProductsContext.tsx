import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedProduct {
  id: string;
  name: string;
  price: string;
  discount?: string;
  imageColor?: string;
}

interface SavedProductsContextType {
  savedProducts: SavedProduct[];
  saveProduct: (product: SavedProduct) => void;
  unsaveProduct: (productId: string) => void;
  isSaved: (productId: string) => boolean;
}

const SavedProductsContext = createContext<SavedProductsContextType | undefined>(undefined);

const STORAGE_KEY = '@saved_products';

export function SavedProductsProvider({ children }: { children: ReactNode }) {
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);

  React.useEffect(() => {
    // Load saved products from storage
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setSavedProducts(JSON.parse(data));
      }
    });
  }, []);

  const saveProduct = async (product: SavedProduct) => {
    // Check if already saved
    if (savedProducts.some((p) => p.id === product.id)) {
      return;
    }
    const updated = [...savedProducts, product];
    setSavedProducts(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const unsaveProduct = async (productId: string) => {
    const updated = savedProducts.filter((p) => p.id !== productId);
    setSavedProducts(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isSaved = (productId: string) => {
    return savedProducts.some((p) => p.id === productId);
  };

  return (
    <SavedProductsContext.Provider value={{ savedProducts, saveProduct, unsaveProduct, isSaved }}>
      {children}
    </SavedProductsContext.Provider>
  );
}

export function useSavedProducts() {
  const context = useContext(SavedProductsContext);
  if (context === undefined) {
    throw new Error('useSavedProducts must be used within a SavedProductsProvider');
  }
  return context;
}

