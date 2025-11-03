import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function AccountVerified() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const [skipWithdrawal, setSkipWithdrawal] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 64, left: spacing.lg }}>
        <Text style={{ fontSize: 24 }}>←</Text>
      </TouchableOpacity>
      {/* Success badge */}
      <View style={{ width: 220, height: 220, borderRadius: 110, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl }}>
        <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 56, color: colors.text }}>✓</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={{ fontSize: 36, fontFamily: fonts.bold, marginBottom: spacing.md, textAlign: 'center' }}>Account Verified</Text>

      {/* Description */}
      <Text style={{ color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl, fontFamily: fonts.regular, lineHeight: 22 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>

      {/* Continue button full width */}
      <View style={{ alignSelf: 'stretch' }}>
        <Button
          title="Continue"
          onPress={() => router.push({ pathname: '/(forms)/bank-setup', params: { role } })}
        />
      </View>

      {/* Up Next note */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.md }}>
        <Text style={{ fontSize: 16, marginRight: spacing.xs }}>ⓘ</Text>
        <Text style={{ color: colors.subtext, fontFamily: fonts.regular }}>Up Next: Setup Withdrawal Account</Text>
      </View>

      {/* Later in settings link */}
      <TouchableOpacity style={{ marginTop: spacing.lg }} onPress={() => router.push(`/(onboarding)/user-details?role=${role}`)}>
        <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#9A9A9A' }}>Later in settings</Text>
      </TouchableOpacity>
    </View>
  );
}

