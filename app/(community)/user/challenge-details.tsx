import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../../theme/tokens';

export default function ChallengeDetails() {
  const [challengeAcceptedVisible, setChallengeAcceptedVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Hero Image */}
      <View style={{ width: '100%', height: 220, backgroundColor: '#FF6A00' }} />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: -200 + spacing.md, left: spacing.md }}>
            <Ionicons name="arrow-back" size={24} color={'white'} />
          </TouchableOpacity>

          {/* Title and progress */}
          <Text style={{ fontSize: 22, fontFamily: fonts.bold, marginBottom: spacing.xs }}>July Weekly Challenge</Text>
          <Text style={{ fontFamily: fonts.semibold }}>
            <Text style={{ color: colors.text }}>0.00</Text>
            <Text style={{ color: colors.subtext }}> / 15.00km</Text>
          </Text>
          <Text style={{ marginTop: spacing.xs, color: colors.subtext }}>4 days Left</Text>

          {/* Leaderboard link */}
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, marginTop: spacing.lg }}>
            <Text style={{ fontFamily: fonts.semibold }}>View Leaderboard</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.text} />
          </TouchableOpacity>

          {/* Details */}
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginTop: spacing.lg, marginBottom: spacing.sm }}>Challenge Details</Text>
          <Text style={{ color: colors.text, lineHeight: 20, marginBottom: spacing.lg }}>
            Push yourself with a weekly challenge. Run 15 Kilometers this week and you’ll score a unique finisher achievement
          </Text>

          {/* Info list */}
          {[{k:'Total Distance', v:'15.00 kilometers'},{k:'Duration', v:'30 Jun-6 Jul'},{k:'Participants', v:'298,097 Runners'}].map((row) => (
            <View key={row.k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text style={{ color: colors.subtext }}>{row.k}</Text>
              <Text style={{ color: colors.text }}>{row.v}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Join button docked */}
      <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity
          onPress={() => setChallengeAcceptedVisible(true)}
          style={{ backgroundColor: colors.brand, borderRadius: 12, paddingVertical: spacing.md, alignItems: 'center' }}
        >
          <Text style={{ fontFamily: fonts.semibold, color: '#0F0F0F' }}>Join Challenge</Text>
        </TouchableOpacity>
      </View>

      {/* Challenge Accepted Modal */}
      <Modal
        visible={challengeAcceptedVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setChallengeAcceptedVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setChallengeAcceptedVisible(false)}
          />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.xl, alignItems: 'center' }}>
            {/* Handle/Grabber */}
            <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
              <View
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: colors.border,
                }}
              />
            </View>

            {/* Success Icon */}
            <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: colors.brandTint,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: colors.brand,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 48, color: colors.text, fontFamily: fonts.bold }}>✓</Text>
                </View>
              </View>
            </View>

            {/* Title */}
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.text, marginBottom: spacing.md, textAlign: 'center' }}>
              Challenge Accepted
            </Text>

            {/* Description */}
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, textAlign: 'center', lineHeight: 20, marginBottom: spacing.xl }}>
              Lorem ipsum dolor sit amet consectetur. Id purus quis magna varius mollis nullam. Diam sed quisque lectus.
            </Text>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setChallengeAcceptedVisible(false)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
              }}
            >
              <Ionicons name="close" size={20} color={colors.text} />
              <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
