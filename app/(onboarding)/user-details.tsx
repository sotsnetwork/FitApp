import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';

export default function UserDetails() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const { updateProfile } = useUserProfile();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState('February');
  const [selectedDay, setSelectedDay] = React.useState(18);
  const [selectedYear, setSelectedYear] = React.useState(1995);

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 60 }, (_, i) => 1980 + i);

  const handleDateConfirm = () => {
    setBirthdate(`${selectedMonth} ${selectedDay}, ${selectedYear}`);
    setShowDatePicker(false);
  };

  const canContinue = firstName.length >= 2 && lastName.length >= 2 && birthdate && gender;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: spacing.lg, paddingTop: 64, paddingBottom: spacing.xl }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: spacing.xl }}>Tell us who you are</Text>

        {/* First name */}
        <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, marginBottom: spacing.xs }}>First name</Text>
        <Input 
          placeholder="" 
          value={firstName} 
          onChangeText={setFirstName}
          style={{ marginBottom: spacing.md }}
        />

        {/* Last Name */}
        <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, marginBottom: spacing.xs }}>Last Name</Text>
        <Input 
          placeholder="" 
          value={lastName} 
          onChangeText={setLastName}
          style={{ marginBottom: spacing.md }}
        />

        {/* Bio */}
        <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, marginBottom: spacing.xs }}>Bio (optional)</Text>
        <Input 
          placeholder="Tell us about yourself" 
          value={bio} 
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          style={{ marginBottom: spacing.md, minHeight: 80 }}
        />

        {/* Birthdate */}
        <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, marginBottom: spacing.xs }}>Birthdate</Text>
        <TouchableOpacity 
          onPress={() => setShowDatePicker(true)}
          style={{ 
            marginBottom: spacing.md, 
            borderWidth: 1, 
            borderColor: colors.border, 
            borderRadius: 8, 
            padding: spacing.md,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontFamily: fonts.regular, color: birthdate ? colors.text : colors.subtext }}>
            {birthdate ? `${selectedMonth} ${selectedDay}, ${selectedYear}` : '--/--/--'}
          </Text>
        </TouchableOpacity>

        {/* Gender Selection */}
        <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, marginBottom: spacing.sm }}>Gender</Text>
        <View style={{ marginBottom: spacing.md }}>
          {['Man', 'Woman', 'Rather not say'].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setGender(option)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing.sm,
                marginBottom: spacing.xs,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: gender === option ? colors.brand : colors.border,
                  backgroundColor: gender === option ? colors.brand : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}
              >
                {gender === option && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'white',
                    }}
                  />
                )}
              </View>
              <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: spacing.md }} />
        <Button 
          title="Next" 
          disabled={!canContinue}
          onPress={async () => {
            // Save user profile data
            await updateProfile({
              firstName,
              lastName,
              bio: bio || undefined,
              birthdate,
              gender,
            });
            router.push(`/(onboarding)/activities?role=${role}`);
          }} 
        />
      </ScrollView>

      {/* Date Picker Modal - Figma Styled */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            {/* Grabber */}
            <View style={{ alignItems: 'center', paddingTop: spacing.md }}>
              <View style={{ width: 64, height: 6, borderRadius: 3, backgroundColor: '#EDEDED' }} />
            </View>

            {/* Wheels */}
            <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xl }}>
              <View style={{ height: 180, flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* selection highlight */}
                <View pointerEvents="none" style={{ position: 'absolute', left: spacing.lg, right: spacing.lg, top: 68, height: 44, backgroundColor: '#F5FFF9', borderRadius: 12 }} />

                {/* Month */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 68 }}>
                  {months.map((m) => (
                    <TouchableOpacity key={m} onPress={() => setSelectedMonth(m)} style={{ height: 44, justifyContent: 'center' }}>
                      <Text style={{ textAlign: 'left', fontFamily: fonts.regular, color: selectedMonth === m ? colors.text : '#B3B3B3', fontSize: 18 }}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Day */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 68 }}>
                  {days.map((d) => (
                    <TouchableOpacity key={d} onPress={() => setSelectedDay(d)} style={{ height: 44, justifyContent: 'center', paddingHorizontal: spacing.md }}>
                      <Text style={{ textAlign: 'center', fontFamily: fonts.regular, color: selectedDay === d ? colors.text : '#B3B3B3', fontSize: 18 }}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Year */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 68 }}>
                  {years.map((y) => (
                    <TouchableOpacity key={y} onPress={() => setSelectedYear(y)} style={{ height: 44, justifyContent: 'center', alignItems: 'flex-end' }}>
                      <Text style={{ textAlign: 'right', fontFamily: fonts.regular, color: selectedYear === y ? colors.text : '#B3B3B3', fontSize: 18 }}>{y}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Footer */}
            <View style={{ borderTopWidth: 1, borderTopColor: colors.border, padding: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={{ fontFamily: fonts.regular, color: colors.brand }}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDateConfirm} style={{ backgroundColor: colors.brand, paddingVertical: spacing.sm, paddingHorizontal: spacing.xl, borderRadius: 24 }}>
                <Text style={{ color: '#0F0F0F', fontFamily: fonts.semibold }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

