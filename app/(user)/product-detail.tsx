import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function ProductDetail() {
  const [sizeModalVisible, setSizeModalVisible] = React.useState(false);
  const [colorModalVisible, setColorModalVisible] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState('36');
  const [selectedColor, setSelectedColor] = React.useState('BROWN');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/shopping-cart')}>
          <Ionicons name="bag-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={{ width: '100%', height: 400, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="football-outline" size={120} color={colors.subtext} />
        </View>

        {/* Product Info */}
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontSize: 16, fontFamily: fonts.regular, marginBottom: spacing.sm }}>
            Nike Free Metcon 6 Women's Workout Shoes
          </Text>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.md }}>
            Find the Nike Free Metcon 6 Women's Workout Shoes
          </Text>

          {/* Size Selection */}
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.sm }}>
            SIZE: {selectedSize} 38 42 43 45
          </Text>

          {/* Color Selection */}
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.lg }}>
            COLOUR: {selectedColor} BLACK GREY
          </Text>

          {/* Product Details */}
          <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm }}>
            NIKE AIRFORCE SNICKERS
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.regular }}>₦19,500.00</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#FFA500', marginLeft: spacing.sm }}>
              60% Discount
            </Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <Ionicons name="bookmark-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Product Images */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          <View style={{ width: 200, height: 200, backgroundColor: colors.border, borderRadius: 12, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="football-outline" size={60} color={colors.subtext} />
          </View>
          <View style={{ width: 200, height: 200, backgroundColor: colors.border, borderRadius: 12, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="football-outline" size={60} color={colors.subtext} />
          </View>
        </ScrollView>
      </ScrollView>

      {/* Add Button */}
      <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity
          onPress={() => router.push('/(user)/shopping-cart')}
          style={{ backgroundColor: colors.brand, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: '#0F0F0F' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

