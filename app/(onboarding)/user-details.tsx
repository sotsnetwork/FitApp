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

  const months = ['December', 'January', 'February', 'March', 'April'];
  const days = [16, 17, 18, 19, 20];
  const years = [1993, 1994, 1995, 1996, 1997];

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

      {/* Date Picker Modal */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg }}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={{ fontFamily: fonts.regular, color: colors.brand }}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDateConfirm}>
                <Text style={{ fontFamily: fonts.semibold, color: colors.brand }}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: spacing.md }}>
                {/* Month Picker */}
                <View>
                  <Text style={{ fontFamily: fonts.semibold, marginBottom: spacing.sm }}>Month</Text>
                  <ScrollView style={{ maxHeight: 200 }}>
                    {months.map((month) => (
                      <TouchableOpacity
                        key={month}
                        onPress={() => setSelectedMonth(month)}
                        style={{
                          padding: spacing.sm,
                          backgroundColor: selectedMonth === month ? colors.brandTint : 'transparent',
                          borderRadius: 8,
                          marginBottom: spacing.xs,
                        }}
                      >
                        <Text style={{ fontFamily: fonts.regular, color: selectedMonth === month ? colors.brand : colors.text }}>
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Day Picker */}
                <View>
                  <Text style={{ fontFamily: fonts.semibold, marginBottom: spacing.sm }}>Day</Text>
                  <ScrollView style={{ maxHeight: 200 }}>
                    {days.map((day) => (
                      <TouchableOpacity
                        key={day}
                        onPress={() => setSelectedDay(day)}
                        style={{
                          padding: spacing.sm,
                          backgroundColor: selectedDay === day ? colors.brandTint : 'transparent',
                          borderRadius: 8,
                          marginBottom: spacing.xs,
                        }}
                      >
                        <Text style={{ fontFamily: fonts.regular, color: selectedDay === day ? colors.brand : colors.text }}>
                          {day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Year Picker */}
                <View>
                  <Text style={{ fontFamily: fonts.semibold, marginBottom: spacing.sm }}>Year</Text>
                  <ScrollView style={{ maxHeight: 200 }}>
                    {years.map((year) => (
                      <TouchableOpacity
                        key={year}
                        onPress={() => setSelectedYear(year)}
                        style={{
                          padding: spacing.sm,
                          backgroundColor: selectedYear === year ? colors.brandTint : 'transparent',
                          borderRadius: 8,
                          marginBottom: spacing.xs,
                        }}
                      >
                        <Text style={{ fontFamily: fonts.regular, color: selectedYear === year ? colors.brand : colors.text }}>
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

