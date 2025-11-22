import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Share, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { spacing, fonts, colors } from '../../../theme/tokens';
import UserMenuOverlay from '../../(user)/menu-overlay';

const tabs = ['Popular', 'My Post', 'Following', 'Challenges'];

export default function UserCommunity() {
  const [selectedTab, setSelectedTab] = React.useState('Popular');
  const [challengeAcceptedVisible, setChallengeAcceptedVisible] = React.useState(false);
  const [createPostModalVisible, setCreatePostModalVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [following, setFollowing] = React.useState<{ [key: string]: boolean }>({});
  const [likedPosts, setLikedPosts] = React.useState<{ [key: string]: boolean }>({});
  const [followingPosts, setFollowingPosts] = React.useState<{ [key: string]: boolean }>({});
  const [postLikeCounts, setPostLikeCounts] = React.useState<{ [key: string]: number }>({
    'post-1': 12,
    'post-2': 12,
    'post-3': 12,
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
    router.push({ pathname: '/(user)/create-post', params: { type: 'picture' } });
  };

  const pickVideo = async () => {
    setCreatePostModalVisible(false);
    router.push({ pathname: '/(user)/create-post', params: { type: 'video' } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>COMMUNITY</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity onPress={() => router.push('/(user)/search')}>
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(user)/notifications')}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.lg, paddingTop: spacing.xs, paddingBottom: 0, gap: spacing.xs }}>
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
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: 0, paddingBottom: spacing.lg }}>
          {selectedTab === 'Challenges' ? (
            <>
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
                    <Ionicons name="flash" size={20} color={colors.brand} />
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
          <View style={{ marginBottom: spacing.md, marginTop: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                <Text style={{ fontSize: 16 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>Hey, Guyyyyyys</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setFollowing({ ...following, 'hey-guys': !following['hey-guys'] })}
                style={{ 
                  backgroundColor: following['hey-guys'] ? 'transparent' : colors.brand, 
                  borderWidth: following['hey-guys'] ? 1 : 0,
                  borderColor: colors.border,
                  paddingHorizontal: spacing.md, 
                  paddingVertical: spacing.xs, 
                  borderRadius: 16 
                }}
              >
                <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: following['hey-guys'] ? colors.text : 'white' }}>
                  {following['hey-guys'] ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, marginBottom: spacing.xs, lineHeight: 20 }}>
              Happy to be rated No1. on the World Top 100 Lifters. Thank you for your support!!
            </Text>
            <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: 1, borderRadius: 8, alignSelf: 'flex-start', marginBottom: spacing.xs }}>
              <Text style={{ fontSize: 11, fontFamily: fonts.regular, color: colors.brand }}>Challenges</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <TouchableOpacity
                onPress={() => handleLike('post-1')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
              >
                <Ionicons name={likedPosts['post-1'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['post-1'] ? colors.brand : colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['post-1'] || 12}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(user)/post-detail')}
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
          <View style={{ marginBottom: spacing.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: colors.text }}>Daily Excercuse</Text>
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
              <TouchableOpacity
                onPress={() => handleLike('post-2')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
              >
                <Ionicons name={likedPosts['post-2'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['post-2'] ? colors.brand : colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['post-2'] || 12}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(user)/post-detail')}
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
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20 }}>
              Lorem ipsum dolor sit amet consectetur. Faucibus vitae nisl cras commodo nisl non. In dui adipiscing sit justo volutpat massa.
            </Text>
          </View>

          {/* Post 3 - Running Post */}
          <View style={{ marginBottom: spacing.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                <Text style={{ fontSize: 16 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14 }}>Runnnnnnnnnnn!!!</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setFollowingPosts({ ...followingPosts, 'running': !followingPosts['running'] })}
                style={{ 
                  backgroundColor: followingPosts['running'] ? 'transparent' : colors.brand, 
                  borderWidth: followingPosts['running'] ? 1 : 0,
                  borderColor: colors.border,
                  paddingHorizontal: spacing.md, 
                  paddingVertical: spacing.xs, 
                  borderRadius: 16 
                }}
              >
                <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: followingPosts['running'] ? colors.text : 'white' }}>
                  {followingPosts['running'] ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(user)/post-detail')}
              style={{ width: '100%', height: 250, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ color: colors.subtext }}>Running Image</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: 1, borderRadius: 8, alignSelf: 'flex-start', marginBottom: spacing.sm }}>
              <Text style={{ fontSize: 11, fontFamily: fonts.regular, color: colors.brand }}>Following</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <TouchableOpacity
                onPress={() => handleLike('post-3')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
              >
                <Ionicons name={likedPosts['post-3'] ? 'heart' : 'heart-outline'} size={20} color={likedPosts['post-3'] ? colors.brand : colors.text} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12 }}>{postLikeCounts['post-3'] || 12}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(user)/post-detail')}
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
          )}
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

      {/* Create Post Floating Button */}
      <TouchableOpacity
        onPress={() => setCreatePostModalVisible(true)}
        style={{
          position: 'absolute',
          bottom: 100,
          right: spacing.lg,
          backgroundColor: colors.brandTint,
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 28, fontFamily: fonts.bold, color: '#0F0F0F' }}>+</Text>
      </TouchableOpacity>

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
                router.push({ pathname: '/(user)/create-post', params: { type: 'text' } });
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

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setCreatePostModalVisible(false)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
                marginTop: spacing.lg,
              }}
            >
              <Ionicons name="close" size={20} color={colors.text} />
              <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Menu Overlay */}
      <UserMenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="community" />
    </SafeAreaView>
  );
}