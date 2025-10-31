import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/ui/Button';
import { router } from 'expo-router';

export default function JoinFit() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 96, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 36, fontWeight: '700', marginBottom: 32 }}>Join Fit</Text>
      <Button title="As a User" onPress={() => router.push('/(auth)/signup')} />
      <View style={{ height: 12 }} />
      <Button title="As a Creator" variant="ghost" onPress={() => router.push('/(auth)/signup')} />
      <View style={{ height: 12 }} />
      <Button title="As a Vendor" variant="ghost" onPress={() => router.push('/(auth)/signup')} />
    </View>
  );
}


