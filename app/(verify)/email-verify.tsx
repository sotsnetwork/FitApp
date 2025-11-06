import React from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function EmailVerified() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, alignItems: 'center', justifyContent: 'center' }}>
      {/* Success Badge */}
      <View style={{ width: 220, height: 220, borderRadius: 110, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl }}>
        <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 56, color: colors.text }}>✓</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={{ fontSize: 40, fontFamily: fonts.bold, marginBottom: spacing.md, textAlign: 'center' }}>Email Verified</Text>

      {/* Description */}
      <Text style={{ color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl, fontFamily: fonts.regular, lineHeight: 22 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus{"\n"}
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>

      {/* Proceed Button */}
      <View style={{ alignSelf: 'stretch' }}>
        <Button 
          title="Proceed" 
          onPress={() => {
            // Users: Skip Account Verification, Contact Details, Link Social, and Account Verified → Go directly to User Details
            // Creators & Vendors: Go through Account Verification → Contact Details → Link Social → Account Verified
            if (role === 'creator' || role === 'vendor') {
              router.push({ pathname: '/(forms)/account-verification', params: { role } });
            } else {
              // Users skip all business-related screens and Account Verified, go directly to User Details
              router.push({ pathname: '/(onboarding)/user-details', params: { role } });
            }
          }} 
        />
      </View>
    </View>
  );
}


