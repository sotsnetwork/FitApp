import React from 'react';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { fonts, colors, spacing } from '../theme/tokens';
// Replaced PandaIllustration with static image asset

const BRAND = '#66FFCC';

export default function Landing() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      {/* Panda Illustration Card - Top 60% */}
      <View style={{ height: '50%', backgroundColor: BRAND, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center', justifyContent: 'center', paddingVertical: 32, paddingHorizontal: 20 }}>
        <Image
          source={require('../assets/panda.png')}
          style={{ width: 220, height: 220, resizeMode: 'contain' }}
        />
      </View>

      {/* Content Section */}
      <View style={{ flex: 1, padding: spacing.lg, paddingTop: spacing.md, justifyContent: 'flex-start' }}>
        <Text style={{ color: 'white', fontSize: 36, fontFamily: fonts.bold, marginBottom: 8 }}>
          Join the Movement
        </Text>
        <Text style={{ color: 'white', fontSize: 18, marginBottom: spacing.xl, fontFamily: fonts.regular }}>
          Stay Fit. Earn Rewards
        </Text>

        <Link href="/(roles)/join-fit" asChild>
          <TouchableOpacity
            style={{ backgroundColor: BRAND, paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: spacing.md }}
          >
            <Text style={{ color: '#0F0F0F', fontSize: 18, fontFamily: fonts.semibold }}>Create Account</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={{ alignItems: 'center', marginBottom: spacing.sm }}>
            <Text style={{ color: 'white', fontSize: 16, fontFamily: fonts.regular }}>Log In</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/" asChild>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16, fontFamily: fonts.regular }}>Continue as Guest</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}


