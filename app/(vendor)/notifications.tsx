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

export default function VendorNotifications() {
  const notifications: NotificationItem[] = [];
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
            Notifications for your vendor account will appear here once there is new activity.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(vendor)/dashboard')}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 12,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
              backgroundColor: 'white',
            }}
          >
            <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Go to Dashboard</Text>
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
