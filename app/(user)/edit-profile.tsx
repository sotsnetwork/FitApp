import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { useTheme } from '../../hooks/useTheme';
import FitnessGoalModal from './fitness-goal-modal';

interface EditProfileProps {
  visible: boolean;
  onClose: () => void;
}

const fitnessGoals = ['Weight Loss', 'Full Body', 'Running', 'Weight lift'];

export default function EditProfile({ visible, onClose }: EditProfileProps) {
  const { profile, updateProfile } = useUserProfile();
  const { colors } = useTheme();
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [fitnessGoal, setFitnessGoal] = useState(profile?.fitnessGoal || 'Weight Loss');
  const [fitnessGoalModalVisible, setFitnessGoalModalVisible] = useState(false);
  const [tiktok, setTiktok] = useState(profile?.tiktok || '');
  const [instagram, setInstagram] = useState(profile?.instagram || '');
  const [facebook, setFacebook] = useState(profile?.facebook || '');
  const [snapchat, setSnapchat] = useState(profile?.snapchat || '');

  const handleSave = async () => {
    await updateProfile({
      firstName,
      lastName,
      bio,
      fitnessGoal,
      tiktok,
      instagram,
      facebook,
      snapchat,
    });
    onClose();
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: colors.text }}>Edit Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: spacing.lg }}>
              {/* First Name */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs, marginTop: spacing.md, color: colors.text }}>First name</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: spacing.md,
                  fontFamily: fonts.regular,
                  fontSize: 16,
                  marginBottom: spacing.md,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
                placeholder="Enter first name"
                placeholderTextColor={colors.subtext}
              />

              {/* Last Name */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs, color: colors.text }}>Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: spacing.md,
                  fontFamily: fonts.regular,
                  fontSize: 16,
                  marginBottom: spacing.md,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
                placeholder="Enter last name"
                placeholderTextColor={colors.subtext}
              />

              {/* Bio */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs, color: colors.text }}>Headlines</Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: spacing.md,
                  fontFamily: fonts.regular,
                  fontSize: 16,
                  marginBottom: spacing.md,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
                placeholder="Enter Headlines"
                placeholderTextColor={colors.subtext}
                multiline
              />

              {/* Fitness Goal */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs, color: colors.text }}>Fitness Goal</Text>
              <TouchableOpacity
                onPress={() => setFitnessGoalModalVisible(true)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: spacing.md,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: spacing.md,
                  backgroundColor: colors.background,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: fitnessGoal ? colors.text : colors.subtext }}>
                  {fitnessGoal || 'Select Fitness Goal'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={colors.subtext} />
              </TouchableOpacity>

              {/* Social Links */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs, marginTop: spacing.md, color: colors.text }}>Social Links</Text>
              
              {/* TikTok */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <Ionicons name="logo-tiktok" size={20} color="white" />
                </View>
                <TextInput
                  value={tiktok}
                  onChangeText={setTiktok}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: spacing.md,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                    backgroundColor: colors.background,
                    color: colors.text,
                  }}
                  placeholder="Paste link here"
                  placeholderTextColor={colors.subtext}
                />
              </View>

              {/* Instagram */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E4405F', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <Ionicons name="logo-instagram" size={20} color="white" />
                </View>
                <TextInput
                  value={instagram}
                  onChangeText={setInstagram}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: spacing.md,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                    backgroundColor: colors.background,
                    color: colors.text,
                  }}
                  placeholder="Paste link here"
                  placeholderTextColor={colors.subtext}
                />
              </View>

              {/* Facebook */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#1877F2', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <Ionicons name="logo-facebook" size={20} color="white" />
                </View>
                <TextInput
                  value={facebook}
                  onChangeText={setFacebook}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: spacing.md,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                    backgroundColor: colors.background,
                    color: colors.text,
                  }}
                  placeholder="Paste link here"
                  placeholderTextColor={colors.subtext}
                />
              </View>

              {/* Snapchat */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFC00', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <Ionicons name="logo-snapchat" size={20} color="#000000" />
                </View>
                <TextInput
                  value={snapchat}
                  onChangeText={setSnapchat}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: spacing.md,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                    backgroundColor: colors.background,
                    color: colors.text,
                  }}
                  placeholder="Paste link here"
                  placeholderTextColor={colors.subtext}
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  backgroundColor: colors.brand,
                  paddingVertical: spacing.md,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginTop: spacing.lg,
                  marginBottom: spacing.xl,
                }}
              >
                <Text style={{ color: 'white', fontFamily: fonts.semibold, fontSize: 16 }}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <FitnessGoalModal
        visible={fitnessGoalModalVisible}
        onClose={() => setFitnessGoalModalVisible(false)}
        selectedGoal={fitnessGoal}
        onSelect={(goal) => {
          setFitnessGoal(goal);
          setFitnessGoalModalVisible(false);
        }}
      />
    </>
  );
}

