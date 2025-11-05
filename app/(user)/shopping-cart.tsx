import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function ShoppingCart() {
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
        <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>SHOPPING CART (1)</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Cart Item */}
          <View style={{ flexDirection: 'row', marginBottom: spacing.xl }}>
            <View style={{ width: 120, height: 140, backgroundColor: colors.border, borderRadius: 12, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="football-outline" size={60} color={colors.subtext} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.semibold, flex: 1 }}>NIKE AIRFORCE SNICKERS</Text>
                <TouchableOpacity>
                  <Ionicons name="close" size={20} color={colors.subtext} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular }}>₦19,500.00</Text>
                <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#FFA500', marginLeft: spacing.sm }}>
                  60% Discount
                </Text>
              </View>

              {/* Size Dropdown */}
              <TouchableOpacity
                onPress={() => setSizeModalVisible(true)}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, marginBottom: spacing.sm }}
              >
                <Text style={{ fontSize: 12, fontFamily: fonts.regular }}>Size: {selectedSize}</Text>
                <Ionicons name="chevron-down" size={16} color={colors.subtext} />
              </TouchableOpacity>

              {/* Color Dropdown */}
              <TouchableOpacity
                onPress={() => setColorModalVisible(true)}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs }}
              >
                <Text style={{ fontSize: 12, fontFamily: fonts.regular }}>Colour: {selectedColor}</Text>
                <Ionicons name="chevron-down" size={16} color={colors.subtext} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.border }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Total</Text>
            <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>₦19,000.00</Text>
          </View>
        </View>

        {/* You May Also Like */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.md }}>YOU MAY ALSO LIKE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => router.push('/(user)/product-detail')}
                style={{ width: 120, height: 120, backgroundColor: colors.border, borderRadius: 12, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}
              >
                <Ionicons name="football-outline" size={40} color={colors.subtext} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity
          onPress={() => router.push('/(user)/edit-address')}
          style={{ backgroundColor: colors.brand, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: '#0F0F0F' }}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Size Modal */}
      <Modal visible={sizeModalVisible} transparent animationType="slide" onRequestClose={() => setSizeModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setSizeModalVisible(false)} />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Select Size</Text>
            {['36', '38', '42', '43', '44', '45'].map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => {
                  setSelectedSize(size);
                  setSizeModalVisible(false);
                }}
                style={{
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: selectedSize === size ? colors.brand : colors.text }}>
                  SIZE {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Color Modal */}
      <Modal visible={colorModalVisible} transparent animationType="slide" onRequestClose={() => setColorModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setColorModalVisible(false)} />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Select Colour</Text>
            {['BROWN', 'BLACK', 'GREY'].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => {
                  setSelectedColor(color);
                  setColorModalVisible(false);
                }}
                style={{
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: selectedColor === color ? colors.brand : colors.text }}>
                  {color}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

