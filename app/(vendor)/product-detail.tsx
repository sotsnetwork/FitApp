import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function VendorProductDetail() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity onPress={() => router.push('/(vendor)/products')}>
            <Ionicons name="create-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={{ width: '100%', height: 300, backgroundColor: colors.border, marginBottom: spacing.md }} />

        {/* Product Description */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: spacing.xs }}>
            Lorem ipsum dolor sit amet consectetur. Sagittis dictum sit a.
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>15/5/2003 • Published</Text>
        </View>

        {/* Product Details */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <Text style={{ fontFamily: fonts.bold, fontSize: 16, marginBottom: spacing.sm }}>Product Details</Text>
          <View style={{ marginBottom: spacing.sm }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>Available in Store: <Text style={{ fontFamily: fonts.semibold }}>100 pcs</Text></Text>
          </View>
          <View style={{ marginBottom: spacing.sm }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>Sold: <Text style={{ fontFamily: fonts.semibold }}>25 pcs</Text></Text>
          </View>
          <View style={{ marginBottom: spacing.sm }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>Discount: <Text style={{ fontFamily: fonts.semibold }}>Nil</Text></Text>
          </View>
        </View>

        {/* Colors & Sizes */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <Text style={{ fontFamily: fonts.bold, fontSize: 16, marginBottom: spacing.sm }}>Product Details</Text>
          <View style={{ marginBottom: spacing.sm }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>Colors: <Text style={{ fontFamily: fonts.semibold }}>Red Blue Yellow Stock White</Text></Text>
          </View>
          <View style={{ marginBottom: spacing.sm }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>Sizes: <Text style={{ fontFamily: fonts.semibold }}>42 44 45 46 48 32</Text></Text>
          </View>
        </View>

        {/* Comments Section */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 16 }}>Comments</Text>
            <TouchableOpacity>
              <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.brand }}>View all</Text>
            </TouchableOpacity>
          </View>
          {[1, 2, 3].map((comment) => (
            <View key={comment} style={{ marginBottom: spacing.md, flexDirection: 'row' }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                <Text style={{ fontSize: 16 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14, marginBottom: spacing.xs }}>Alfredo</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginBottom: spacing.xs }}>5th February, 2023 3PM</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: spacing.xs }}>
                  Amazing place and experience! We had a great time. The kids loved it.
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.brand }}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="shop" />
    </SafeAreaView>
  );
}

