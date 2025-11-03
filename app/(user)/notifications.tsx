import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function UserNotifications() {
  const hasNotifications = false; // Change to true to see notifications list

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
          <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
            <Ionicons name="document-text-outline" size={60} color={colors.subtext} />
          </View>
          <Text style={{ fontSize: 24, fontFamily: fonts.bold, marginBottom: spacing.sm }}>No Activity</Text>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 20 }}>
            Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus consectetur.
          </Text>
          <Button title="Go to Workouts" onPress={() => router.push('/(user)/workout')} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: spacing.lg }}>
            {/* Notification Items */}
            {[1, 2, 3].map((item, index) => (
              <View key={index} style={{ marginBottom: spacing.md, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Ionicons name="time-outline" size={20} color={colors.subtext} style={{ marginRight: spacing.sm }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 }}>
                      Google stocks increased by 0.9% over the last 24 hours
                    </Text>
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginTop: spacing.xs }}>00</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

