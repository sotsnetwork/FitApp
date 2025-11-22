import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

interface FitnessGoalModalProps {
  visible: boolean;
  onClose: () => void;
  selectedGoal: string;
  onSelect: (goal: string) => void;
}

const fitnessGoals = ['Weight Loss', 'Full Body', 'Running', 'Weight lift'];

export default function FitnessGoalModal({ visible, onClose, selectedGoal, onSelect }: FitnessGoalModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Fitness Goal</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={{ padding: spacing.lg }}>
            {fitnessGoals.map((goal) => (
              <TouchableOpacity
                key={goal}
                onPress={() => onSelect(goal)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{goal}</Text>
                {selectedGoal === goal && (
                  <Ionicons name="checkmark" size={20} color={colors.brand} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: colors.brand,
                paddingVertical: spacing.md,
                borderRadius: 12,
                alignItems: 'center',
                marginTop: spacing.lg,
              }}
            >
              <Text style={{ color: 'white', fontFamily: fonts.semibold, fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

