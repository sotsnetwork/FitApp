import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function ContentDetail() {
  const [commentsModalVisible, setCommentsModalVisible] = React.useState(false);

  const comments = [
    { id: '1', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it' },
    { id: '2', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it' },
    { id: '3', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it' },
    { id: '4', name: 'Alfredo', date: '5th February,2023 3PM', comment: 'Amazing place and experience! We had a great time. The kids loved it' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Post Image */}
          <View style={{ width: '100%', height: 200, backgroundColor: colors.border, borderRadius: 12, marginBottom: spacing.lg, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="image-outline" size={64} color={colors.subtext} />
          </View>

          {/* Post Title and Date */}
          <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text, marginBottom: spacing.md, lineHeight: 24 }}>
            Lorem ipsum dolor sit amet consectetur. Sagittis dictum sit a.
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>13/15/2023</Text>
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.subtext, marginHorizontal: spacing.sm }} />
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>Published</Text>
          </View>

          {/* Post Performance */}
          <View style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.lg, marginBottom: spacing.lg }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.md }}>Post Performance</Text>
            <View style={{ gap: spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Views</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.bold, color: colors.text }}>100k</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Average Percentage viewed</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.bold, color: colors.text }}>25%</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Likes</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.bold, color: colors.text }}>12k</Text>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Comments</Text>
              <TouchableOpacity onPress={() => setCommentsModalVisible(true)}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>View all</Text>
              </TouchableOpacity>
            </View>

            {/* First Comment */}
            <View style={{ flexDirection: 'row', marginBottom: spacing.md }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                <Text style={{ fontSize: 24 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: colors.text, marginRight: spacing.sm }}>Alfredo</Text>
                  <Ionicons name="time-outline" size={14} color={colors.subtext} />
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginLeft: spacing.xs }}>
                    5th February,2023 3PM
                  </Text>
                </View>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text, marginBottom: spacing.xs, lineHeight: 20 }}>
                  Amazing place and experience! We had a great time. The kids loved it
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.brand }}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Comments Modal */}
      <Modal visible={commentsModalVisible} transparent animationType="slide" onRequestClose={() => setCommentsModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 1, marginTop: 100 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Comments</Text>
              <TouchableOpacity onPress={() => setCommentsModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View style={{ padding: spacing.lg }}>
                {comments.map((comment) => (
                  <View key={comment.id} style={{ flexDirection: 'row', marginBottom: spacing.lg }}>
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                      <Text style={{ fontSize: 20 }}>👤</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                        <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: colors.text, marginRight: spacing.sm }}>{comment.name}</Text>
                        <Ionicons name="time-outline" size={14} color={colors.subtext} />
                        <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginLeft: spacing.xs }}>
                          {comment.date}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text, marginBottom: spacing.xs, lineHeight: 20 }}>
                        {comment.comment}
                      </Text>
                      <TouchableOpacity>
                        <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.brand }}>Reply</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

