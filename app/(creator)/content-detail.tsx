import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

interface Comment {
  id: string;
  name: string;
  date: string;
  comment: string;
  replies?: Comment[];
}

export default function ContentDetail() {
  const [commentsModalVisible, setCommentsModalVisible] = React.useState(false);
  const [replyModalVisible, setReplyModalVisible] = React.useState(false);
  const [selectedComment, setSelectedComment] = React.useState<Comment | null>(null);
  const [replyText, setReplyText] = React.useState('');
  const [comments, setComments] = React.useState<Comment[]>([
    { id: '1', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it.', replies: [] },
    { id: '2', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it.', replies: [] },
    { id: '3', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it.', replies: [] },
    { id: '4', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it.', replies: [] },
  ]);

  const handleReply = (comment: Comment) => {
    setSelectedComment(comment);
    setReplyModalVisible(true);
  };

  const handleSendReply = () => {
    if (selectedComment && replyText.trim()) {
      const newReply: Comment = {
        id: `reply-${Date.now()}`,
        name: 'Victor Drason', // Creator's name
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }),
        comment: replyText.trim(),
      };

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === selectedComment.id
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        )
      );

      setReplyText('');
      setReplyModalVisible(false);
      setSelectedComment(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Share.share({
                  message: 'Check out this amazing fitness video on FitApp!',
                  title: 'Share Video',
                });
              } catch (error) {
                console.error('Error sharing:', error);
              }
            }}
          >
            <Ionicons name="share-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Handle edit post functionality
              // TODO: Navigate to edit post screen or open edit modal
            }}
          >
            <Ionicons name="pencil-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Video Image */}
          <View style={{ width: '100%', height: 185, backgroundColor: colors.border, borderRadius: 18, marginBottom: spacing.lg, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="play-circle" size={64} color={colors.subtext} />
          </View>

          {/* Video Title and Date */}
          <Text style={{ fontSize: 22, fontFamily: fonts.semibold, color: colors.text, marginBottom: spacing.sm, lineHeight: 28 }}>
            Lorem ipsum dolor sit amet consectetur. Sagittis dictum sit a.
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg, backgroundColor: colors.brand, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 16, alignSelf: 'flex-start' }}>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#0F0F0F' }}>13/15/2023</Text>
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#0F0F0F', marginHorizontal: spacing.sm }} />
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#0F0F0F' }}>Published</Text>
          </View>

          {/* Post Performance */}
          <View style={{ backgroundColor: 'white', borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: spacing.lg, marginBottom: spacing.lg }}>
            <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: colors.text, marginBottom: spacing.md }}>Post Performance</Text>
            <View style={{ gap: spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Views</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>100k</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Average Percentage viewed</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>25%</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Likes</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>12k</Text>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View style={{ backgroundColor: 'white', borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: spacing.lg, marginBottom: spacing.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: colors.text }}>Comments</Text>
              <TouchableOpacity
                onPress={() => setCommentsModalVisible(true)}
                style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 6 }}
              >
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>View all</Text>
              </TouchableOpacity>
            </View>

            {/* First Comment */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                <Text style={{ fontSize: 24 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                  <Text style={{ fontSize: 16, fontFamily: fonts.semibold, color: colors.text, marginRight: spacing.sm }}>Alfredo</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                  <Ionicons name="time-outline" size={16} color="#656565" />
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#656565', marginLeft: spacing.xs }}>
                    5th February,2023 3PM
                  </Text>
                </View>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#656565', marginBottom: spacing.xs, lineHeight: 20 }}>
                  Amazing place and experience! We had a great time. The kids loved it.
                </Text>
                <TouchableOpacity
                  onPress={() => handleReply({ id: '1', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it.' })}
                  style={{ borderBottomWidth: 1, borderBottomColor: colors.text, alignSelf: 'flex-start', paddingBottom: 2 }}
                >
                  <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: '#292929' }}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Comments Modal */}
      <Modal visible={commentsModalVisible} transparent animationType="slide" onRequestClose={() => setCommentsModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
          {/* Close Handle */}
          <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
            <TouchableOpacity
              onPress={() => setCommentsModalVisible(false)}
              style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }}
            />
          </View>

          {/* Comments List */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: spacing.lg }}>
              {comments.map((comment, index) => (
                <View key={comment.id}>
                  {/* Main Comment */}
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

                  {/* Replies */}
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
                            <TouchableOpacity
                              onPress={() => handleReply(comment)}
                              style={{ borderBottomWidth: 1, borderBottomColor: colors.text, alignSelf: 'flex-start', paddingBottom: 2 }}
                            >
                              <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: '#292929' }}>Reply</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
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
              {/* Close Handle */}
              <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
              </View>

              {/* Header */}
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

              {/* Comment Input */}
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

              {/* Send Button */}
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

