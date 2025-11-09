import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';
import { useUserProfile } from '../../contexts/UserProfileContext';

export default function CreatorProfile() {
  const { profile } = useUserProfile();
  const [menuVisible, setMenuVisible] = React.useState(false);

  // Get display name from profile or use defaults
  const displayName = profile 
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.username || 'User'
    : 'User';
  
  const displayBio = profile?.bio || 'Enthusiast about exercise, health fitness and recreation';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>PROFILE</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg, alignItems: 'center' }}>
          <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontSize: 48 }}>👤</Text>
          </View>
          <Text style={{ fontSize: 24, fontFamily: fonts.bold, marginBottom: spacing.xs }}>{displayName}</Text>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, textAlign: 'center', marginBottom: spacing.lg }}>
            {displayBio}
          </Text>
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="profile" />
    </SafeAreaView>
  );
}

