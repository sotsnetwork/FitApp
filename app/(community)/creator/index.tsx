import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../../theme/tokens';

export default function CreatorCommunity() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <TouchableOpacity>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="person" size={20} color={colors.brand} />
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>DASHBOARD</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Ongoing Section */}
        <View style={{ padding: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Ongoing</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>View more</Text>
              <Ionicons name="chevron-down" size={16} color={colors.brand} />
            </TouchableOpacity>
          </View>

          {/* Ongoing Post Card */}
          <View style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.semibold }}>Nike Camouflage Joggers</Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext }}>4:13 Mins</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext }}>13/15/2023</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View />
              <View style={{ backgroundColor: '#FFF5E6', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8 }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#E6A800' }}>In review</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Latest Uploads Section */}
        <View style={{ padding: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Latest Uploads</Text>
            <TouchableOpacity style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}>
              <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: 'white' }}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* Video Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: spacing.sm }}>
            {[1, 2, 3, 4].map((video) => (
              <TouchableOpacity key={video} style={{ width: '48%', marginBottom: spacing.sm }}>
                <View style={{ width: '100%', height: 120, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.xs, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="play-circle" size={40} color={colors.subtext} />
                </View>
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Video {video}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="stats-chart" size={24} color={colors.brand} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.brand, marginTop: spacing.xs }}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="person-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

