import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useSavedProducts } from '../../contexts/SavedProductsContext';
import { useCart } from '../../contexts/CartContext';
import { useVendorProducts } from '../../contexts/VendorProductsContext';

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const productId = (params.productId as string) || '1';
  const { saveProduct, unsaveProduct, isSaved } = useSavedProducts();
  const { addToCart, getCartCount } = useCart();
  const { products: vendorProducts } = useVendorProducts();
  const [sizeModalVisible, setSizeModalVisible] = React.useState(false);
  const [colorModalVisible, setColorModalVisible] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');

  // Try to find vendor product first, otherwise use mock data
  const vendorProduct = vendorProducts.find(p => p.id === productId);
  const product = vendorProduct ? {
    id: vendorProduct.id,
    name: vendorProduct.name,
    price: `₦${vendorProduct.priceNaira.toLocaleString('en-NG')}`,
    discount: vendorProduct.promoPriceNaira && vendorProduct.promoPriceNaira < vendorProduct.priceNaira
      ? `${Math.round(100 - (vendorProduct.promoPriceNaira / vendorProduct.priceNaira) * 100)}%`
      : undefined,
    description: vendorProduct.name,
    category: vendorProduct.category,
    availableSizes: vendorProduct.availableSizes,
    availableColors: vendorProduct.availableColors,
  } : {
    id: productId,
    name: "Nike Free Metcon 6 Women's Workout Shoes",
    price: '₦19,500.00',
    discount: '60%',
    description: 'Find the Nike Free Metcon 6 Women\'s Workout Shoes',
    category: 'NIKE AIRFORCE SNICKERS',
    availableSizes: undefined,
    availableColors: undefined,
  };

  // Set default size and color if available
  React.useEffect(() => {
    if (product.availableSizes && product.availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(product.availableSizes[0]);
    }
    if (product.availableColors && product.availableColors.length > 0 && !selectedColor) {
      setSelectedColor(product.availableColors[0]);
    }
  }, [product.availableSizes, product.availableColors]);

  const saved = isSaved(product.id);
  const [itemAdded, setItemAdded] = React.useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      quantity: 1,
      availableSizes: product.availableSizes,
      availableColors: product.availableColors,
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
        <TouchableOpacity onPress={() => router.push('/(user)/shopping-cart')} style={{ position: 'relative' }}>
          <Ionicons name="bag-outline" size={24} color={colors.text} />
          {getCartCount() > 0 && (
            <View style={{ position: 'absolute', top: -8, right: -8, backgroundColor: colors.brand, borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
              <Text style={{ fontSize: 10, fontFamily: fonts.bold, color: '#0F0F0F' }}>{getCartCount()}</Text>
            </View>
          )}
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
          {product.availableSizes && product.availableSizes.length > 0 && (
            <View style={{ marginBottom: spacing.md }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.sm }}>SIZE:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
                {product.availableSizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => {
                      setSelectedSize(size);
                      setSizeModalVisible(false);
                    }}
                    style={{
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.xs,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: selectedSize === size ? colors.brand : colors.border,
                      backgroundColor: selectedSize === size ? colors.brandTint : 'transparent',
                    }}
                  >
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: selectedSize === size ? colors.brand : colors.text }}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Color Selection */}
          {product.availableColors && product.availableColors.length > 0 && (
            <View style={{ marginBottom: spacing.lg }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.sm }}>COLOUR:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
                {product.availableColors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => {
                      setSelectedColor(color);
                      setColorModalVisible(false);
                    }}
                    style={{
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.xs,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: selectedColor === color ? colors.brand : colors.border,
                      backgroundColor: selectedColor === color ? colors.brandTint : 'transparent',
                    }}
                  >
                    <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: selectedColor === color ? colors.brand : colors.text }}>
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

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

