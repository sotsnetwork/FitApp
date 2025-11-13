import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';
import { useVendorProducts } from '../../contexts/VendorProductsContext';

const categories = ['GEARS', 'EQUIPMENTS', 'SUPPLEMENTS'];

// Mock products
const allProducts = [
  { id: '1', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '2', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '3', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '4', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '5', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '6', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '7', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '8', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '9', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '10', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '11', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
  { id: '12', name: 'NIKE AIRFORCE SN...', price: '₦16,000', category: 'GEARS', image: null },
];

export default function VendorShop() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('GEARS');
  const [sortFilter, setSortFilter] = React.useState('Most Order');
  const [timeFilter, setTimeFilter] = React.useState('Last 28 Days');
  const [sortModalVisible, setSortModalVisible] = React.useState(false);
  const [timeModalVisible, setTimeModalVisible] = React.useState(false);

  const filteredProducts = allProducts.filter(p => p.category === selectedCategory);
  const { products } = useVendorProducts();

  const mergedProducts = React.useMemo(() => {
    // map context products into display structure
    const mapped = products
      .filter(p => p.category === (selectedCategory as any))
      .map(p => ({
        id: p.id,
        name: p.name,
        price: `₦${p.priceNaira.toLocaleString('en-NG')}`,
        promoPrice: p.promoPriceNaira ? `₦${p.promoPriceNaira.toLocaleString('en-NG')}` : undefined,
        discountPercent: p.promoPriceNaira && p.promoPriceNaira < p.priceNaira
          ? Math.round(100 - (p.promoPriceNaira / p.priceNaira) * 100)
          : undefined,
        category: p.category,
      }));
    // show saved products first, then mock ones
    return [...mapped, ...filteredProducts];
  }, [products, selectedCategory]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>MY SHOP</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity onPress={() => router.push('/(vendor)/upload-product')}>
            <Ionicons name="cloud-upload-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(vendor)/orders')}>
            <Ionicons name="bag-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
        >
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>{sortFilter}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.subtext} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimeModalVisible(true)}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
        >
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>{timeFilter}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.subtext} />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, gap: spacing.sm }}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={{
                paddingHorizontal: spacing.md,
                borderRadius: 16,
                backgroundColor: selectedCategory === category ? colors.text : '#F5F5F5',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: selectedCategory === category ? 'white' : colors.text, textAlign: 'center' }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Product Grid */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: spacing.sm }}>
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {mergedProducts.map((product: any) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => router.push('/(vendor)/product-detail')}
                style={{ width: '31%', marginBottom: spacing.md }}
              >
                <View style={{ width: '100%', height: 120, borderRadius: 12, backgroundColor: colors.border, marginBottom: spacing.xs }} />
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, marginBottom: spacing.xs }} numberOfLines={1}>
                  {product.name}
                </Text>
                {product.promoPrice ? (
                  <View>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 14, color: colors.brand }}>{product.promoPrice}</Text>
                    <Text style={{ fontFamily: fonts.regular, fontSize: 11, color: colors.subtext, textDecorationLine: 'line-through' }}>{product.price}</Text>
                    {product.discountPercent ? (
                      <Text style={{ fontFamily: fonts.semibold, fontSize: 10, color: colors.brand }}>{product.discountPercent}% OFF</Text>
                    ) : null}
                  </View>
                ) : (
                  <Text style={{ fontFamily: fonts.bold, fontSize: 14, color: colors.brand }}>{product.price}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(vendor)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(vendor)/search')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/vendor')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(vendor)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="barbell-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="bag" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="shop" />

      {/* Sort Filter Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setSortModalVisible(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: spacing.md, minWidth: 200 }}>
            {['Most Order', 'Least Order', 'Highest Price', 'Lowest Price', 'Newest', 'Oldest'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setSortFilter(filter);
                  setSortModalVisible(false);
                }}
                style={{ paddingVertical: spacing.md }}
              >
                <Text style={{ fontFamily: fonts.regular, color: sortFilter === filter ? colors.brand : colors.text }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Time Filter Modal */}
      <Modal
        visible={timeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setTimeModalVisible(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: spacing.md, minWidth: 200 }}>
            {['Last 7 Days', 'Last 28 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year', 'All Time'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setTimeFilter(filter);
                  setTimeModalVisible(false);
                }}
                style={{ paddingVertical: spacing.md }}
              >
                <Text style={{ fontFamily: fonts.regular, color: timeFilter === filter ? colors.brand : colors.text }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
