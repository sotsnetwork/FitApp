import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useSavedProducts } from '../../contexts/SavedProductsContext';
import { useCart } from '../../contexts/CartContext';

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const productId = (params.productId as string) || '1';
  const { saveProduct, unsaveProduct, isSaved } = useSavedProducts();
  const { addToCart } = useCart();
  const [sizeModalVisible, setSizeModalVisible] = React.useState(false);
  const [colorModalVisible, setColorModalVisible] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState('36');
  const [selectedColor, setSelectedColor] = React.useState('BROWN');

  // Mock product data - in a real app, this would come from an API or context
  const product = {
    id: productId,
    name: "Nike Free Metcon 6 Women's Workout Shoes",
    price: '₦19,500.00',
    discount: '60%',
    description: 'Find the Nike Free Metcon 6 Women\'s Workout Shoes',
    category: 'NIKE AIRFORCE SNICKERS',
  };

  const saved = isSaved(product.id);
  const [itemAdded, setItemAdded] = React.useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    setItemAdded(true);
    Alert.alert('Success', 'Item added to cart!', [
      { text: 'OK', onPress: () => router.push('/(user)/shopping-cart') },
      { text: 'Continue Shopping', style: 'cancel', onPress: () => setItemAdded(false) },
    ]);
  };

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
            {product.name}
          </Text>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.md }}>
            {product.description}
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
            {product.category}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
            <Text style={{ fontSize: 16, fontFamily: fonts.regular }}>{product.price}</Text>
            <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#FFA500', marginLeft: spacing.sm }}>
              {product.discount} Discount
            </Text>
                    <TouchableOpacity
                      style={{ marginLeft: 'auto' }}
                      onPress={() => {
                        if (saved) {
                          unsaveProduct(product.id);
                        } else {
                          saveProduct({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            discount: product.discount,
                            imageColor: colors.border,
                          });
                        }
                      }}
                    >
                      <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={24} color={saved ? colors.brand : colors.text} />
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
          onPress={handleAddToCart}
          disabled={itemAdded}
          style={{
            backgroundColor: itemAdded ? colors.brand : colors.brand,
            paddingVertical: spacing.md,
            borderRadius: 12,
            alignItems: 'center',
            opacity: itemAdded ? 0.8 : 1,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {itemAdded && <Ionicons name="checkmark-circle" size={20} color="#0F0F0F" style={{ marginRight: spacing.xs }} />}
            <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: '#0F0F0F' }}>
              {itemAdded ? 'Added to Cart' : 'Add'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

