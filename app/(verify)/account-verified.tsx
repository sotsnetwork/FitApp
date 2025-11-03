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
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 96, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 64, left: spacing.lg }}>
        <Text style={{ fontSize: 24 }}>←</Text>
      </TouchableOpacity>
      <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 36, color: 'white' }}>✓</Text>
        </View>
      </View>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Account Verified</Text>
      <Text style={{ color: colors.subtext, textAlign: 'center', marginBottom: spacing.lg, fontFamily: fonts.regular }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>
      <Button 
        title="Continue" 
        onPress={() => {
          if (skipWithdrawal) {
            router.push(`/(onboarding)/user-details?role=${role}`);
          } else {
            router.push({ pathname: '/(forms)/bank-setup', params: { role } });
          }
        }} 
      />
      <View style={{ marginTop: spacing.md, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setSkipWithdrawal(!skipWithdrawal)} style={{ marginRight: spacing.sm }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.border, backgroundColor: skipWithdrawal ? colors.brand : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            {skipWithdrawal && <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>}
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext }}>Skip Setup Withdrawal Account</Text>
      </View>
      <TouchableOpacity style={{ marginTop: spacing.xs }}>
        <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>Later in settings</Text>
      </TouchableOpacity>
    </View>
  );
}

