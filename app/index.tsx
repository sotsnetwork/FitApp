import React from 'react';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { fonts, colors, spacing } from '../theme/tokens';
import PandaIllustration from '../components/ui/PandaIllustration';

const BRAND = '#66FFCC';

export default function Landing() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      {/* Panda Illustration Card - Top 60% */}
      <View style={{ height: '60%', backgroundColor: BRAND, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 20 }}>
        <PandaIllustration />
      </View>

      {/* Content Section */}
      <View style={{ flex: 1, padding: spacing.lg, justifyContent: 'center' }}>
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


