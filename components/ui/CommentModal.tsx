import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, fonts, colors } from '../../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  postAuthor?: string;
  onSubmit?: (comment: string) => void;
};

export default function CommentModal({ visible, onClose, postAuthor = "Debbie Annie", onSubmit }: Props) {
  const [comment, setComment] = React.useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit?.(comment.trim());
      setComment('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }}>
              {/* Grabber */}
              <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
                <View style={{ width: 40, height: 4, backgroundColor: colors.border, borderRadius: 2 }} />
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
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  marginBottom: spacing.md,
                  alignSelf: 'flex-start',
                }}
              >
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>
                  Comment on {postAuthor}'s Post
                </Text>
              </View>

              {/* Comment Input Field */}
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Enter Comment"
                placeholderTextColor={colors.subtext}
                multiline
                numberOfLines={6}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  padding: spacing.md,
                  fontFamily: fonts.regular,
                  fontSize: 14,
                  color: colors.text,
                  textAlignVertical: 'top',
                  minHeight: 120,
                  marginBottom: spacing.lg,
                }}
              />

              {/* Send Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!comment.trim()}
                style={{
                  backgroundColor: colors.brand,
                  paddingVertical: spacing.md,
                  borderRadius: 12,
                  alignItems: 'center',
                  opacity: comment.trim() ? 1 : 0.5,
                }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: '#0F0F0F' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

