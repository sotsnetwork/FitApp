import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import { router } from 'expo-router';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function JoinFit() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
        <Image
          source={require('../../assets/black fit logo.png')}
          style={{ width: 120, height: 120, resizeMode: 'contain', marginBottom: spacing.lg }}
        />
        <Text style={{ fontSize: 36, fontFamily: fonts.bold, marginBottom: spacing.xl }}>Join Fit</Text>
      </View>
      
      <Button title="As a User" onPress={() => router.push('/(auth)/signup?role=user')} />
      <View style={{ height: spacing.sm }} />
      <Button title="As a Creator" variant="ghost" onPress={() => router.push('/(auth)/signup?role=creator')} />
      <View style={{ height: spacing.sm }} />
      <Button title="As a Vendor" variant="ghost" onPress={() => router.push('/(auth)/signup?role=vendor')} />
    </View>
  );
}


