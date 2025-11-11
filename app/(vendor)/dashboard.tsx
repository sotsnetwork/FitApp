import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function VendorDashboard() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>VENDOR DASHBOARD</Text>
        <TouchableOpacity onPress={() => router.push('/(vendor)/payment-history')}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Total Product Sold Card */}
        <View style={{ padding: spacing.lg }}>
          <View style={{ backgroundColor: colors.text, borderRadius: 16, padding: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: 'white', marginBottom: spacing.xs }}>57k</Text>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: 'white' }}>Total Product Sold</Text>
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
        </View>

        {/* Ongoing Section */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Ongoing</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text, opacity: 0.5 }}>View more</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: colors.border, marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Nike Cam...</Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>4:13 Mins</Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>13/10/2023</Text>
            </View>
          </View>
        </View>

        {/* Latest Uploads Section */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Latest Uploads</Text>
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text, opacity: 0.5 }}>Last 25 days</Text>
          </View>
          {[1, 2, 3].map((product) => (
            <TouchableOpacity 
              key={product}
              onPress={() => router.push('/(vendor)/product-detail')}
              style={{ marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md, flexDirection: 'row' }}
            >
              <View style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: colors.border, marginRight: spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Nike Airforce Snickers</Text>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="play-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>80 Pcs</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="heart-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>1.2k</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="chatbubble-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>5.2k</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="dashboard" />
    </SafeAreaView>
  );
}

