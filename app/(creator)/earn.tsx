import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function CreatorEarn() {
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
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>EARN</Text>
        <TouchableOpacity>
          <Ionicons name="wallet-outline" size={24} color={colors.text} />
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

          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Earnings History</Text>
          <View style={{ gap: spacing.md }}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={{ backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 14, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>Earning {item}</Text>
                  <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>13/15/2023</Text>
                </View>
                <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: colors.brand }}>+$1,234</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="earn" />
    </SafeAreaView>
  );
}

