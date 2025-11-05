import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function CreatorVideos() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>VIDEOS</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Your Videos</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[1, 2, 3, 4, 5, 6].map((video) => (
              <TouchableOpacity
                key={video}
                onPress={() => router.push('/(creator)/content-detail')}
                style={{ width: '48%', marginBottom: spacing.md }}
              >
                <View style={{ width: '100%', height: 150, backgroundColor: colors.border, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs }}>
                  <Ionicons name="play-circle" size={40} color={colors.subtext} />
                </View>
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>Video {video}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="videos" />
    </SafeAreaView>
  );
}

