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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Text style={{ fontSize: 24, fontFamily: fonts.bold }}>Creator Dashboard</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Stats Section */}
        <View style={{ padding: spacing.lg, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginRight: spacing.sm }}>
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.brand }}>1.2K</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Followers</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginHorizontal: spacing.xs }}>
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.brand }}>456</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Posts</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginLeft: spacing.sm }}>
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.brand }}>89</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Engagement</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
            <TouchableOpacity style={{ flex: 1, minWidth: '45%', backgroundColor: colors.brand, padding: spacing.md, borderRadius: 12, alignItems: 'center' }}>
              <Ionicons name="add-circle" size={32} color="white" />
              <Text style={{ marginTop: spacing.xs, fontFamily: fonts.semibold, color: 'white' }}>Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, minWidth: '45%', backgroundColor: colors.border, padding: spacing.md, borderRadius: 12, alignItems: 'center' }}>
              <Ionicons name="videocam" size={32} color={colors.text} />
              <Text style={{ marginTop: spacing.xs, fontFamily: fonts.semibold, color: colors.text }}>Go Live</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Posts */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Recent Posts</Text>
          {[1, 2, 3].map((post) => (
            <View key={post} style={{ marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md, flexDirection: 'row' }}>
              <View style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: colors.border, marginRight: spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Workout Challenge #1</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginBottom: spacing.xs }}>2 days ago</Text>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="eye-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>1.2K</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="heart-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>245</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Analytics Section */}
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Analytics</Text>
          <TouchableOpacity style={{ backgroundColor: '#F9F9F9', padding: spacing.md, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontFamily: fonts.semibold }}>View Full Analytics</Text>
              <Text style={{ fontSize: 12, color: colors.subtext, fontFamily: fonts.regular }}>Track your performance</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
          </TouchableOpacity>
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

