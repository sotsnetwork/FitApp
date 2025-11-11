import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function VendorOrders() {
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
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>ORDERS</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {[1, 2, 3, 4, 5].map((order) => (
            <View 
              key={order}
              style={{ marginBottom: spacing.md, backgroundColor: '#F9F9F9', padding: spacing.md, borderRadius: 12 }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16 }}>Order #{1000 + order}</Text>
                <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.brand }}>₦{15000 + order * 5000}</Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.subtext, fontFamily: fonts.regular, marginBottom: spacing.xs }}>2 items • Customer Name</Text>
              <Text style={{ fontSize: 12, color: colors.subtext, fontFamily: fonts.regular, marginBottom: spacing.sm }}>Ordered on: 15 Sept 2024</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ backgroundColor: colors.brandTint, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8 }}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: colors.brand }}>Pending</Text>
                </View>
                <TouchableOpacity style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.xs, backgroundColor: colors.brand, borderRadius: 8 }}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: 'white' }}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="orders" />
    </SafeAreaView>
  );
}

