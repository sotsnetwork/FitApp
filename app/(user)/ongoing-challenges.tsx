import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function OngoingChallenges() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Ongoing Challenges</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xl }}>
          {[1, 2, 3, 4, 5].map((challenge) => (
            <TouchableOpacity
              key={challenge}
              onPress={() => router.push('/(user)/challenge-details')}
              style={{ marginBottom: spacing.xl }}
            >
              <View style={{ backgroundColor: '#F9F9F9', borderRadius: 12, overflow: 'hidden' }}>
                <View style={{ width: '100%', height: 120, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="barbell" size={40} color={colors.subtext} />
                </View>
                <View style={{ padding: spacing.md }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.xs, color: colors.text }}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.sm }}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <TouchableOpacity style={{ backgroundColor: colors.brand, paddingVertical: spacing.xs, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Join now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

