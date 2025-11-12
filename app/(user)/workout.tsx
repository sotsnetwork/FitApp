import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useSavedPosts } from '../../contexts/SavedPostsContext';
import UserMenuOverlay from './menu-overlay';
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

export default function UserWorkout() {
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

    // Filter by Sponsored/Creators
    if (selectedFilter === 'Sponsored') {
      filtered = filtered.filter((post) => post.isSponsored);
    } else if (selectedFilter === 'Creators') {
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
            {filteredPosts.map((post) => {
              const saved = isSaved(post.id);
              return (
                <View key={post.id} style={{ width: '48%', marginBottom: spacing.md }}>
                  <TouchableOpacity
                    style={{ width: '100%', height: 150, backgroundColor: colors.border, borderRadius: 12, marginBottom: spacing.xs, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => router.push('/(user)/post-detail')}
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                    <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, flex: 1 }}>
                      {post.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (saved) {
                          unsavePost(post.id);
                        } else {
                          savePost(post);
                        }
                      }}
                    >
                      <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? colors.brand : colors.text} />
                    </TouchableOpacity>
                  </View>
                  {post.isSponsored && (
                    <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' }}>
                      <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Sponsored</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(user)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/search')} style={{ alignItems: 'center' }}>
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

      {/* Search Modal */}
      <Modal
        visible={searchVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSearchVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setSearchVisible(false)}
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

            {/* Search Bar */}
            <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
                <Ionicons name="search-outline" size={20} color={colors.subtext} />
                <TextInput
                  placeholder="Search workout activities..."
                  placeholderTextColor={colors.subtext}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{ flex: 1, marginLeft: spacing.sm, fontFamily: fonts.regular, fontSize: 14, color: colors.text }}
                  autoFocus
                  autoCapitalize="none"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: spacing.xs }}>
                    <Ionicons name="close-circle" size={20} color={colors.subtext} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Suggested Activities */}
            {searchQuery.length === 0 && (
              <View style={{ paddingHorizontal: spacing.lg }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>
                  Suggested Activities
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
                  {categories.filter(cat => cat !== 'All').map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => {
                        setSearchQuery(category);
                        setSelectedCategory(category);
                      }}
                      style={{
                        paddingHorizontal: spacing.md,
                        paddingVertical: spacing.sm,
                        borderRadius: 16,
                        backgroundColor: colors.brandTint,
                        borderWidth: 1,
                        borderColor: colors.brand,
                      }}
                    >
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.brand }}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Search Results */}
            {searchQuery.length > 0 && (
              <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: spacing.lg }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>
                    Search Results
                  </Text>
                  {filteredPosts.length === 0 ? (
                    <View style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
                      <Ionicons name="search-outline" size={48} color={colors.subtext} />
                      <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginTop: spacing.md, color: colors.subtext }}>
                        No workout activities found
                      </Text>
                    </View>
                  ) : (
                    filteredPosts.map((post) => {
                      const saved = isSaved(post.id);
                      return (
                        <TouchableOpacity
                          key={post.id}
                          onPress={() => {
                            setSearchVisible(false);
                            router.push('/(user)/post-detail');
                          }}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: spacing.md,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                          }}
                        >
                          <View style={{ width: 60, height: 60, backgroundColor: colors.border, borderRadius: 8, marginRight: spacing.md }} />
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: colors.text, marginBottom: spacing.xs }}>
                              {post.title}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                              <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4 }}>
                                <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: colors.brand }}>
                                  {post.activityTag}
                                </Text>
                              </View>
                              {post.isSponsored && (
                                <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4 }}>
                                  <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>
                                    Sponsored
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              if (saved) {
                                unsavePost(post.id);
                              } else {
                                savePost(post);
                              }
                            }}
                            style={{ padding: spacing.xs }}
                          >
                            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? colors.brand : colors.text} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      );
                    })
                  )}
                </View>
              </ScrollView>
            )}

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => {
                setSearchVisible(false);
                setSearchQuery('');
              }}
              style={{
                backgroundColor: colors.text,
                marginHorizontal: spacing.lg,
                marginTop: spacing.lg,
                paddingVertical: spacing.md,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

      {/* Menu Overlay */}
      <UserMenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="workout" />

      {/* Bookmark Overlay */}
      <BookmarkOverlay visible={bookmarkVisible} onClose={() => setBookmarkVisible(false)} userRole="user" />
    </SafeAreaView>
  );
}

