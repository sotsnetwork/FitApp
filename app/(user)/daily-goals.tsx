import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function DailyGoals() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Daily Goals</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xl }}>
          {[1, 2].map((item) => (
            <View key={item} style={{ marginBottom: spacing.xl }}>
              {/* Header */}
              <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginBottom: spacing.sm }}>
                Daily Goal
              </Text>

              {/* Workout Title */}
              <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>
                Simple Dumbbell Handless for Thighs, Buttock & Ankle
              </Text>

              {/* Product Recommendation */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>
                  Nike Free Metcon 6
                </Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#FFA500', marginLeft: spacing.xs }}>
                  – 60% Discount
                </Text>
              </View>

              {/* Shop For Product Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: colors.brand,
                  paddingVertical: spacing.sm,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginBottom: spacing.sm,
                }}
              >
                <Text style={{ fontFamily: fonts.semibold, color: '#0F0F0F', fontSize: 14 }}>Shop For Product</Text>
              </TouchableOpacity>

              {/* Product Category */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                <Ionicons name="bag-outline" size={16} color={colors.subtext} />
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginLeft: spacing.xs }}>
                  Sleeveless Sweats...
                </Text>
              </View>

              {/* Video Preview - Clickable */}
              <TouchableOpacity
                onPress={() => router.push('/(user)/post-detail')}
                style={{
                  width: '100%',
                  height: 200,
                  backgroundColor: colors.border,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: spacing.md,
                  position: 'relative',
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="play" size={32} color="white" />
                </View>
              </TouchableOpacity>

              {/* Engagement Metrics */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                <TouchableOpacity
                  onPress={() => router.push('/(user)/post-detail')}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                >
                  <Ionicons name="heart" size={20} color={colors.brand} />
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.text }}>12</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push('/(user)/post-detail')}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                >
                  <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.text }}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(user)/post-detail')}>
                  <Ionicons name="share-outline" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

