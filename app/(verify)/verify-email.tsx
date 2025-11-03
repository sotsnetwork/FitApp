import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PinKeypad from '../../components/ui/PinKeypad';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function VerifyEmail() {
  const params = useLocalSearchParams();
  const role = params.role as string || 'user';
  const [code, setCode] = React.useState('');

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
        We sent a message to Ric....@gmail.com with a code to verify your account
      </Text>

      {/* PIN Display */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.xl }}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              width: 56,
              height: 56,
              marginHorizontal: spacing.sm,
              borderRadius: 12,
              backgroundColor: i < code.length ? colors.brandTint : '#F4F4F4',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 28, color: colors.text }}>{i < code.length ? '•' : ''}</Text>
          </View>
        ))}
      </View>

      {/* PIN Keypad */}
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

