import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/ui/Button';
import { colors, spacing, fonts } from '../../theme/tokens';
import { router, useLocalSearchParams } from 'expo-router';

export default function PaymentSuccess() {
  const params = useLocalSearchParams();
  const role = params.role as string || 'user'; // Default to user if no role specified
  const total = params.total as string || '0';

  const getCommunityRoute = () => {
    switch (role) {
      case 'creator':
        return '/(community)/creator';
      case 'vendor':
        return '/(community)/vendor';
      default:
        return '/(user)/home';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 96, alignItems: 'center' }}>
      <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 36 }}>✓</Text>
        </View>
      </View>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Payment Successful</Text>
      <Text style={{ color: colors.subtext, textAlign: 'center', marginBottom: spacing.md, fontFamily: fonts.regular }}>
        Your payment has been processed successfully.
      </Text>
      <View style={{ backgroundColor: colors.brandTint, padding: spacing.md, borderRadius: 12, marginBottom: spacing.xl, minWidth: 200 }}>
        <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, textAlign: 'center', marginBottom: spacing.xs }}>
          Amount Deducted
        </Text>
        <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.text, textAlign: 'center' }}>
          ₦{parseFloat(total).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      </View>
      <View style={{ position: 'absolute', bottom: spacing.lg, left: spacing.lg, right: spacing.lg }}>
        <Button title="Continue Shopping" onPress={() => router.replace('/(user)/shop')} />
      </View>
    </View>
  );
}

