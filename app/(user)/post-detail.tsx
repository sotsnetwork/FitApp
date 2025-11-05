import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function PostDetail() {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(12);
  const [commentCount, setCommentCount] = React.useState(3);
  const [shareCount, setShareCount] = React.useState(12000);
  const [commentModalVisible, setCommentModalVisible] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    setCommentModalVisible(true);
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      setCommentCount(commentCount + 1);
      setCommentText('');
      setCommentModalVisible(false);
    }
  };

  const handleShare = () => {
    // Share functionality - can be implemented with Linking or Share API
    // For now, just show a placeholder
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Post Video/Image - Full Screen */}
      <View style={{ flex: 1, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="play" size={32} color="white" />
        </View>
      </View>

      {/* Top Overlay - Close Button and Engagement Metrics */}
      <View style={{ position: 'absolute', top: spacing.lg, left: spacing.lg, zIndex: 1000, pointerEvents: 'box-none' }}>
        {/* Close Button */}
        <TouchableOpacity
          onPress={() => {
            console.log('Close button pressed');
            router.back();
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.md,
            zIndex: 1001,
          }}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>

        {/* Engagement Metrics - Aligned to Left */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? colors.brand : 'white'} />
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: 'white' }}>{likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Ionicons name="chatbubble-outline" size={20} color="white" />
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: 'white' }}>{commentCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Ionicons name="share-outline" size={20} color="white" />
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: 'white' }}>{formatCount(shareCount)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Bar - Dark with Comment Input and Engagement Metrics */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
        }}
      >
        {/* Engagement Metrics on Left */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? colors.brand : 'white'} />
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: 'white' }}>{likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Ionicons name="chatbubble-outline" size={20} color="white" />
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: 'white' }}>{commentCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Ionicons name="share-outline" size={20} color="white" />
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: 'white' }}>{formatCount(shareCount)}</Text>
          </TouchableOpacity>
        </View>

        {/* Comment Input Field */}
        <TouchableOpacity
          onPress={() => setCommentModalVisible(true)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 20,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
          }}
        >
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Send comment...</Text>
        </TouchableOpacity>
      </View>

      {/* Comment Modal */}
      <Modal
        visible={commentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setCommentModalVisible(false)}
            />
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }}>
              {/* Handle/Grabber */}
              <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
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
              <Text style={{ fontSize: 24, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>
                Add a Comment
              </Text>

              {/* Contextual Tag */}
              <View
                style={{
                  backgroundColor: '#F5F5F5',
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                  alignSelf: 'flex-start',
                  marginBottom: spacing.md,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.text }}>
                  Comment on Debbie Annie's Post
                </Text>
              </View>

              {/* Comment Input */}
              <TextInput
                placeholder="Enter Comment"
                value={commentText}
                onChangeText={setCommentText}
                multiline
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  padding: spacing.md,
                  minHeight: 120,
                  fontFamily: fonts.regular,
                  fontSize: 14,
                  textAlignVertical: 'top',
                  marginBottom: spacing.md,
                }}
              />

              {/* Send Button */}
              <TouchableOpacity
                onPress={handleSendComment}
                style={{
                  backgroundColor: colors.brand,
                  paddingVertical: spacing.md,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: '#0F0F0F' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

