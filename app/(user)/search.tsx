import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts } from '../../theme/tokens';
import { useTheme } from '../../hooks/useTheme';
import { useSearchHistory } from '../../contexts/SearchHistoryContext';

// Mock data for search results
const mockAccounts = [
  { id: '1', username: 'fitness_guru', name: 'Fitness Guru', followers: '12.5K', isFollowing: false },
  { id: '2', username: 'workout_king', name: 'Workout King', followers: '8.2K', isFollowing: true },
  { id: '3', username: 'yoga_master', name: 'Yoga Master', followers: '15.3K', isFollowing: false },
  { id: '4', username: 'cardio_queen', name: 'Cardio Queen', followers: '6.7K', isFollowing: false },
];

const mockPosts = [
  { id: '1', title: '10 Best Running Tips for Beginners', author: 'fitness_guru', likes: 234, comments: 45 },
  { id: '2', title: 'Morning Yoga Routine', author: 'yoga_master', likes: 189, comments: 32 },
  { id: '3', title: 'HIIT Workout Challenge', author: 'workout_king', likes: 456, comments: 78 },
  { id: '4', title: 'Nutrition Guide for Athletes', author: 'cardio_queen', likes: 312, comments: 56 },
];

const mockKeywords = [
  { id: '1', keyword: 'workout', count: '12.5K posts' },
  { id: '2', keyword: 'fitness', count: '8.2K posts' },
  { id: '3', keyword: 'yoga', count: '15.3K posts' },
  { id: '4', keyword: 'running', count: '6.7K posts' },
];

type SearchTab = 'all' | 'accounts' | 'posts' | 'keywords';

export default function Search() {
  const { colors, isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState<SearchTab>('all');
  const { searchHistory, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();
  const [isSearching, setIsSearching] = React.useState(false);

  // Extract username from query (remove @ if present)
  const getSearchQuery = () => {
    return searchQuery.trim().replace(/^@/, '').toLowerCase();
  };

  // Check if query is a username search (starts with @ or matches username pattern)
  const isUsernameSearch = () => {
    return searchQuery.trim().startsWith('@') || /^[a-zA-Z0-9_]+$/.test(searchQuery.trim());
  };

  // Filter results based on search query
  const filteredAccounts = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = getSearchQuery();
    const isUsernameQuery = isUsernameSearch();
    
    return mockAccounts.filter((account) => {
      const usernameMatch = account.username.toLowerCase().includes(query);
      const nameMatch = account.name.toLowerCase().includes(query);
      
      // If it's a username search (starts with @), prioritize username matches
      if (isUsernameQuery) {
        return usernameMatch || (query.length > 0 && account.username.toLowerCase().startsWith(query));
      }
      
      return usernameMatch || nameMatch;
    });
  }, [searchQuery]);

  const filteredPosts = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = getSearchQuery();
    const isUsernameQuery = isUsernameSearch();
    
    // If searching for username, filter posts by author username
    if (isUsernameQuery) {
      return mockPosts.filter((post) =>
        post.author.toLowerCase().includes(query)
      );
    }
    
    return mockPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredKeywords = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    // Don't show keywords if it's a username search
    if (isUsernameSearch()) return [];
    
    const query = getSearchQuery();
    return mockKeywords.filter((keyword) =>
      keyword.keyword.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
    if (query.trim()) {
      addToHistory(query);
    }
  };

  const handleHistoryItemPress = (item: string) => {
    setSearchQuery(item);
    setIsSearching(true);
    addToHistory(item);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const renderSearchHistory = () => {
    if (searchHistory.length === 0) return null;

    return (
      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
          <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: colors.text }}>Recent Searches</Text>
          <TouchableOpacity onPress={clearHistory}>
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>Clear</Text>
          </TouchableOpacity>
        </View>
        {searchHistory.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleHistoryItemPress(item)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: spacing.md,
              borderBottomWidth: index < searchHistory.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="time-outline" size={20} color={colors.subtext} style={{ marginRight: spacing.sm }} />
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text, flex: 1 }}>{item}</Text>
            </View>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                removeFromHistory(item);
              }}
              style={{ padding: spacing.xs }}
            >
              <Ionicons name="close" size={18} color={colors.subtext} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderAccounts = () => {
    if (filteredAccounts.length === 0) return null;

    return (
      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.md }}>
        <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>
          {isUsernameSearch() ? 'Usernames' : 'Accounts'}
        </Text>
        {filteredAccounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
              <Text style={{ fontSize: 20 }}>👤</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: colors.text }}>{account.name}</Text>
              <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: colors.brand }}>@{account.username}</Text>
              <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{account.followers} followers</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: account.isFollowing ? 'transparent' : colors.brand,
                borderWidth: account.isFollowing ? 1 : 0,
                borderColor: colors.border,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs,
                borderRadius: 16,
              }}
            >
              <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: account.isFollowing ? colors.text : '#0F0F0F' }}>
                {account.isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderPosts = () => {
    if (filteredPosts.length === 0) return null;

    return (
      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.md }}>
        <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>Posts</Text>
        {filteredPosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => router.push('/(user)/post-detail')}
            style={{
              paddingVertical: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: colors.text, marginBottom: spacing.xs }}>
              {post.title}
            </Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.xs }}>
              by @{post.author}
            </Text>
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="heart-outline" size={14} color={colors.subtext} />
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{post.likes}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Ionicons name="chatbubble-outline" size={14} color={colors.subtext} />
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{post.comments}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderKeywords = () => {
    if (filteredKeywords.length === 0) return null;

    return (
      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.md }}>
        <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>Keywords</Text>
        {filteredKeywords.map((keyword) => (
          <TouchableOpacity
            key={keyword.id}
            onPress={() => handleHistoryItemPress(keyword.keyword)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="pricetag-outline" size={20} color={colors.subtext} style={{ marginRight: spacing.sm }} />
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>#{keyword.keyword}</Text>
            </View>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{keyword.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderResults = () => {
    if (!isSearching) return null;

    const hasResults = filteredAccounts.length > 0 || filteredPosts.length > 0 || filteredKeywords.length > 0;

    if (!hasResults) {
      return (
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.xl, alignItems: 'center' }}>
          <Ionicons name="search-outline" size={48} color={colors.subtext} />
          <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginTop: spacing.md, color: colors.text }}>
            No results found
          </Text>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginTop: spacing.xs, color: colors.subtext, textAlign: 'center' }}>
            Try searching for something else
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {selectedTab === 'all' || selectedTab === 'accounts' ? renderAccounts() : null}
        {selectedTab === 'all' || selectedTab === 'posts' ? renderPosts() : null}
        {selectedTab === 'all' || selectedTab === 'keywords' ? renderKeywords() : null}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5, color: colors.text }}>SEARCH</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDarkMode ? colors.border : '#F5F5F5', borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
          <Ionicons name="search-outline" size={20} color={colors.subtext} />
          <TextInput
            placeholder="Search accounts, posts, keywords, @username..."
            placeholderTextColor={colors.subtext}
            value={searchQuery}
            onChangeText={handleSearch}
            style={{ flex: 1, marginLeft: spacing.sm, fontFamily: fonts.regular, fontSize: 14, color: colors.text }}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={{ padding: spacing.xs }}>
              <Ionicons name="close-circle" size={20} color={colors.subtext} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs */}
      {isSearching && (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border }}>
          {(['all', 'accounts', 'posts', 'keywords'] as SearchTab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                flex: 1,
                paddingVertical: spacing.md,
                alignItems: 'center',
                borderBottomWidth: selectedTab === tab ? 2 : 0,
                borderBottomColor: colors.brand,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: fonts.semibold,
                  color: selectedTab === tab ? colors.brand : colors.subtext,
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Content */}
      {isSearching ? (
        renderResults()
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {renderSearchHistory()}
          {searchHistory.length === 0 && (
            <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.xl, alignItems: 'center' }}>
              <Ionicons name="search-outline" size={48} color={colors.subtext} />
              <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginTop: spacing.md, color: colors.text }}>
                Search for accounts, posts, or keywords
              </Text>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginTop: spacing.xs, color: colors.subtext, textAlign: 'center' }}>
                Your recent searches will appear here
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(user)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="search" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Search</Text>
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
    </SafeAreaView>
  );
}

