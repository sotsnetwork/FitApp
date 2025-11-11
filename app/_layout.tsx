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
import { UserProfileProvider } from '../contexts/UserProfileContext';
import { VendorProductsProvider } from '../contexts/VendorProductsContext';

// Prevent splash screen from auto-hiding, we'll hide it manually
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  React.useEffect(() => {
    // Hide splash screen after fonts load or if there's an error
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error hiding splash screen:', error);
      }
    };
    
    if (fontsLoaded || fontError) {
      hideSplash();
    }
  }, [fontsLoaded, fontError]);

  // Show app immediately, don't wait for fonts
  // Fonts will load in the background and apply when ready

  return (
    <UserRoleProvider>
      <UserProfileProvider>
        <SavedPostsProvider>
          <SavedProductsProvider>
            <VendorProductsProvider>
              <CartProvider>
                <SearchHistoryProvider>
                  <SafeAreaProvider>
                    <View style={{ flex: 1 }}>
                      <Stack screenOptions={{ headerShown: false }} />
                    </View>
                  </SafeAreaProvider>
                </SearchHistoryProvider>
              </CartProvider>
            </VendorProductsProvider>
          </SavedProductsProvider>
        </SavedPostsProvider>
      </UserProfileProvider>
    </UserRoleProvider>
  );
}


