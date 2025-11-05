import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

const categories = ['All', 'Walk', 'Run', 'Ride', 'Hike', 'Swim', 'Crossfit', 'Rock Climb'];

export default function UserWorkout() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sponsoredDropdownVisible, setSponsoredDropdownVisible] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState('Sponsored');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.push('/(user)/profile')}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>WORKOUT</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(user)/saved-videos')}>
            <Ionicons name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: spacing.xs }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={{
                  paddingHorizontal: spacing.md,
                  paddingVertical: 3,
                  borderRadius: 16,
                  backgroundColor: selectedCategory === category ? colors.brand : 'white',
                  borderWidth: 1,
                  borderColor: selectedCategory === category ? colors.brand : colors.border,
                  height: 36,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: selectedCategory === category ? '#0F0F0F' : colors.subtext }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Recommended Section */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md, marginTop: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>RECOMMENDED</Text>
            <TouchableOpacity
              onPress={() => setSponsoredDropdownVisible(true)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
            >
              <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{selectedFilter}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.subtext} />
            </TouchableOpacity>
          </View>

          {/* Workout Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <View key={item} style={{ width: '48%', marginBottom: spacing.md }}>
                <TouchableOpacity
                  style={{ width: '100%', height: 150, backgroundColor: colors.border, borderRadius: 12, marginBottom: spacing.xs, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => router.push('/(user)/post-detail')}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, flex: 1 }}>
                    LOREM IPSUM DOLOR
                  </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Ionicons name="bookmark-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' }}>
                  <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Sponsored</Text>
                </View>
              </View>
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
        <TouchableOpacity onPress={() => router.push('/(user)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/user')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="barbell" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/shop')} style={{ alignItems: 'center' }}>
          <Ionicons name="bag-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
      </View>

      {/* Sponsored Dropdown Modal */}
      <Modal
        visible={sponsoredDropdownVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSponsoredDropdownVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setSponsoredDropdownVisible(false)}
          />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
            {/* Handle/Grabber */}
            <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
              <View
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: colors.border,
                }}
              />
            </View>

            {/* Options */}
            <View>
              {/* Sponsored Option */}
              <TouchableOpacity
                onPress={() => setSelectedFilter('Sponsored')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.lg,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Sponsored</Text>
                {selectedFilter === 'Sponsored' && (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: colors.brand,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                  </View>
                )}
              </TouchableOpacity>

              {/* Creators Option */}
              <TouchableOpacity
                onPress={() => setSelectedFilter('Creators')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.lg,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Creators</Text>
                {selectedFilter === 'Creators' && (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: colors.brand,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Done Button */}
            <TouchableOpacity
              onPress={() => setSponsoredDropdownVisible(false)}
              style={{
                backgroundColor: colors.text,
                marginHorizontal: spacing.lg,
                marginTop: spacing.lg,
                paddingVertical: spacing.md,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: 'white' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

