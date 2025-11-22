import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { spacing, fonts } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { useTheme } from '../../hooks/useTheme';
import { useDarkMode } from '../../contexts/DarkModeContext';
import EditProfile from './edit-profile';
import PrivacySecurity from './privacy-security';
import WorkoutSettings from './workout-settings';
import SupportHelp from './support-help';

export default function UserProfile() {
  const { profile, updateProfile } = useUserProfile();
  const { colors, isDarkMode } = useTheme();
  const { toggleDarkMode } = useDarkMode();
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [privacySecurityVisible, setPrivacySecurityVisible] = useState(false);
  const [workoutSettingsVisible, setWorkoutSettingsVisible] = useState(false);
  const [supportHelpVisible, setSupportHelpVisible] = useState(false);
  const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(profile?.notifications ?? true);

  const displayName = profile 
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.username || 'User'
    : 'User';
  
  const displayBio = profile?.bio || 'Certified Trainer | Strength & Conditioning | Nutrition guidance | Lifestyle coaching.';

  const handleImageSource = async (source: 'gallery' | 'camera') => {
    setImageSourceModalVisible(false);
    try {
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      };

      let result;
      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets[0]) {
        // In a real app, you would upload the image and save the URL
        Alert.alert('Success', 'Profile picture updated');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  const handleDarkModeToggle = async (value: boolean) => {
    if (value !== isDarkMode) {
      await toggleDarkMode();
    }
  };

  const handleNotificationsToggle = (value: boolean) => {
    setNotifications(value);
    updateProfile({ notifications: value });
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: () => {
            // Clear profile and navigate to login
            router.replace('/(auth)/login');
          }
        },
      ]
    );
  };

  const settingsItems = [
    {
      id: 'my-profile',
      label: 'My Profile',
      description: 'Edit your account information',
      onPress: () => setEditProfileVisible(true),
    },
    {
      id: 'connect-devices',
      label: 'Connect Devices',
      description: 'Connect Apple watch, Fitbit, Garmin',
      onPress: () => Alert.alert('Coming Soon', 'Device connection feature coming soon'),
    },
    {
      id: 'subscription',
      label: 'Subscription & Billing',
      description: 'Edit your account information',
      onPress: () => Alert.alert('Coming Soon', 'Subscription management coming soon'),
    },
    {
      id: 'app-preference',
      label: 'App Preference',
      description: 'Theme, Notifications',
      onPress: () => Alert.alert('Coming Soon', 'App preferences coming soon'),
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      description: 'Theme, Notifications',
      onPress: () => setPrivacySecurityVisible(true),
    },
    {
      id: 'workout',
      label: 'Workout & Coaching Settings',
      description: 'Preferences, Set Workout goals',
      onPress: () => setWorkoutSettingsVisible(true),
    },
    {
      id: 'support',
      label: 'Support & Help',
      description: 'Help Center, FAQs',
      onPress: () => setSupportHelpVisible(true),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
            <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5, color: colors.text }}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Profile Picture and Info */}
          <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
            <TouchableOpacity onPress={() => setImageSourceModalVisible(true)}>
              <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md }}>
                <Text style={{ fontSize: 48 }}>👤</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, marginBottom: spacing.xs, color: colors.text }}>{displayName}</Text>
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, textAlign: 'center', marginBottom: spacing.lg, lineHeight: 20 }}>
              {displayBio}
            </Text>
            <TouchableOpacity
              onPress={() => setEditProfileVisible(true)}
              style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: 12 }}
            >
              <Text style={{ color: 'white', fontFamily: fonts.semibold, fontSize: 16 }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Social Links */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginBottom: spacing.xl }}>
            {profile?.tiktok && (
              <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-tiktok" size={20} color="white" />
              </TouchableOpacity>
            )}
            {profile?.instagram && (
              <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E4405F', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-instagram" size={20} color="white" />
              </TouchableOpacity>
            )}
            {profile?.facebook && (
              <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#1877F2', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-facebook" size={20} color="white" />
              </TouchableOpacity>
            )}
            {profile?.snapchat && (
              <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFC00', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-snapchat" size={20} color="#000000" />
              </TouchableOpacity>
            )}
          </View>

          {/* Account Settings */}
          <View style={{ marginBottom: spacing.lg }}>
            {settingsItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs, color: colors.text }}>{item.label}</Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Toggles */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs, color: colors.text }}>Dark Mode</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>Enable Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: colors.border, true: colors.brand }}
                thumbColor={isDarkMode ? 'white' : '#f4f3f4'}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs, color: colors.text }}>Notifications</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>Receive Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: colors.border, true: colors.brand }}
                thumbColor={notifications ? 'white' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: '#FF3B30',
              paddingVertical: spacing.md,
              borderRadius: 12,
              alignItems: 'center',
              marginTop: spacing.lg,
              marginBottom: spacing.xl,
            }}
          >
            <Text style={{ color: 'white', fontFamily: fonts.semibold, fontSize: 16 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Source Modal */}
      <Modal visible={imageSourceModalVisible} transparent animationType="slide" onRequestClose={() => setImageSourceModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
              <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: colors.text }}>Gallery</Text>
              <TouchableOpacity onPress={() => setImageSourceModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <TouchableOpacity
                onPress={() => handleImageSource('gallery')}
                style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.lg, borderRadius: 12, alignItems: 'center' }}
              >
                <Ionicons name="images-outline" size={32} color={colors.brand} />
                <Text style={{ fontFamily: fonts.semibold, marginTop: spacing.sm, color: colors.text }}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleImageSource('camera')}
                style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.lg, borderRadius: 12, alignItems: 'center' }}
              >
                <Ionicons name="camera-outline" size={32} color={colors.brand} />
                <Text style={{ fontFamily: fonts.semibold, marginTop: spacing.sm, color: colors.text }}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <EditProfile visible={editProfileVisible} onClose={() => setEditProfileVisible(false)} />

      {/* Privacy & Security Modal */}
      <PrivacySecurity visible={privacySecurityVisible} onClose={() => setPrivacySecurityVisible(false)} />

      {/* Workout Settings Modal */}
      <WorkoutSettings visible={workoutSettingsVisible} onClose={() => setWorkoutSettingsVisible(false)} />

      {/* Support & Help Modal */}
      <SupportHelp visible={supportHelpVisible} onClose={() => setSupportHelpVisible(false)} />
    </SafeAreaView>
  );
}
