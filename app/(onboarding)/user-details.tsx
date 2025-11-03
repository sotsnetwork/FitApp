import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function UserDetails() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const [firstName, setFirstName] = React.useState('Victor');
  const [lastName, setLastName] = React.useState('Dra');
  const [birthdate, setBirthdate] = React.useState('February 18, 1995');
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
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: spacing.md }}>Tell us who you are</Text>

      <Input 
        placeholder="First name" 
        value={firstName} 
        onChangeText={setFirstName} 
        leftIcon="person-outline" 
      />
      <Input 
        placeholder="Last Name" 
        value={lastName} 
        onChangeText={setLastName} 
        leftIcon="person-outline" 
      />

      {/* Birthdate Input */}
      <TouchableOpacity 
        onPress={() => setShowDatePicker(true)}
        style={{ 
          marginBottom: 12, 
          borderWidth: 1, 
          borderColor: colors.border, 
          borderRadius: 8, 
          padding: spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ fontFamily: fonts.regular, color: birthdate ? colors.text : colors.subtext }}>
          {birthdate || 'Birthdate'}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={colors.subtext} />
      </TouchableOpacity>

      {/* Gender Selection */}
      <Text style={{ fontFamily: fonts.semibold, marginBottom: spacing.sm, marginTop: spacing.xs }}>Gender</Text>
      <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md }}>
        {['Man', 'Woman', 'Rather not say'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setGender(option)}
            style={{
              flex: 1,
              padding: spacing.md,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: gender === option ? colors.brand : colors.border,
              backgroundColor: gender === option ? colors.brandTint : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.regular, color: gender === option ? colors.brand : colors.text }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: spacing.lg }} />
      <Button 
        title="Next" 
        disabled={!canContinue}
        onPress={() => router.push(`/(onboarding)/activities?role=${role}`)} 
      />

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

