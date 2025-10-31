import React from 'react';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { fonts, colors, spacing } from '../theme/tokens';

const BRAND = '#66F2C9';

export default function Landing() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F0F', padding: spacing.lg, justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 36, fontFamily: fonts.bold, marginBottom: 8 }}>
        Join the Movement
      </Text>
      <Text style={{ color: '#B8B8B8', fontSize: 18, marginBottom: spacing.xl, fontFamily: fonts.regular }}>Stay Fit. Earn Rewards</Text>

      <Link href="/(roles)/join-fit" asChild>
        <TouchableOpacity
          style={{ backgroundColor: BRAND, paddingVertical: 18, borderRadius: 16, alignItems: 'center' }}
        >
          <Text style={{ color: '#0F0F0F', fontSize: 18, fontWeight: '600' }}>Create Account</Text>
        </TouchableOpacity>
      </Link>

      <View style={{ height: 16 }} />
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={{ paddingVertical: 18, borderRadius: 16, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Log In</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}


