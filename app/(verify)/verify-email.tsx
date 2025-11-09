import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PinKeypad from '../../components/ui/PinKeypad';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';

export default function VerifyEmail() {
  const params = useLocalSearchParams();
  const role = params.role as string || 'user';
  const { profile } = useUserProfile();
  const [code, setCode] = React.useState('');

  // Format email to show prefix with dots (e.g., "Ric....@gmail.com")
  const formatEmailForDisplay = (email: string | undefined): string => {
    if (!email) return 'your email';
    
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;
    
    // Show first 3 characters of the local part, then dots
    const prefix = localPart.substring(0, 3);
    return `${prefix}....@${domain}`;
  };

  const displayEmail = formatEmailForDisplay(profile?.email);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (newCode.length === 4) {
      // Auto-verify when 4 digits entered
      setTimeout(() => {
        router.push({ pathname: '/(verify)/email-verify', params: { role } });
      }, 500);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 36, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Verify Email</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.xl, fontFamily: fonts.regular }}>
        We sent a message to {displayEmail} with a code to verify your account
      </Text>
      {/* PIN Keypad includes its own display styled to match design */}
      <PinKeypad length={4} onChange={handleCodeChange} />

      {/* Resend Code and Contact Links */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xl, paddingHorizontal: spacing.md }}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ color: colors.brand, fontFamily: fonts.regular, fontSize: 14 }}>Resend code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ color: colors.brand, fontFamily: fonts.regular, fontSize: 14 }}>Contact us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

