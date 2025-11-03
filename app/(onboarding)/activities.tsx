import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

const activities = ['Walk', 'Run', 'Ride', 'Hike', 'Swim', 'Crossfit', 'Rock Climb'];

export default function Activities() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const [selectedActivities, setSelectedActivities] = React.useState<string[]>([]);

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const getCommunityRoute = () => {
    switch (role) {
      case 'creator':
        return '/(community)/creator';
      case 'vendor':
        return '/(community)/vendor';
      default:
        return '/(community)/user';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, fontFamily: fonts.bold, marginBottom: spacing.xl }}>
        What types of activities do you like to do?
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {activities.map((activity) => {
          const isSelected = selectedActivities.includes(activity);
          return (
            <TouchableOpacity
              key={activity}
              onPress={() => toggleActivity(activity)}
              style={{
                padding: spacing.md,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isSelected ? colors.brand : colors.border,
                backgroundColor: isSelected ? colors.brandTint : 'transparent',
                marginBottom: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontFamily: fonts.regular, color: isSelected ? colors.brand : colors.text, fontSize: 16 }}>
                {activity}
              </Text>
              {isSelected && <Ionicons name="checkmark-circle" size={24} color={colors.brand} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Button 
        title="Next" 
        disabled={selectedActivities.length === 0}
        onPress={() => router.replace('/(user)/home')} 
      />
    </View>
  );
}

