import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';

interface WorkoutSettingsProps {
  visible: boolean;
  onClose: () => void;
}

const coachPreferences = ['Max', 'Sarah', 'John', 'Emma'];
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const workoutScheduleReminders = ['7am (Everyday)', '8am (Everyday)', '9am (Everyday)', '6am (Weekdays)'];

export default function WorkoutSettings({ visible, onClose }: WorkoutSettingsProps) {
  const { profile, updateProfile } = useUserProfile();
  const [coachPreference, setCoachPreference] = useState(profile?.coachPreference || 'Max');
  const [difficultyLevel, setDifficultyLevel] = useState(profile?.difficultyLevel || 'Beginner');
  const [workoutScheduleReminder, setWorkoutScheduleReminder] = useState(profile?.workoutScheduleReminder || '7am (Everyday)');
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);

  const handleSelect = (field: string, value: string) => {
    if (field === 'coach') {
      setCoachPreference(value);
      updateProfile({ coachPreference: value });
    } else if (field === 'difficulty') {
      setDifficultyLevel(value);
      updateProfile({ difficultyLevel: value });
    } else if (field === 'schedule') {
      setWorkoutScheduleReminder(value);
      updateProfile({ workoutScheduleReminder: value });
    }
    setDropdownVisible(null);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Workout & Coaching Settings</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ padding: spacing.lg }}>
            {/* Coach Preference */}
            <View style={{ marginBottom: spacing.lg }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Coach Preference</Text>
              <TouchableOpacity
                onPress={() => setDropdownVisible('coach')}
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
                <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{coachPreference}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.subtext} />
              </TouchableOpacity>
            </View>

            {/* Set Difficulty Level */}
            <View style={{ marginBottom: spacing.lg }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Set Difficulty Level</Text>
              <TouchableOpacity
                onPress={() => setDropdownVisible('difficulty')}
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
                <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{difficultyLevel}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.subtext} />
              </TouchableOpacity>
            </View>

            {/* Workout Schedule Reminder */}
            <View style={{ marginBottom: spacing.lg }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Workout Schedule Reminder</Text>
              <TouchableOpacity
                onPress={() => setDropdownVisible('schedule')}
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
                <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{workoutScheduleReminder}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.subtext} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Dropdown Modals */}
        {dropdownVisible === 'coach' && (
          <Modal visible={true} transparent animationType="fade" onRequestClose={() => setDropdownVisible(null)}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
              activeOpacity={1}
              onPress={() => setDropdownVisible(null)}
            >
              <View style={{ backgroundColor: 'white', margin: spacing.lg, borderRadius: 12, padding: spacing.md }}>
                {coachPreferences.map((coach) => (
                  <TouchableOpacity
                    key={coach}
                    onPress={() => handleSelect('coach', coach)}
                    style={{
                      paddingVertical: spacing.md,
                      borderBottomWidth: coachPreferences.indexOf(coach) < coachPreferences.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{coach}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        {dropdownVisible === 'difficulty' && (
          <Modal visible={true} transparent animationType="fade" onRequestClose={() => setDropdownVisible(null)}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
              activeOpacity={1}
              onPress={() => setDropdownVisible(null)}
            >
              <View style={{ backgroundColor: 'white', margin: spacing.lg, borderRadius: 12, padding: spacing.md }}>
                {difficultyLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => handleSelect('difficulty', level)}
                    style={{
                      paddingVertical: spacing.md,
                      borderBottomWidth: difficultyLevels.indexOf(level) < difficultyLevels.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{level}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        {dropdownVisible === 'schedule' && (
          <Modal visible={true} transparent animationType="fade" onRequestClose={() => setDropdownVisible(null)}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
              activeOpacity={1}
              onPress={() => setDropdownVisible(null)}
            >
              <View style={{ backgroundColor: 'white', margin: spacing.lg, borderRadius: 12, padding: spacing.md }}>
                {workoutScheduleReminders.map((reminder) => (
                  <TouchableOpacity
                    key={reminder}
                    onPress={() => handleSelect('schedule', reminder)}
                    style={{
                      paddingVertical: spacing.md,
                      borderBottomWidth: workoutScheduleReminders.indexOf(reminder) < workoutScheduleReminders.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>{reminder}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        )}
      </SafeAreaView>
    </Modal>
  );
}

