import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';

export default function UserProfile() {
  const { profile } = useUserProfile();
  const [selectedMenu, setSelectedMenu] = React.useState('Home');

  // Get display name from profile or use defaults
  const displayName = profile 
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.username || 'User'
    : 'User';
  
  const displayBio = profile?.bio || 'Enthusiast about exercise, health fitness and recreation';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={{ padding: spacing.lg, paddingTop: spacing.xl }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          {/* Profile Image */}
          <View style={{ alignItems: 'flex-start', marginBottom: spacing.md }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: spacing.sm }}>
              <Text style={{ fontSize: 40 }}>👤</Text>
            </View>
            
            {/* Name */}
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.text, marginBottom: spacing.xs }}>
              {displayName}
            </Text>
            
            {/* Bio */}
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, lineHeight: 20 }}>
              {displayBio}
            </Text>
          </View>
        </View>

        {/* Navigation Menu */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
          {/* Home */}
          <TouchableOpacity
            onPress={() => {
              setSelectedMenu('Home');
              router.push('/(user)/home');
            }}
            style={{
              backgroundColor: selectedMenu === 'Home' ? '#F5F5F5' : 'transparent',
              borderRadius: 12,
              padding: spacing.md,
              marginBottom: spacing.sm,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Home</Text>
          </TouchableOpacity>

          {/* Bookmarked */}
          <TouchableOpacity
            onPress={() => {
              setSelectedMenu('Bookmarked');
              router.push('/(user)/saved-videos');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.md,
              marginBottom: spacing.sm,
            }}
          >
            <Ionicons name="bookmark-outline" size={24} color={colors.text} style={{ marginRight: spacing.md }} />
            <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Bookmarked</Text>
          </TouchableOpacity>

          {/* Shopping Cart */}
          <TouchableOpacity
            onPress={() => {
              setSelectedMenu('Shopping Cart');
              router.push('/(user)/shop');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.md,
              marginBottom: spacing.sm,
            }}
          >
            <Ionicons name="bag-outline" size={24} color={colors.text} style={{ marginRight: spacing.md }} />
            <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Shopping Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

