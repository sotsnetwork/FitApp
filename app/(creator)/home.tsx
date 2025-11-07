import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function CreatorHome() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>HOME</Text>
        <TouchableOpacity onPress={() => router.push('/(user)/notifications')}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
            <Ionicons name="search-outline" size={20} color={colors.subtext} />
            <TextInput placeholder="Search" style={{ flex: 1, marginLeft: spacing.sm, fontFamily: fonts.regular }} />
          </View>
        </View>

        {/* Tip for the Day */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.sm }}>Tip for the Day</Text>
          <View style={{ borderWidth: 1, borderColor: '#FFA500', borderRadius: 12, padding: spacing.md, backgroundColor: 'white' }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20 }}>
              Lorem ipsum dolor sit amet consectetur. Et neque id mauris diam facilisis turpis nibh malesuada. At amet.
            </Text>
          </View>
        </View>

        {/* Daily Goal */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Daily Goal</Text>
            <TouchableOpacity onPress={() => router.push('/(user)/daily-goals')}>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text, opacity: 0.5 }}>See all</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ backgroundColor: '#F9F9F9', borderRadius: 16, overflow: 'hidden' }}>
            <View style={{ width: '100%', height: 200, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="play" size={32} color="white" />
              </View>
            </View>
            <View style={{ padding: spacing.md }}>
              <Text style={{ fontSize: 16, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>
                Simple Dumbbell Handless for Thighs, Buttock & Ankle
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, marginRight: spacing.xs }}>
                  Nike Free Metcon 6 -
                </Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: '#FFA500' }}>60% Discount</Text>
              </View>
              <TouchableOpacity style={{ backgroundColor: colors.brand, paddingVertical: spacing.sm, borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ fontFamily: fonts.semibold, color: '#0F0F0F' }}>Join Daily Goals</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Ongoing Challenges */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Ongoing Challenges</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2].map((challenge) => (
              <TouchableOpacity key={challenge} style={{ width: 200, marginRight: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, overflow: 'hidden' }}>
                <View style={{ width: '100%', height: 120, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="barbell" size={40} color={colors.subtext} />
                </View>
                <View style={{ padding: spacing.md }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.xs }}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.xs }}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <TouchableOpacity style={{ backgroundColor: colors.brand, paddingVertical: spacing.xs, borderRadius: 8, alignItems: 'center', marginTop: spacing.xs }}>
                    <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Join now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Start Workout Button */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <TouchableOpacity style={{ backgroundColor: colors.text, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ fontFamily: fonts.semibold, color: 'white', fontSize: 16 }}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="home" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/user')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
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

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="home" />
    </SafeAreaView>
  );
}

