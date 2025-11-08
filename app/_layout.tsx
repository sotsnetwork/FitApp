import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { SavedPostsProvider } from '../contexts/SavedPostsContext';
import { UserRoleProvider } from '../contexts/UserRoleContext';
import { SavedProductsProvider } from '../contexts/SavedProductsContext';
import { CartProvider } from '../contexts/CartContext';
import { SearchHistoryProvider } from '../contexts/SearchHistoryContext';

// Prevent splash screen from auto-hiding, we'll hide it manually
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  React.useEffect(() => {
    // Hide splash screen immediately when component mounts
    // Don't wait for fonts - they'll load in the background
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  // Show app immediately, don't wait for fonts
  // Fonts will load in the background and apply when ready

  return (
    <UserRoleProvider>
      <SavedPostsProvider>
        <SavedProductsProvider>
          <CartProvider>
            <SearchHistoryProvider>
              <SafeAreaProvider>
                <View style={{ flex: 1 }}>
                  <Stack screenOptions={{ headerShown: false }} />
                </View>
              </SafeAreaProvider>
            </SearchHistoryProvider>
          </CartProvider>
        </SavedProductsProvider>
      </SavedPostsProvider>
    </UserRoleProvider>
  );
}


