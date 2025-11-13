import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useSavedPosts } from '../../contexts/SavedPostsContext';
import MenuOverlay from './menu-overlay';
import BookmarkOverlay from '../../components/BookmarkOverlay';

const categories = ['All', 'Walk', 'Run', 'Ride', 'Hike', 'Swim', 'Crossfit', 'Rock Climb'];

// Mock posts with activity tags
const allPosts = [
  { id: '1', title: 'LOREM IPSUM DOLOR', activityTag: 'Walk', isSponsored: true },
  { id: '2', title: 'LOREM IPSUM DOLOR', activityTag: 'Run', isSponsored: true },
  { id: '3', title: 'LOREM IPSUM DOLOR', activityTag: 'Ride', isSponsored: true },
  { id: '4', title: 'LOREM IPSUM DOLOR', activityTag: 'Hike', isSponsored: true },
  { id: '5', title: 'LOREM IPSUM DOLOR', activityTag: 'Swim', isSponsored: true },
  { id: '6', title: 'LOREM IPSUM DOLOR', activityTag: 'Crossfit', isSponsored: true },
  { id: '7', title: 'LOREM IPSUM DOLOR', activityTag: 'Rock Climb', isSponsored: true },
  { id: '8', title: 'LOREM IPSUM DOLOR', activityTag: 'Walk', isSponsored: false },
  { id: '9', title: 'LOREM IPSUM DOLOR', activityTag: 'Run', isSponsored: false },
  { id: '10', title: 'LOREM IPSUM DOLOR', activityTag: 'Ride', isSponsored: false },
];

export default function VendorWorkout() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sponsoredDropdownVisible, setSponsoredDropdownVisible] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState('Sponsored');
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [bookmarkVisible, setBookmarkVisible] = React.useState(false);
  const { savePost, unsavePost, isSaved } = useSavedPosts();

  // Filter posts based on selected category and search query
  const filteredPosts = React.useMemo(() => {
    let filtered = allPosts;
    
    // Filter by search query (activity name or title)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((post) => {
        const activityMatch = post.activityTag.toLowerCase().includes(query);
        const titleMatch = post.title.toLowerCase().includes(query);
        return activityMatch || titleMatch;
      });
    }
    
    // Filter by activity tag
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.activityTag === selectedCategory);
    }
    
    // Filter by sponsored status
    if (selectedFilter === 'Sponsored') {
      filtered = filtered.filter((post) => post.isSponsored);
    } else if (selectedFilter === 'Non-Sponsored') {
      filtered = filtered.filter((post) => !post.isSponsored);
    }
    
    return filtered;
  }, [selectedCategory, selectedFilter, searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>WORKOUT</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity onPress={() => setSearchVisible(true)}>
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBookmarkVisible(true)}>
            <Ionicons name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Activity Filters */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: spacing.xs }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={{
                  paddingHorizontal: spacing.md,
                  borderRadius: 16,
                  backgroundColor: selectedCategory === category ? colors.brand : 'white',
                  borderWidth: 1,
                  borderColor: selectedCategory === category ? colors.brand : colors.border,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: selectedCategory === category ? '#0F0F0F' : colors.subtext, textAlign: 'center' }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <Text style={{ fontFamily: fonts.bold, fontSize: 16 }}>RECOMMENDED</Text>
        <TouchableOpacity onPress={() => setSponsoredDropdownVisible(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.subtext }}>{selectedFilter}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.subtext} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
          {filteredPosts.length === 0 ? (
            <View style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
              <Text style={{ fontFamily: fonts.regular, color: colors.subtext }}>No workouts found</Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {filteredPosts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  onPress={() => router.push('/(vendor)/product-detail')}
                  style={{ width: '48%', marginBottom: spacing.md }}
                >
                  <View style={{ width: '100%', height: 150, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.xs }} />
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, marginBottom: spacing.xs }}>{post.title}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (isSaved(post.id)) {
                          unsavePost(post.id);
                        } else {
                          savePost(post.id);
                        }
                      }}
                    >
                      <Ionicons name={isSaved(post.id) ? 'bookmark' : 'bookmark-outline'} size={20} color={isSaved(post.id) ? colors.brand : colors.text} />
                    </TouchableOpacity>
                    {post.isSponsored && (
                      <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4 }}>
                        <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Sponsored</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(vendor)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(vendor)/search')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/vendor')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="barbell" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(vendor)/shop')} style={{ alignItems: 'center' }}>
          <Ionicons name="bag-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="workout" />

      {/* Search Modal */}
      <Modal
        visible={searchVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSearchVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
              <TextInput
                placeholder="Search workouts..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, fontFamily: fonts.regular }}
                autoFocus
              />
              <TouchableOpacity onPress={() => setSearchVisible(false)} style={{ marginLeft: spacing.md }}>
                <Text style={{ fontFamily: fonts.regular, color: colors.brand }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Filter Dropdown Modal */}
      <Modal
        visible={sponsoredDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSponsoredDropdownVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setSponsoredDropdownVisible(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: spacing.md, minWidth: 200 }}>
            {['All', 'Sponsored', 'Non-Sponsored'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setSelectedFilter(filter);
                  setSponsoredDropdownVisible(false);
                }}
                style={{ paddingVertical: spacing.md }}
              >
                <Text style={{ fontFamily: fonts.regular, color: selectedFilter === filter ? colors.brand : colors.text }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="workout" />

      {/* Bookmark Overlay */}
      <BookmarkOverlay visible={bookmarkVisible} onClose={() => setBookmarkVisible(false)} userRole="vendor" />
    </SafeAreaView>
  );
}

