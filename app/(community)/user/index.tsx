import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../../theme/tokens';

export default function UserCommunity() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Text style={{ fontSize: 24, fontFamily: fonts.bold }}>Community</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Stories Section */}
        <View style={{ paddingVertical: spacing.md }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: spacing.md }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity key={item} style={{ marginRight: spacing.md, alignItems: 'center' }}>
                <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.brandTint, borderWidth: 2, borderColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>👤</Text>
                </View>
                <Text style={{ marginTop: spacing.xs, fontSize: 12, fontFamily: fonts.regular }}>User {item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Feed Section */}
        <View style={{ padding: spacing.lg }}>
          {[1, 2, 3, 4].map((post) => (
            <View key={post} style={{ marginBottom: spacing.xl, backgroundColor: '#F9F9F9', borderRadius: 16, padding: spacing.md }}>
              {/* Post Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <Text style={{ fontSize: 18 }}>👤</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>User Name</Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>2 hours ago</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={20} color={colors.subtext} />
                </TouchableOpacity>
              </View>

              {/* Post Content */}
              <Text style={{ fontFamily: fonts.regular, fontSize: 14, marginBottom: spacing.sm, lineHeight: 20 }}>
                Just completed a 5K run! Feeling amazing! 💪 #FitnessJourney #Running
              </Text>

              {/* Post Image Placeholder */}
              <View style={{ width: '100%', height: 200, borderRadius: 12, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm }}>
                <Text style={{ color: colors.subtext }}>Post Image</Text>
              </View>

              {/* Post Actions */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border }}>
                <View style={{ flexDirection: 'row', gap: spacing.lg }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="heart-outline" size={20} color={colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>24</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="share-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="home" size={24} color={colors.brand} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.brand, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="trophy-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Challenges</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="person-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

