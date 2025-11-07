import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Share, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

interface Comment {
  id: string;
  name: string;
  date: string;
  comment: string;
  replies?: Comment[];
}

interface LikedUser {
  id: string;
  name: string;
  avatar?: string;
}

interface Viewer {
  id: string;
  name: string;
  avatar?: string;
  viewedAt: string;
}

export default function CreatorDashboard() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  
  // State for each post's interactions
  const [postStates, setPostStates] = React.useState<{
    [key: number]: {
      isLiked: boolean;
      likeCount: number;
      commentCount: number;
      viewCount: number;
      comments: Comment[];
      likedUsers: LikedUser[];
      viewers: Viewer[];
    };
  }>({
    1: {
      isLiked: false,
      likeCount: 45,
      commentCount: 45,
      viewCount: 45,
      comments: [
        { id: '1', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it.', replies: [] },
        { id: '2', name: 'Sarah', date: '6th February,2023 2PM', comment: 'Great workout video! Really helpful.', replies: [] },
      ],
      likedUsers: [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Mike Johnson' },
        { id: '4', name: 'Sarah Williams' },
      ],
      viewers: [
        { id: '1', name: 'John Doe', viewedAt: '2 hours ago' },
        { id: '2', name: 'Jane Smith', viewedAt: '3 hours ago' },
        { id: '3', name: 'Mike Johnson', viewedAt: '4 hours ago' },
        { id: '4', name: 'Sarah Williams', viewedAt: '5 hours ago' },
      ],
    },
    2: {
      isLiked: false,
      likeCount: 45,
      commentCount: 45,
      viewCount: 45,
      comments: [],
      likedUsers: [],
      viewers: [],
    },
    3: {
      isLiked: false,
      likeCount: 45,
      commentCount: 45,
      viewCount: 45,
      comments: [],
      likedUsers: [],
      viewers: [],
    },
    4: {
      isLiked: false,
      likeCount: 45,
      commentCount: 45,
      viewCount: 45,
      comments: [],
      likedUsers: [],
      viewers: [],
    },
  });

  const [selectedPostId, setSelectedPostId] = React.useState<number | null>(null);
  const [likedUsersModalVisible, setLikedUsersModalVisible] = React.useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = React.useState(false);
  const [viewersModalVisible, setViewersModalVisible] = React.useState(false);
  const [replyModalVisible, setReplyModalVisible] = React.useState(false);
  const [selectedComment, setSelectedComment] = React.useState<Comment | null>(null);
  const [replyText, setReplyText] = React.useState('');

  const handleLike = (postId: number, e: any) => {
    e.stopPropagation();
    setPostStates((prev) => {
      const post = prev[postId];
      const newIsLiked = !post.isLiked;
      return {
        ...prev,
        [postId]: {
          ...post,
          isLiked: newIsLiked,
          likeCount: newIsLiked ? post.likeCount + 1 : post.likeCount - 1,
        },
      };
    });
  };

  const handleShowLikedUsers = (postId: number, e: any) => {
    e.stopPropagation();
    setSelectedPostId(postId);
    setLikedUsersModalVisible(true);
  };

  const handleShowComments = (postId: number, e: any) => {
    e.stopPropagation();
    setSelectedPostId(postId);
    setCommentsModalVisible(true);
  };

  const handleShowViewers = (postId: number, e: any) => {
    e.stopPropagation();
    setSelectedPostId(postId);
    setViewersModalVisible(true);
  };

  const handleReply = (comment: Comment) => {
    setSelectedComment(comment);
    setReplyModalVisible(true);
  };

  const handleSendReply = () => {
    if (selectedPostId && selectedComment && replyText.trim()) {
      const newReply: Comment = {
        id: `reply-${Date.now()}`,
        name: 'Victor Drason', // Creator's name
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }),
        comment: replyText.trim(),
      };

      setPostStates((prev) => {
        const post = prev[selectedPostId];
        const updatedComments = post.comments.map((comment) =>
          comment.id === selectedComment.id
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        );
        return {
          ...prev,
          [selectedPostId]: {
            ...post,
            comments: updatedComments,
            commentCount: post.commentCount + 1,
          },
        };
      });

      setReplyText('');
      setReplyModalVisible(false);
      setSelectedComment(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>DASHBOARD</Text>
        <TouchableOpacity onPress={() => router.push('/(user)/notifications')}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Earnings Card */}
          <View style={{ backgroundColor: colors.brand, borderRadius: 12, padding: spacing.lg, marginBottom: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="bag-outline" size={32} color="#0F0F0F" style={{ marginRight: spacing.md }} />
              <View>
                <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: '#0F0F0F' }}>$78k</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#0F0F0F' }}>Accepted here</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={20} color="#0F0F0F" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#0F0F0F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Views Card */}
          <View style={{ backgroundColor: colors.text, borderRadius: 12, padding: spacing.lg, marginBottom: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                <Ionicons name="eye-outline" size={24} color="white" />
              </View>
              <View>
                <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: 'white' }}>57k Total Video views</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Ongoing Section */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Ongoing</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>View more</Text>
                <Ionicons name="chevron-down" size={16} color={colors.brand} />
              </TouchableOpacity>
            </View>

            {/* Ongoing Post Card */}
            <TouchableOpacity
              onPress={() => router.push('/(creator)/content-detail')}
              style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.semibold, flex: 1 }}>Nike Camouflage Joggers</Text>
                <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext }}>4:13 Mins</Text>
                  <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext }}>13/15/2023</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#FFF5E6', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8 }}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#E6A800' }}>In review</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Latest Uploads Section */}
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Latest Uploads</Text>
              <TouchableOpacity style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Last 25 days</Text>
              </TouchableOpacity>
            </View>

            {/* Latest Uploads List */}
            {[1, 2, 3, 4].map((item) => {
              const post = postStates[item];
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => router.push('/(creator)/content-detail')}
                  style={{ flexDirection: 'row', marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md }}
                >
                  <View style={{ width: 120, height: 80, backgroundColor: colors.border, borderRadius: 8, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="play-circle" size={32} color={colors.subtext} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>
                      Getting 1000lb offloads in 6 days & Cat.
                    </Text>
                    <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.xs }}>
                      4 hours ago
                    </Text>
                    <View style={{ flexDirection: 'row', gap: spacing.md }}>
                      <TouchableOpacity
                        onPress={(e) => handleShowViewers(item, e)}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                      >
                        <Ionicons name="eye-outline" size={16} color={colors.subtext} />
                        <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{post.viewCount}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          const newIsLiked = !post.isLiked;
                          setPostStates((prev) => {
                            const updatedPost = {
                              ...prev[item],
                              isLiked: newIsLiked,
                              likeCount: newIsLiked ? prev[item].likeCount + 1 : prev[item].likeCount - 1,
                            };
                            return { ...prev, [item]: updatedPost };
                          });
                          // Show liked users modal if there are liked users
                          if (post.likedUsers.length > 0) {
                            setSelectedPostId(item);
                            setLikedUsersModalVisible(true);
                          }
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                      >
                        <Ionicons name={post.isLiked ? 'heart' : 'heart-outline'} size={16} color={post.isLiked ? colors.brand : colors.subtext} />
                        <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{post.likeCount}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={(e) => handleShowComments(item, e)}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                      >
                        <Ionicons name="chatbubble-outline" size={16} color={colors.subtext} />
                        <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{post.commentCount}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={async (e) => {
                          e.stopPropagation();
                          try {
                            await Share.share({
                              message: 'Check out this amazing fitness post on FitApp!',
                              title: 'Share Post',
                            });
                          } catch (error) {
                            console.error('Error sharing:', error);
                          }
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
                      >
                        <Ionicons name="share-outline" size={16} color={colors.subtext} />
                        <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>45</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="dashboard" />

      {/* Liked Users Modal */}
      <Modal
        visible={likedUsersModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLikedUsersModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setLikedUsersModalVisible(false)}
          />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl, maxHeight: '80%' }}>
            <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
            </View>
            <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
              <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: colors.text }}>Liked by</Text>
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              {selectedPostId && postStates[selectedPostId]?.likedUsers.length > 0 ? (
                <View style={{ paddingHorizontal: spacing.lg }}>
                  {postStates[selectedPostId].likedUsers.map((user) => (
                    <View key={user.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                        <Text style={{ fontSize: 20 }}>👤</Text>
                      </View>
                      <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text, flex: 1 }}>{user.name}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{ padding: spacing.xl, alignItems: 'center' }}>
                  <Ionicons name="heart-outline" size={48} color={colors.subtext} />
                  <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.md }}>No likes yet</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Comments Modal */}
      <Modal
        visible={commentsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentsModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
          <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
            <TouchableOpacity
              onPress={() => setCommentsModalVisible(false)}
              style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }}
            />
          </View>
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: colors.text }}>Comments</Text>
          </View>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {selectedPostId && postStates[selectedPostId]?.comments.length > 0 ? (
              <View style={{ padding: spacing.lg }}>
                {postStates[selectedPostId].comments.map((comment) => (
                  <View key={comment.id}>
                    <View style={{ flexDirection: 'row', marginBottom: (comment.replies && comment.replies.length > 0) ? spacing.md : spacing.xl }}>
                      <View style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                        <Text style={{ fontSize: 24 }}>👤</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                          <Text style={{ fontSize: 16, fontFamily: fonts.semibold, color: colors.text, marginRight: spacing.sm }}>{comment.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                          <Ionicons name="time-outline" size={16} color="#656565" />
                          <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#656565', marginLeft: spacing.xs }}>
                            {comment.date}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#656565', marginBottom: spacing.xs, lineHeight: 20 }}>
                          {comment.comment}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleReply(comment)}
                          style={{ borderBottomWidth: 1, borderBottomColor: colors.text, alignSelf: 'flex-start', paddingBottom: 2 }}
                        >
                          <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: '#292929' }}>Reply</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {comment.replies && comment.replies.length > 0 && (
                      <View style={{ marginLeft: spacing.lg + 56, marginBottom: spacing.xl }}>
                        {comment.replies.map((reply) => (
                          <View key={reply.id} style={{ flexDirection: 'row', marginBottom: spacing.lg }}>
                            <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: '#FF0000', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                              <Text style={{ fontSize: 20, color: 'white', fontFamily: fonts.bold }}>A</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                                <Text style={{ fontSize: 16, fontFamily: fonts.semibold, color: colors.text, marginRight: spacing.sm }}>{reply.name}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                                <Ionicons name="time-outline" size={16} color="#656565" />
                                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#656565', marginLeft: spacing.xs }}>
                                  {reply.date}
                                </Text>
                              </View>
                              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#656565', marginBottom: spacing.xs, lineHeight: 20 }}>
                                {reply.comment}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View style={{ padding: spacing.xl, alignItems: 'center' }}>
                <Ionicons name="chatbubble-outline" size={48} color={colors.subtext} />
                <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.md }}>No comments yet</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Viewers Modal */}
      <Modal
        visible={viewersModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setViewersModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setViewersModalVisible(false)}
          />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl, maxHeight: '80%' }}>
            <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
            </View>
            <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
              <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: colors.text }}>Viewers</Text>
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              {selectedPostId && postStates[selectedPostId]?.viewers.length > 0 ? (
                <View style={{ paddingHorizontal: spacing.lg }}>
                  {postStates[selectedPostId].viewers.map((viewer) => (
                    <View key={viewer.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                        <Text style={{ fontSize: 20 }}>👤</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text }}>{viewer.name}</Text>
                        <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>{viewer.viewedAt}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{ padding: spacing.xl, alignItems: 'center' }}>
                  <Ionicons name="eye-outline" size={48} color={colors.subtext} />
                  <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.md }}>No viewers yet</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Reply Modal */}
      <Modal visible={replyModalVisible} transparent animationType="slide" onRequestClose={() => setReplyModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setReplyModalVisible(false)}
            />
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: spacing.xl }}>
              <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
              </View>
              <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
                <Text style={{ fontSize: 18, fontFamily: fonts.bold, color: colors.text, marginBottom: spacing.xs }}>
                  Add a Comment
                </Text>
                <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 16, alignSelf: 'flex-start' }}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>
                    Comment on {selectedComment?.name}'s Post
                  </Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
                <TextInput
                  placeholder="Enter Comment"
                  placeholderTextColor={colors.subtext}
                  value={replyText}
                  onChangeText={setReplyText}
                  multiline
                  numberOfLines={4}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 12,
                    padding: spacing.md,
                    fontSize: 14,
                    fontFamily: fonts.regular,
                    color: colors.text,
                    minHeight: 100,
                    textAlignVertical: 'top',
                  }}
                />
              </View>
              <View style={{ paddingHorizontal: spacing.lg }}>
                <TouchableOpacity
                  onPress={handleSendReply}
                  disabled={!replyText.trim()}
                  style={{
                    backgroundColor: replyText.trim() ? colors.brand : colors.border,
                    paddingVertical: spacing.md,
                    borderRadius: 12,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16, fontFamily: fonts.semibold, color: replyText.trim() ? '#0F0F0F' : colors.subtext }}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

