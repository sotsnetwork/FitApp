import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function EmailVerified() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 96, alignItems: 'center' }}>
      <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 36, color: 'white' }}>✓</Text>
        </View>
      </View>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Email Verified</Text>
      <Text style={{ color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl, fontFamily: fonts.regular }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>
      <Button 
        title="Proceed to Account Verification" 
        onPress={() => router.push({ pathname: '/(forms)/account-verification', params: { role } })} 
      />
    </View>
  );
}


