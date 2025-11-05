import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function CreatorDashboard() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>DASHBOARD</Text>
        <TouchableOpacity onPress={() => router.push('/(user)/notifications')}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Earnings Card */}
          <View style={{ backgroundColor: colors.brand, borderRadius: 12, padding: spacing.lg, marginBottom: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Ionicons name="bag-outline" size={32} color="#0F0F0F" style={{ marginRight: spacing.md }} />
              <View>
                <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: '#0F0F0F' }}>$78k</Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#0F0F0F' }}>Accepted here</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={20} color="#0F0F0F" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#0F0F0F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Views Card */}
          <View style={{ backgroundColor: colors.text, borderRadius: 12, padding: spacing.lg, marginBottom: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                <Ionicons name="eye-outline" size={24} color="white" />
              </View>
              <View>
                <Text style={{ fontSize: 20, fontFamily: fonts.bold, color: 'white' }}>57k Total Video views</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Ongoing Section */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Ongoing</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>View more</Text>
                <Ionicons name="chevron-down" size={16} color={colors.brand} />
              </TouchableOpacity>
            </View>

            {/* Ongoing Post Card */}
            <TouchableOpacity
              onPress={() => router.push('/(creator)/content-detail')}
              style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.semibold, flex: 1 }}>Nike Camouflage Joggers</Text>
                <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext }}>4:13 Mins</Text>
                  <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext }}>13/15/2023</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#FFF5E6', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8 }}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: '#E6A800' }}>In review</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Latest Uploads Section */}
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Latest Uploads</Text>
              <TouchableOpacity style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Last 25 days</Text>
              </TouchableOpacity>
            </View>

            {/* Latest Uploads List */}
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => router.push('/(creator)/content-detail')}
                style={{ flexDirection: 'row', marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md }}
              >
                <View style={{ width: 120, height: 80, backgroundColor: colors.border, borderRadius: 8, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="play-circle" size={32} color={colors.subtext} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>
                    Getting 1000lb offloads in 6 days & Cat.
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.xs }}>
                    4 hours ago
                  </Text>
                  <View style={{ flexDirection: 'row', gap: spacing.md }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                      <Ionicons name="eye-outline" size={16} color={colors.subtext} />
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>45</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                      <Ionicons name="heart-outline" size={16} color={colors.subtext} />
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>45</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                      <Ionicons name="chatbubble-outline" size={16} color={colors.subtext} />
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>45</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                      <Ionicons name="share-outline" size={16} color={colors.subtext} />
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>45</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="dashboard" />
    </SafeAreaView>
  );
}

