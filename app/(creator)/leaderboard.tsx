import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

const leaderboardData = [
  { rank: 1, name: 'Debbie Annie', points: 1500, avatar: '👤' },
  { rank: 2, name: 'Dawson Smith', points: 1400, avatar: '👤' },
  { rank: 3, name: 'Funny C', points: 1300, avatar: '👤' },
  { rank: 4, name: 'Esther Howard', points: 1245, avatar: '👤', isCurrentUser: true },
  { rank: 5, name: 'Samuel Paul', points: 102, avatar: '👤' },
  { rank: 6, name: 'Olivia Queen', points: 101, avatar: '👤' },
  { rank: 7, name: 'Evelyn John', points: 987, avatar: '👤' },
  { rank: 8, name: 'Chioma Chris', points: 800, avatar: '👤' },
];

export default function Leaderboard() {
  const currentUser = leaderboardData.find(user => user.isCurrentUser);
  const topThree = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>Leaderboard</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xl }}>
          {/* Top 3 Ranks */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: spacing.xl, paddingHorizontal: spacing.md }}>
            {/* 2nd Place */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 32 }}>{topThree[1]?.avatar}</Text>
              </View>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>{topThree[1]?.name}</Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>2nd</Text>
            </View>

            {/* 1st Place */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 40 }}>{topThree[0]?.avatar}</Text>
              </View>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>{topThree[0]?.name}</Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>1st</Text>
            </View>

            {/* 3rd Place */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 32 }}>{topThree[2]?.avatar}</Text>
              </View>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>{topThree[2]?.name}</Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>3rd</Text>
            </View>
          </View>

          {/* Your Rank Section */}
          {currentUser && (
            <View style={{ backgroundColor: '#F5F5F5', borderRadius: 12, padding: spacing.md, marginBottom: spacing.lg }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.md }}>Your Rank</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                  <Text style={{ fontSize: 24 }}>{currentUser.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 16 }}>{currentUser.name}</Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.subtext }}>{currentUser.points} points</Text>
                </View>
              </View>
            </View>
          )}

          {/* Ranked List */}
          <View style={{ marginTop: spacing.md }}>
            {restOfList.map((user, index) => (
              <View
                key={user.rank}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  borderBottomWidth: index < restOfList.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: 16, width: 40, color: colors.subtext }}>
                  {String(user.rank).padStart(2, '0')}
                </Text>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                  <Text style={{ fontSize: 18 }}>{user.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>{user.name}</Text>
                </View>
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.subtext }}>{user.points} points</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(creator)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(creator)/search')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/creator')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(creator)/notifications')} style={{ alignItems: 'center' }}>
          <Ionicons name="notifications-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(creator)/shop')} style={{ alignItems: 'center' }}>
          <Ionicons name="bag-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


