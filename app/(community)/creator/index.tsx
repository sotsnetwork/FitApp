import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Share, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { spacing, fonts, colors } from '../../../theme/tokens';

const tabs = ['Popular', 'My Post', 'Following', 'Challenges'];

export default function CreatorCommunity() {
  const [selectedTab, setSelectedTab] = React.useState('Popular');
  const [challengeAcceptedVisible, setChallengeAcceptedVisible] = React.useState(false);
  const [createPostModalVisible, setCreatePostModalVisible] = React.useState(false);
  const [likedPosts, setLikedPosts] = React.useState<{ [key: string]: boolean }>({});
  const [postLikeCounts, setPostLikeCounts] = React.useState<{ [key: string]: number }>({
    'challenge-post-1': 12,
    'challenge-post-2': 12,
    'popular-post-1': 12,
    'popular-post-2': 12,
    'popular-post-3': 0,
    'popular-post-4': 0,
    'following-post-1': 12,
  });

  const handleLike = (postId: string) => {
    const isLiked = likedPosts[postId] || false;
    const currentCount = postLikeCounts[postId] || 0;
    
    setLikedPosts({
      ...likedPosts,
      [postId]: !isLiked,
    });
    
    setPostLikeCounts({
      ...postLikeCounts,
      [postId]: isLiked ? currentCount - 1 : currentCount + 1,
    });
  };

  // Request permissions for image/video picker
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images and videos!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    setCreatePostModalVisible(false);
    router.push({ pathname: '/(creator)/create-post', params: { type: 'picture' } });
  };

  const pickVideo = async () => {
    setCreatePostModalVisible(false);
    router.push({ pathname: '/(creator)/create-post', params: { type: 'video' } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.push('/(creator)/home')}>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.lg, paddingVertical: spacing.xs, gap: spacing.xs }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                paddingHorizontal: spacing.md,
                borderRadius: 16,
                backgroundColor: selectedTab === tab ? colors.text : 'transparent',
                height: 28,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: selectedTab === tab ? 'white' : colors.subtext, textAlign: 'center' }}>
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
              {/* Post 1 - Hey, Guyyyyyys */}
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
                <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: 1, borderRadius: 8, alignSelf: 'flex-start', marginBottom: spacing.sm }}>
                  <Text style={{ fontSize: 11, fontFamily: fonts.regular, color: colors.brand }}>Challenges</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <TouchableOpacity
                    onPress={() => handleLike('challenge-post-1')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name={likedPosts['challenge-post-1'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['challenge-post-1'] ? colors.brand : colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['challenge-post-1'] || 12}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push('/(creator)/content-detail')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: 'Check out this amazing fitness post on FitApp!',
                          title: 'Share Post',
                        });
                      } catch (error) {
                        console.error('Error sharing:', error);
                      }
                    }}
                  >
                    <Ionicons name="share-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Post 2 - Runnnnnnnnnnn!!! with Following tag and + Create button */}
              <View style={{ marginBottom: spacing.xl, position: 'relative' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                    <Text style={{ fontSize: 16 }}>👤</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>Runnnnnnnnnnn!!!</Text>
                    <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: spacing.xs }}>
                      <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: colors.brand }}>Following</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => router.push('/(creator)/content-detail')}
                  style={{ width: '100%', height: 250, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ color: colors.subtext }}>Post Image</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm }}>
                  <TouchableOpacity
                    onPress={() => handleLike('challenge-post-2')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name={likedPosts['challenge-post-2'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['challenge-post-2'] ? colors.brand : colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['challenge-post-2'] || 12}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push('/(creator)/content-detail')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: 'Check out this amazing fitness post on FitApp!',
                          title: 'Share Post',
                        });
                      } catch (error) {
                        console.error('Error sharing:', error);
                      }
                    }}
                  >
                    <Ionicons name="share-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
                {/* + Create Button */}
                <TouchableOpacity
                  onPress={() => setCreatePostModalVisible(true)}
                  style={{
                    position: 'absolute',
                    bottom: spacing.sm,
                    right: spacing.sm,
                    backgroundColor: colors.brand,
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: '#0F0F0F' }}>+</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : selectedTab === 'Popular' ? (
            <>
              {/* Post 1 - Hey, Guyyyyyys */}
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
                <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: 1, borderRadius: 8, alignSelf: 'flex-start', marginBottom: spacing.sm }}>
                  <Text style={{ fontSize: 11, fontFamily: fonts.regular, color: colors.brand }}>Challenges</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <TouchableOpacity
                    onPress={() => handleLike('challenge-post-1')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name={likedPosts['challenge-post-1'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['challenge-post-1'] ? colors.brand : colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['challenge-post-1'] || 12}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push('/(creator)/content-detail')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: 'Check out this amazing fitness post on FitApp!',
                          title: 'Share Post',
                        });
                      } catch (error) {
                        console.error('Error sharing:', error);
                      }
                    }}
                  >
                    <Ionicons name="share-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Post 2 - Daily Exercise Post */}
              <View style={{ marginBottom: spacing.xl, position: 'relative' }}>
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
                  onPress={() => router.push('/(creator)/content-detail')}
                  style={{ width: '100%', height: 250, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ color: colors.subtext }}>Post Image</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm }}>
                  <TouchableOpacity
                    onPress={() => handleLike('popular-post-2')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name={likedPosts['popular-post-2'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['popular-post-2'] ? colors.brand : colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['popular-post-2'] || 12}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push('/(creator)/content-detail')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                  >
                    <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: 'Check out this amazing fitness post on FitApp!',
                          title: 'Share Post',
                        });
                      } catch (error) {
                        console.error('Error sharing:', error);
                      }
                    }}
                  >
                    <Ionicons name="share-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: spacing.sm }}>
                  Lorem ipsum dolor sit amet consectetur. Faucibus vitae nisl cras commodo nisl non. In dui adipiscing sit justo volutpat massa.
                </Text>
                {/* + Create Button */}
                <TouchableOpacity
                  onPress={() => setCreatePostModalVisible(true)}
                  style={{
                    position: 'absolute',
                    bottom: spacing.sm,
                    right: spacing.sm,
                    backgroundColor: colors.brand,
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: '#0F0F0F' }}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Post 3 - Sponsored Challenge Post */}
              <View style={{ marginBottom: spacing.xl }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.semibold, fontSize: 14, color: colors.text }}>Debby Annie</Text>
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>5th Lorem about...</Text>
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>1000 Lorem Coin - Running</Text>
                  </View>
                </View>
                <View style={{ width: '100%', height: 200, borderRadius: 12, backgroundColor: '#FF6A00', marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontFamily: fonts.bold, fontSize: 18 }}>Jetter.</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setChallengeAcceptedVisible(true)}
                  style={{ backgroundColor: colors.brand, paddingVertical: spacing.sm, borderRadius: 8, alignItems: 'center', marginBottom: spacing.sm }}
                >
                  <Text style={{ fontFamily: fonts.semibold, color: '#0F0F0F' }}>Join Challenge</Text>
                </TouchableOpacity>
              </View>

              {/* Post 4 - Sponsored Post */}
              <View style={{ marginBottom: spacing.xl, position: 'relative' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.semibold, fontSize: 14, color: colors.text }}>Debby Annie</Text>
                    <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: spacing.xs }}>
                      <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Sponsored</Text>
                    </View>
                  </View>
                </View>
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: spacing.sm }}>
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet conse...
                </Text>
                {/* + Create Button */}
                <TouchableOpacity
                  onPress={() => setCreatePostModalVisible(true)}
                  style={{
                    position: 'absolute',
                    bottom: spacing.sm,
                    right: spacing.sm,
                    backgroundColor: colors.brand,
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: '#0F0F0F' }}>+</Text>
                </TouchableOpacity>
              </View>
            </>
              ) : selectedTab === 'Following' ? (
                <>
                  {/* Following Posts */}
                  <View style={{ marginBottom: spacing.xl }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                        <Text style={{ fontSize: 16 }}>👤</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>Runnnnnnnnnnn!!!</Text>
                        <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: spacing.xs }}>
                          <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: colors.brand }}>Following</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => router.push('/(creator)/content-detail')}
                      style={{ width: '100%', height: 250, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Text style={{ color: colors.subtext }}>Post Image</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm }}>
                      <TouchableOpacity
                        onPress={() => handleLike('following-post-1')}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                      >
                        <Ionicons name={likedPosts['following-post-1'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['following-post-1'] ? colors.brand : colors.text} />
                        <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['following-post-1'] || 12}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => router.push('/(creator)/content-detail')}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                      >
                        <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
                        <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>4</Text>
                      </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: 'Check out this amazing fitness post on FitApp!',
                          title: 'Share Post',
                        });
                      } catch (error) {
                        console.error('Error sharing:', error);
                      }
                    }}
                  >
                    <Ionicons name="share-outline" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* My Post Tab */}
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl }}>
                <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.subtext }}>No posts yet</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

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

      {/* Create Post Modal */}
      <Modal
        visible={createPostModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCreatePostModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setCreatePostModalVisible(false)}
          />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.xl }}>
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

            {/* Title */}
            <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: colors.text, marginBottom: spacing.lg, textAlign: 'center' }}>
              Create Post
            </Text>

            {/* Options */}
            <TouchableOpacity
              onPress={() => {
                setCreatePostModalVisible(false);
                router.push({ pathname: '/(creator)/create-post', params: { type: 'text' } });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Ionicons name="document-text-outline" size={24} color={colors.text} style={{ marginRight: spacing.md }} />
              <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text }}>Text</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImage}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Ionicons name="image-outline" size={24} color={colors.text} style={{ marginRight: spacing.md }} />
              <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text }}>Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickVideo}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Ionicons name="videocam-outline" size={24} color={colors.text} style={{ marginRight: spacing.md }} />
              <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text }}>Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCreatePostModalVisible(false);
                // Navigate to dashboard where they can edit posts
                router.push('/(creator)/dashboard');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing.md,
              }}
            >
              <Ionicons name="create-outline" size={24} color={colors.text} style={{ marginRight: spacing.md }} />
              <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text }}>Edit Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
