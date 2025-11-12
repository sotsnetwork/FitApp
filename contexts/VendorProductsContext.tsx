import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface VendorProduct {
  id: string;
  name: string;
  category: 'GEARS' | 'EQUIPMENTS' | 'SUPPLEMENTS';
  priceNaira: number; // in naira, whole units
  promoPriceNaira?: number; // optional promo price
  availableSizes?: string[]; // e.g., ['36', '38', '40', '42']
  availableColors?: string[]; // e.g., ['BROWN', 'BLACK', 'GREY']
}

interface VendorProductsContextValue {
  products: VendorProduct[];
  addProduct: (product: VendorProduct) => Promise<void>;
  clearAll: () => Promise<void>;
}

const VendorProductsContext = createContext<VendorProductsContextValue | undefined>(undefined);

const STORAGE_KEY = 'vendor_products_v1';

export const VendorProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<VendorProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setProducts(JSON.parse(raw));
        }
      } catch {}
    })();
  }, []);

  const persist = async (next: VendorProduct[]) => {
    setProducts(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const addProduct = async (product: VendorProduct) => {
    const next = [product, ...products];
    await persist(next);
  };

  const clearAll = async () => {
    await persist([]);
  };

  return (
    <VendorProductsContext.Provider value={{ products, addProduct, clearAll }}>
      {children}
    </VendorProductsContext.Provider>
  );
};

export const useVendorProducts = () => {
  const ctx = useContext(VendorProductsContext);
  if (!ctx) throw new Error('useVendorProducts must be used within VendorProductsProvider');
  return ctx;
};
