import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../../theme/tokens';
import MenuOverlay from '../../(vendor)/menu-overlay';

export default function VendorCommunity() {
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
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>COMMUNITY</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(vendor)/payment-history')}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Stats Section */}
        <View style={{ padding: spacing.lg, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginRight: spacing.sm }}>
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.brand }}>₦45K</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Revenue</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginHorizontal: spacing.xs }}>
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.brand }}>128</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Orders</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.brandTint, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginLeft: spacing.sm }}>
            <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.brand }}>32</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Products</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
            <TouchableOpacity style={{ flex: 1, minWidth: '45%', backgroundColor: colors.brand, padding: spacing.md, borderRadius: 12, alignItems: 'center' }}>
              <Ionicons name="add-circle" size={32} color="white" />
              <Text style={{ marginTop: spacing.xs, fontFamily: fonts.semibold, color: 'white' }}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, minWidth: '45%', backgroundColor: colors.border, padding: spacing.md, borderRadius: 12, alignItems: 'center' }}>
              <Ionicons name="document-text" size={32} color={colors.text} />
              <Text style={{ marginTop: spacing.xs, fontFamily: fonts.semibold, color: colors.text }}>View Orders</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Products */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Recent Products</Text>
          {[1, 2, 3].map((product) => (
            <View key={product} style={{ marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md, flexDirection: 'row' }}>
              <View style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: colors.border, marginRight: spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Product Name {product}</Text>
                <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: colors.brand, marginBottom: spacing.xs }}>₦{5000 + product * 500}</Text>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="eye-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>45 views</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Ionicons name="cart-outline" size={16} color={colors.subtext} />
                    <Text style={{ fontSize: 12, color: colors.subtext }}>12 sold</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Orders Section */}
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Recent Orders</Text>
          {[1, 2].map((order) => (
            <View key={order} style={{ marginBottom: spacing.md, backgroundColor: '#F9F9F9', padding: spacing.md, borderRadius: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                <Text style={{ fontFamily: fonts.semibold }}>Order #{1000 + order}</Text>
                <Text style={{ fontFamily: fonts.bold, color: colors.brand }}>₦{15000 + order * 5000}</Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.subtext, fontFamily: fonts.regular, marginBottom: spacing.xs }}>2 items • Customer Name</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text }}>Pending</Text>
                <TouchableOpacity style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.xs, backgroundColor: colors.brand, borderRadius: 8 }}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: 'white' }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(vendor)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(vendor)/shop')} style={{ alignItems: 'center' }}>
          <Ionicons name="bag-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="people" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(vendor)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="barbell-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(vendor)/search')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="community" />
    </SafeAreaView>
  );
}

