import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';
import FitnessGoalModal from './fitness-goal-modal';

interface EditProfileProps {
  visible: boolean;
  onClose: () => void;
}

const fitnessGoals = ['Weight Loss', 'Full Body', 'Running', 'Weight lift'];

export default function EditProfile({ visible, onClose }: EditProfileProps) {
  const { profile, updateProfile } = useUserProfile();
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [headlines, setHeadlines] = useState(profile?.headlines || '');
  const [fitnessGoal, setFitnessGoal] = useState(profile?.fitnessGoal || 'Weight Loss');
  const [fitnessGoalModalVisible, setFitnessGoalModalVisible] = useState(false);
  const [linkedin, setLinkedin] = useState(profile?.linkedin || '');
  const [instagram, setInstagram] = useState(profile?.instagram || '');
  const [youtube, setYoutube] = useState(profile?.youtube || '');
  const [tiktok, setTiktok] = useState(profile?.tiktok || '');

  const handleSave = async () => {
    await updateProfile({
      firstName,
      lastName,
      headlines,
      fitnessGoal,
      linkedin,
      instagram,
      youtube,
      tiktok,
    });
    onClose();
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Edit Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: spacing.lg }}>
              {/* First Name */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs, marginTop: spacing.md }}>First name</Text>
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
                }}
                placeholder="Enter first name"
              />

              {/* Last Name */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Last Name</Text>
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
                }}
                placeholder="Enter last name"
              />

              {/* Headlines */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Headlines</Text>
              <TextInput
                value={headlines}
                onChangeText={setHeadlines}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: spacing.md,
                  fontFamily: fonts.regular,
                  fontSize: 16,
                  marginBottom: spacing.md,
                }}
                placeholder="Enter Headlines"
                multiline
              />

              {/* Fitness Goal */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Fitness Goal</Text>
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
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: fitnessGoal ? colors.text : colors.subtext }}>
                  {fitnessGoal || 'Select Fitness Goal'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={colors.subtext} />
              </TouchableOpacity>

              {/* Social Links */}
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs, marginTop: spacing.md }}>Social Links</Text>
              
              {/* LinkedIn */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#0077B5', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <Ionicons name="logo-linkedin" size={20} color="white" />
                </View>
                <TextInput
                  value={linkedin}
                  onChangeText={setLinkedin}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: spacing.md,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                  }}
                  placeholder="Paste link here"
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
                  }}
                  placeholder="Paste link here"
                />
              </View>

              {/* YouTube */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FF0000', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <Ionicons name="logo-youtube" size={20} color="white" />
                </View>
                <TextInput
                  value={youtube}
                  onChangeText={setYoutube}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: spacing.md,
                    fontFamily: fonts.regular,
                    fontSize: 14,
                  }}
                  placeholder="Paste link here"
                />
              </View>

              {/* TikTok */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
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
                  }}
                  placeholder="Paste link here"
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

