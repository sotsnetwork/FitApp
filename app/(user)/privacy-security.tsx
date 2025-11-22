import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';

interface PrivacySecurityProps {
  visible: boolean;
  onClose: () => void;
}

const hideProfileOptions = ['From Friends', 'Public', 'Private'];

export default function PrivacySecurity({ visible, onClose }: PrivacySecurityProps) {
  const { profile, updateProfile } = useUserProfile();
  const [hideProfileDropdownVisible, setHideProfileDropdownVisible] = useState(false);
  const hideProfile = profile?.hideProfile || 'From Friends';

  const handleHideProfileSelect = (option: string) => {
    updateProfile({ hideProfile: option });
    setHideProfileDropdownVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Privacy & Security</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ padding: spacing.lg }}>
            {/* Change Password */}
            <TouchableOpacity
              onPress={() => {}}
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
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Change Password</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>********</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
            </TouchableOpacity>

            {/* Change Email */}
            <TouchableOpacity
              onPress={() => {}}
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
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Change Email</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>
                  {profile?.email ? profile.email.replace(/(.{2})(.*)(@.*)/, '$1******$3') : 'ja******@com'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
            </TouchableOpacity>

            {/* Hide Profile */}
            <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.sm }}>Hide Profile</Text>
              <TouchableOpacity
                onPress={() => setHideProfileDropdownVisible(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: spacing.md,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{hideProfile}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.subtext} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Hide Profile Dropdown Modal */}
        <Modal visible={hideProfileDropdownVisible} transparent animationType="fade" onRequestClose={() => setHideProfileDropdownVisible(false)}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setHideProfileDropdownVisible(false)}
          >
            <View style={{ backgroundColor: 'white', margin: spacing.lg, borderRadius: 12, padding: spacing.md }}>
              {hideProfileOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleHideProfileSelect(option)}
                  style={{
                    paddingVertical: spacing.md,
                    borderBottomWidth: hideProfileOptions.indexOf(option) < hideProfileOptions.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
}

