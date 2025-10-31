import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/ui/Button';
import { colors, spacing, fonts } from '../../theme/tokens';
import { router } from 'expo-router';

export default function PaymentSuccess() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 96, alignItems: 'center' }}>
      <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 36 }}>✓</Text>
        </View>
      </View>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Challenge Accepted</Text>
      <Text style={{ color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl, fontFamily: fonts.regular }}>
        Lorem ipsum dolor sit amet consectetur. Id purus quis magna varius mollis nullam. Diam sed quisque lectus.
      </Text>
      <View style={{ position: 'absolute', bottom: spacing.lg, left: spacing.lg, right: spacing.lg }}>
        <Button title="Close" onPress={() => router.push('/')} />
      </View>
    </View>
  );
}

