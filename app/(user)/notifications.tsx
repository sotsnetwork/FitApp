import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

type NotificationItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  time: string;
  day?: 'today' | 'yesterday';
};

export default function UserNotifications() {
  // Set to empty array to show empty state, or populate with notifications to show list
  const notifications: NotificationItem[] = [];
  // Example notifications (uncomment to see list view):
  // const notifications: NotificationItem[] = [
  //   // Today
  //   { id: 'n1', icon: 'people-outline', text: 'Lorem ipsum dolor sit amet consectetur. Penatibus gravida sit egestas porta dictumst gravida. Ipsum elit.', time: 'Just now', day: 'today' },
  //   { id: 'n2', icon: 'barbell-outline', text: 'Apple stocks increased by 0.9% over the last 24 hours', time: 'Just now', day: 'today' },
  //   { id: 'n3', icon: 'bag-outline', text: 'Google stocks increased by 0.9% over the last 24 hours', time: 'Just now', day: 'today' },
  //   // Yesterday
  //   { id: 'n4', icon: 'people-outline', text: 'Google stocks increased by 0.9% over the last 24 hours', time: 'Thursday 5PM', day: 'yesterday' },
  // ];
  const hasNotifications = notifications.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Notifications</Text>
      </View>

      {!hasNotifications ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl }}>
          <Ionicons name="document-text-outline" size={72} color={colors.subtext} style={{ marginBottom: spacing.lg }} />
          <Text style={{ fontSize: 24, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>No Activity</Text>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 20, paddingHorizontal: spacing.lg }}>
            Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus Lorem ipsum dolor sit amet consectetur.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(user)/workout')}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 12,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
              backgroundColor: 'white',
            }}
          >
            <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Go to Workouts</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xl }}>
            {notifications.map((n, idx) => {
              const showYesterdayChip = n.day === 'yesterday' && notifications[idx - 1]?.day !== 'yesterday';
              return (
                <View key={n.id}>
                  {showYesterdayChip && (
                    <View style={{ alignItems: 'center', marginVertical: spacing.md }}>
                      <View style={{ backgroundColor: '#F1F1F1', borderRadius: 12, paddingHorizontal: spacing.lg, paddingVertical: spacing.xs }}>
                        <Text style={{ fontFamily: fonts.regular, color: colors.subtext }}>Yesterday</Text>
                      </View>
                    </View>
                  )}
                  <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }}>
                      <Ionicons name={n.icon} size={22} color={colors.text} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 }}>{n.text}</Text>
                        <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginTop: 2 }}>{n.time}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

