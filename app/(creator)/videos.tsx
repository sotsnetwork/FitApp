import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function CreatorVideos() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [viewsFilterVisible, setViewsFilterVisible] = React.useState(false);
  const [timeFilterVisible, setTimeFilterVisible] = React.useState(false);
  const [selectedViewsFilter, setSelectedViewsFilter] = React.useState('Views');
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState('Last 28 Days');

  const videos = [
    { id: '1', title: 'Running that help...', views: '14k', likes: '4k', comments: '5k' },
    { id: '2', title: 'Running that help...', views: '14k', likes: '4k', comments: '5k' },
    { id: '3', title: 'Running that help...', views: '14k', likes: '4k', comments: '5k' },
    { id: '4', title: 'Running that help...', views: '14k', likes: '4k', comments: '5k' },
    { id: '5', title: 'Running that help...', views: '14k', likes: '4k', comments: '5k' },
    { id: '6', title: 'Running that help...', views: '14k', likes: '4k', comments: '5k' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>MY VIDEOS</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity onPress={() => router.push('/(creator)/upload-video')}>
            <Ionicons name="cloud-upload-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Filters */}
          <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg }}>
            <TouchableOpacity
              onPress={() => setViewsFilterVisible(true)}
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
            >
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>{selectedViewsFilter}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.subtext} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimeFilterVisible(true)}
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
            >
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>{selectedTimeFilter}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.subtext} />
            </TouchableOpacity>
          </View>

          {/* Latest Uploads */}
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Latest Uploads</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                onPress={() => router.push('/(creator)/content-detail')}
                style={{ width: '31%', marginBottom: spacing.lg }}
              >
                <View style={{ width: '100%', height: 140, backgroundColor: colors.border, borderRadius: 12, marginBottom: spacing.xs, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="play-circle" size={40} color={colors.subtext} />
                </View>
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.xs }} numberOfLines={1}>
                  {video.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Ionicons name="eye-outline" size={12} color={colors.subtext} />
                    <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext }}>{video.views}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Ionicons name="heart-outline" size={12} color={colors.subtext} />
                    <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext }}>{video.likes}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Ionicons name="chatbubble-outline" size={12} color={colors.subtext} />
                    <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext }}>{video.comments}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Views Filter Modal */}
      <Modal visible={viewsFilterVisible} transparent animationType="slide" onRequestClose={() => setViewsFilterVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setViewsFilterVisible(false)} />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
            <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
            </View>
            {['Views', 'Likes', 'Comments', 'Date'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setSelectedViewsFilter(filter);
                  setViewsFilterVisible(false);
                }}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{filter}</Text>
                {selectedViewsFilter === filter && (
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setViewsFilterVisible(false)}
              style={{ backgroundColor: colors.text, marginHorizontal: spacing.lg, marginTop: spacing.lg, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: 'white' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Filter Modal */}
      <Modal visible={timeFilterVisible} transparent animationType="slide" onRequestClose={() => setTimeFilterVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setTimeFilterVisible(false)} />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
            <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
            </View>
            {['Last 7 Days', 'Last 28 Days', 'Last 3 Months', 'All Time'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setSelectedTimeFilter(filter);
                  setTimeFilterVisible(false);
                }}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{filter}</Text>
                {selectedTimeFilter === filter && (
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setTimeFilterVisible(false)}
              style={{ backgroundColor: colors.text, marginHorizontal: spacing.lg, marginTop: spacing.lg, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: 'white' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="videos" />
    </SafeAreaView>
  );
}

