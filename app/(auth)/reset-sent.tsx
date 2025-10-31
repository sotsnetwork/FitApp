import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function ResetSent() {
  return (
    <View style={{ flex: 1, padding: spacing.lg, paddingTop: 64, backgroundColor: 'white', alignItems: 'center' }}>
      <View style={{ alignSelf: 'flex-start', marginBottom: spacing.lg }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 36, color: colors.text }}>✓</Text>
        </View>
      </View>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: 8, textAlign: 'center' }}>Reset password link sent</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.lg, textAlign: 'center', fontFamily: fonts.regular }}>
        We sent a message to **Ric....@gmail.com** with a link to reset your password
      </Text>
      <View style={{ flex: 1 }} />
      <View style={{ width: '100%', paddingBottom: spacing.lg }}>
        <Button title="Open Gmail App" onPress={() => router.push('/(auth)/new-password')} />
      </View>
    </View>
  );
}


