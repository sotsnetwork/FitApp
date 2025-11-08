import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useCart } from '../../contexts/CartContext';

export default function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [sizeModalVisible, setSizeModalVisible] = React.useState(false);
  const [colorModalVisible, setColorModalVisible] = React.useState(false);
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null);
  const [selectedSize, setSelectedSize] = React.useState('36');
  const [selectedColor, setSelectedColor] = React.useState('BROWN');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>SHOPPING CART ({cartItems.length})</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {cartItems.length === 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl }}>
              <Ionicons name="bag-outline" size={64} color={colors.subtext} />
              <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginTop: spacing.md, color: colors.text }}>Your cart is empty</Text>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginTop: spacing.sm, color: colors.subtext }}>Add items to your cart to see them here</Text>
            </View>
          ) : (
            <>
              {/* Cart Items */}
              {cartItems.map((item) => (
                <View key={`${item.id}-${item.size}-${item.color}`} style={{ flexDirection: 'row', marginBottom: spacing.xl }}>
                  <View style={{ width: 120, height: 140, backgroundColor: colors.border, borderRadius: 12, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="football-outline" size={60} color={colors.subtext} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm }}>
                      <Text style={{ fontSize: 14, fontFamily: fonts.semibold, flex: 1 }}>{item.name}</Text>
                      <TouchableOpacity onPress={() => removeFromCart(item.id, item.size, item.color)}>
                        <Ionicons name="close" size={20} color={colors.subtext} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                      <Text style={{ fontSize: 14, fontFamily: fonts.regular }}>{item.price}</Text>
                      {item.discount && (
                        <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#FFA500', marginLeft: spacing.sm }}>
                          {item.discount} Discount
                        </Text>
                      )}
                    </View>

                    {/* Size Display */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, marginBottom: spacing.sm }}>
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular }}>Size: {item.size}</Text>
                    </View>

                    {/* Color Display */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, marginBottom: spacing.sm }}>
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular }}>Colour: {item.color}</Text>
                    </View>

                    {/* Quantity Controls */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm }}>
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular }}>Quantity:</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                          style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Ionicons name="remove" size={16} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontFamily: fonts.semibold, minWidth: 30, textAlign: 'center' }}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Ionicons name="add" size={16} color={colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}

              {/* Total */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, marginTop: spacing.md }}>
                <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Total</Text>
                <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>₦{getCartTotal().toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
            </>
          )}
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

