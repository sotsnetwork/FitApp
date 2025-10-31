import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View, Text } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import PandaIllustration from '../components/ui/PandaIllustration';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#66FFCC' }}>
        <PandaIllustration />
        <Text style={{ marginTop: 20, fontSize: 24, fontWeight: 'bold', color: '#0F0F0F' }}>FitApp</Text>
        <ActivityIndicator size="large" color="#0F0F0F" style={{ marginTop: 20 }} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}


