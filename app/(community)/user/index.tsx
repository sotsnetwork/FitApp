import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../../theme/tokens';

const tabs = ['Popular', 'My Post', 'Following', 'Challenges'];

export default function UserCommunity() {
  const [selectedTab, setSelectedTab] = React.useState('Popular');
  const [challengeSubTab, setChallengeSubTab] = React.useState<'Leaderboard' | 'Challenges'>('Challenges');
  const [challengeAcceptedVisible, setChallengeAcceptedVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.push('/(user)/profile')}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: 0 }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.xs }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                paddingHorizontal: spacing.md,
                paddingVertical: 3,
                borderRadius: 16,
                backgroundColor: selectedTab === tab ? colors.text : 'transparent',
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: selectedTab === tab ? 'white' : colors.subtext }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, marginTop: 0, paddingBottom: spacing.lg }}>
          {selectedTab === 'Challenges' ? (
            <>
              {/* Sub tabs */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 0, marginBottom: spacing.md }}>
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
              <TouchableOpacity
                onPress={() => setChallengeAcceptedVisible(true)}
                style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingVertical: spacing.md, alignItems: 'center', marginBottom: spacing.xl }}
              >
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
          <View style={{ marginTop: 0, marginBottom: spacing.xl }}>
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
            <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: 1, borderRadius: 8, alignSelf: 'flex-start', marginBottom: spacing.sm }}>
              <Text style={{ fontSize: 11, fontFamily: fonts.regular, color: colors.brand }}>Challenges</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="heart" size={20} color={colors.brand} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>12</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>3</Text>
              </View>
              <Ionicons name="share-outline" size={20} color={colors.text} />
            </View>
          </View>

          {/* Post 2 - Daily Exercise Post */}
          <View style={{ marginBottom: spacing.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: colors.text }}>Daily Excerc...</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginTop: 2 }}>10M joined</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>Squat || Albs || Loins || Yoga</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(user)/post-detail')}
              style={{ width: '100%', height: 250, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ color: colors.subtext }}>Post Image</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="heart" size={20} color={colors.brand} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>12</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>3</Text>
              </View>
              <Ionicons name="share-outline" size={20} color={colors.text} />
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20 }}>
              Lorem ipsum dolor sit amet consectetur. Faucibus vitae nisl cras commodo nisl non. In dui adipiscing sit justo volutpat massa.
            </Text>
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

