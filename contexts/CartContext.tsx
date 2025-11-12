import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  discount?: string;
  size?: string;
  color?: string;
  quantity: number;
  imageColor?: string;
  availableSizes?: string[]; // Available sizes from vendor product
  availableColors?: string[]; // Available colors from vendor product
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, size?: string, color?: string) => void;
  updateQuantity: (itemId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = '@cart_items';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  React.useEffect(() => {
    // Load cart items from storage
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setCartItems(JSON.parse(data));
      }
    });
  }, []);

  const addToCart = async (item: CartItem) => {
    // Check if item already exists in cart with same size and color
    const existingIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
    );

    if (existingIndex >= 0) {
      // Update quantity if item exists
      const updated = [...cartItems];
      updated[existingIndex].quantity += item.quantity;
      setCartItems(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } else {
      // Add new item
      const updated = [...cartItems, item];
      setCartItems(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const removeFromCart = async (itemId: string, size?: string, color?: string) => {
    const updated = cartItems.filter((item) => {
      // Remove item by matching id, size, and color to handle same product with different variants
      if (size && color) {
        return !(item.id === itemId && item.size === size && item.color === color);
      }
      return item.id !== itemId;
    });
    setCartItems(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateQuantity = async (itemId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemId, size, color);
      return;
    }
    const updated = cartItems.map((item) => {
      // Update quantity by matching id, size, and color
      if (size && color) {
        if (item.id === itemId && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
      } else if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearCart = async () => {
    setCartItems([]);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₦,]/g, '')) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

