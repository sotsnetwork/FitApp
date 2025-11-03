import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

const categories = ['All', 'Yoga', 'Alba/Achilles', 'Squat', 'Jumping'];

export default function UserWorkout() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>WORKOUT</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.md }}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={{
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                borderRadius: 20,
                backgroundColor: selectedCategory === category ? colors.brand : 'transparent',
                borderWidth: 1,
                borderColor: selectedCategory === category ? colors.brand : colors.border,
              }}
            >
              <Text style={{ fontFamily: fonts.regular, color: selectedCategory === category ? '#0F0F0F' : colors.text }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Recommended Section */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>RECOMMENDED</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>Sponsored</Text>
              <Ionicons name="chevron-down" size={16} color={colors.subtext} />
            </TouchableOpacity>
          </View>

          {/* Workout Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity
                key={item}
                style={{ width: '48%', marginBottom: spacing.md }}
                onPress={() => router.push('/(user)/post-detail')}
              >
                <View style={{ width: '100%', height: 150, backgroundColor: colors.border, borderRadius: 12, marginBottom: spacing.xs, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="barbell" size={40} color={colors.subtext} />
                </View>
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.xs }}>
                  LOREM IPSUM DOLOR
                </Text>
                <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' }}>
                  <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Sponsored</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(user)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="search" size={24} color={colors.brand} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.brand, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/user')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/shop')} style={{ alignItems: 'center' }}>
          <Ionicons name="bag-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="person-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

