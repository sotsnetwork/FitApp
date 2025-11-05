import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function CreatorAnalytics() {
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
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>ANALYTICS</Text>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Analytics Overview</Text>
          <View style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.lg, marginBottom: spacing.md }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Total Views</Text>
            <Text style={{ fontSize: 32, fontFamily: fonts.bold, color: colors.brand }}>57k</Text>
          </View>
          <View style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.lg, marginBottom: spacing.md }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Total Likes</Text>
            <Text style={{ fontSize: 32, fontFamily: fonts.bold, color: colors.brand }}>12k</Text>
          </View>
          <View style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.lg }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Total Comments</Text>
            <Text style={{ fontSize: 32, fontFamily: fonts.bold, color: colors.brand }}>3k</Text>
          </View>
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="analytics" />
    </SafeAreaView>
  );
}

