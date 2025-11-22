import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

interface SupportHelpProps {
  visible: boolean;
  onClose: () => void;
}

export default function SupportHelp({ visible, onClose }: SupportHelpProps) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Support & Help</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ padding: spacing.lg }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.subtext, textAlign: 'center', marginTop: spacing.xl }}>
              Help Center content will be displayed here
            </Text>
            <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.subtext, textAlign: 'center', marginTop: spacing.md }}>
              FAQs and support resources coming soon
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

