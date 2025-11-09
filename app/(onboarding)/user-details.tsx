import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function UserDetails() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState('February');
  const [selectedDay, setSelectedDay] = React.useState(18);
  const [selectedYear, setSelectedYear] = React.useState(1995);

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 60 }, (_, i) => 1980 + i);

  // Refs for scroll views
  const monthScrollRef = React.useRef<ScrollView>(null);
  const dayScrollRef = React.useRef<ScrollView>(null);
  const yearScrollRef = React.useRef<ScrollView>(null);

  const ITEM_HEIGHT = 44;
  const SELECTION_OFFSET = 68; // Top padding to center the selection

  // Initialize scroll positions when modal opens
  React.useEffect(() => {
    if (showDatePicker) {
      // Scroll to selected values
      const monthIndex = months.indexOf(selectedMonth);
      const dayIndex = days.indexOf(selectedDay);
      const yearIndex = years.indexOf(selectedYear);
      
      setTimeout(() => {
        monthScrollRef.current?.scrollTo({ y: monthIndex * ITEM_HEIGHT, animated: false });
        dayScrollRef.current?.scrollTo({ y: dayIndex * ITEM_HEIGHT, animated: false });
        yearScrollRef.current?.scrollTo({ y: yearIndex * ITEM_HEIGHT, animated: false });
      }, 100);
    }
  }, [showDatePicker]);

  const handleScrollEnd = (scrollRef: React.RefObject<ScrollView>, values: any[], setter: (value: any) => void) => {
    return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      // Calculate which item is in the center (highlighted position)
      const index = Math.round((y + SELECTION_OFFSET) / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, values.length - 1));
      
      // Set the selected value
      setter(values[clampedIndex]);
      
      // Snap to the exact position
      scrollRef.current?.scrollTo({ y: clampedIndex * ITEM_HEIGHT, animated: true });
    };
  };

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
      <View style={{ marginBottom: spacing.xl }}>
        {['Man', 'Woman', 'Rather not say'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setGender(option)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: spacing.md,
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
              <View style={{ height: 180, flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
                {/* selection highlight */}
                <View pointerEvents="none" style={{ position: 'absolute', left: spacing.lg, right: spacing.lg, top: SELECTION_OFFSET, height: ITEM_HEIGHT, backgroundColor: colors.brandTint, borderRadius: 12 }} />

                {/* Month */}
                <ScrollView
                  ref={monthScrollRef}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: SELECTION_OFFSET }}
                  onMomentumScrollEnd={handleScrollEnd(monthScrollRef, months, setSelectedMonth)}
                  onScrollEndDrag={handleScrollEnd(monthScrollRef, months, setSelectedMonth)}
                  snapToInterval={ITEM_HEIGHT}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  style={{ flex: 1 }}
                >
                  {months.map((m, index) => {
                    const isSelected = selectedMonth === m;
                    return (
                      <View key={m} style={{ height: ITEM_HEIGHT, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontFamily: fonts.regular, color: isSelected ? colors.text : '#B3B3B3', fontSize: 18 }}>{m}</Text>
                      </View>
                    );
                  })}
                </ScrollView>

                {/* Day */}
                <ScrollView
                  ref={dayScrollRef}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: SELECTION_OFFSET }}
                  onMomentumScrollEnd={handleScrollEnd(dayScrollRef, days, setSelectedDay)}
                  onScrollEndDrag={handleScrollEnd(dayScrollRef, days, setSelectedDay)}
                  snapToInterval={ITEM_HEIGHT}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  style={{ flex: 1 }}
                >
                  {days.map((d, index) => {
                    const isSelected = selectedDay === d;
                    return (
                      <View key={d} style={{ height: ITEM_HEIGHT, justifyContent: 'center', paddingHorizontal: spacing.md }}>
                        <Text style={{ textAlign: 'center', fontFamily: fonts.regular, color: isSelected ? colors.text : '#B3B3B3', fontSize: 18 }}>{d}</Text>
                      </View>
                    );
                  })}
                </ScrollView>

                {/* Year */}
                <ScrollView
                  ref={yearScrollRef}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: SELECTION_OFFSET }}
                  onMomentumScrollEnd={handleScrollEnd(yearScrollRef, years, setSelectedYear)}
                  onScrollEndDrag={handleScrollEnd(yearScrollRef, years, setSelectedYear)}
                  snapToInterval={ITEM_HEIGHT}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  style={{ flex: 1 }}
                >
                  {years.map((y, index) => {
                    const isSelected = selectedYear === y;
                    return (
                      <View key={y} style={{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ textAlign: 'right', fontFamily: fonts.regular, color: isSelected ? colors.text : '#B3B3B3', fontSize: 18 }}>{y}</Text>
                      </View>
                    );
                  })}
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

