import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../../theme/tokens';

const tabs = ['Popular', 'My Post', 'Following', 'Challenges'];

export default function UserCommunity() {
  const [selectedTab, setSelectedTab] = React.useState('Popular');
  const [challengeSubTab, setChallengeSubTab] = React.useState<'Leaderboard' | 'Challenges'>('Challenges');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>COMMUNITY</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(user)/notifications')}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.lg }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                borderBottomWidth: selectedTab === tab ? 2 : 0,
                borderBottomColor: colors.brand,
                marginRight: spacing.md,
              }}
            >
              <Text style={{ fontFamily: fonts.semibold, color: selectedTab === tab ? colors.brand : colors.subtext }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {selectedTab === 'Challenges' ? (
            <>
              {/* Sub tabs */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.md }}>
                {(['Leaderboard','Challenges'] as const).map((tab) => (
                  <TouchableOpacity key={tab} onPress={() => setChallengeSubTab(tab)}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontFamily: fonts.semibold, color: challengeSubTab === tab ? colors.text : colors.subtext }}>{tab}</Text>
                      {challengeSubTab === tab && (
                        <View style={{ height: 2, backgroundColor: colors.text, width: 100, marginTop: 8 }} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Hero card */}
              <Text style={{ fontFamily: fonts.regular, marginBottom: spacing.sm }}>Join 20,234 Runners</Text>
              <View style={{ width: '100%', height: 180, backgroundColor: '#FF6A00', borderRadius: 12, marginBottom: spacing.md }} />
              <TouchableOpacity style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingVertical: spacing.md, alignItems: 'center', marginBottom: spacing.xl }}>
                <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>Join Challenge</Text>
              </TouchableOpacity>

              {/* Ongoing list */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 16 }}>Ongoing Challenges</Text>
                <TouchableOpacity>
                  <Text style={{ fontFamily: fonts.regular, color: colors.subtext }}>See all</Text>
                </TouchableOpacity>
              </View>
              {[1,2,3].map((i) => (
                <TouchableOpacity key={i} onPress={() => router.push('/(community)/user/challenge-details')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                    <Text>🏅</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.semibold }}>July Weekly Challenge</Text>
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>0.00 / 15.00km</Text>
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>4 days Left</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
        {/* Feed Posts */}
          {/* Post 1 */}
          <View style={{ marginBottom: spacing.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                <Text style={{ fontSize: 16 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>Hey, Guyyyyyys</Text>
              </View>
              <TouchableOpacity style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: 16 }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Follow</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, marginBottom: spacing.sm, lineHeight: 20 }}>
              Happy to be rated No1. on the World Top 100 Lifters. Thank you for your support!!
            </Text>
            <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8, alignSelf: 'flex-start', marginBottom: spacing.sm }}>
              <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.brand }}>Challenges</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="heart-outline" size={20} color={colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>12</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>3</Text>
              </View>
              <Ionicons name="share-outline" size={20} color={colors.text} />
            </View>
          </View>

          {/* Post 2 */}
          <View style={{ marginBottom: spacing.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                <Text style={{ fontSize: 16 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>Runnnnnnnnnnn!!!</Text>
              </View>
              <TouchableOpacity style={{ backgroundColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: 16 }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Following</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 200, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.subtext }}>Post Image</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="heart-outline" size={20} color={colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>12</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>4</Text>
              </View>
              <Ionicons name="share-outline" size={20} color={colors.text} />
            </View>
          </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(user)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="people" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="barbell-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/shop')} style={{ alignItems: 'center' }}>
          <Ionicons name="bag-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

