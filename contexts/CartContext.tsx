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
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
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

  const removeFromCart = async (itemId: string) => {
    const updated = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updated = cartItems.map((item) => (item.id === itemId ? { ...item, quantity } : item));
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

