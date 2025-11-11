import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function VendorProducts() {
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
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>MY PRODUCTS</Text>
        <TouchableOpacity style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: 16 }}>
          <Ionicons name="add" size={24} color="#0F0F0F" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {[1, 2, 3, 4, 5].map((product) => (
            <TouchableOpacity 
              key={product}
              style={{ marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md, flexDirection: 'row' }}
            >
              <View style={{ width: 100, height: 100, borderRadius: 8, backgroundColor: colors.border, marginRight: spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Product Name {product}</Text>
                <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.brand, marginBottom: spacing.xs }}>₦{5000 + product * 500}</Text>
                <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xs }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="eye-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>45 views</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="cart-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>12 sold</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: colors.brand, paddingVertical: spacing.xs, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: colors.border, paddingVertical: spacing.xs, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: colors.text }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="products" />
    </SafeAreaView>
  );
}

