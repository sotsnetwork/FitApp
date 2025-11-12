import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useSavedProducts } from '../../contexts/SavedProductsContext';
import MenuOverlay from './menu-overlay';

const tabs = ['GEARS', 'SUPPLEMENTS', 'PLANS'];

export default function CreatorShop() {
  const [selectedTab, setSelectedTab] = React.useState('GEARS');
  const [menuVisible, setMenuVisible] = React.useState(false);
  const { saveProduct, unsaveProduct, isSaved } = useSavedProducts();

  // Products categorized by type
  const gears = [
    { id: '1', name: 'NIKE ARFORCE SNI...', price: '₦19,500.00', discount: '60%', color: '#FFFFFF', category: 'GEARS' },
    { id: '2', name: 'NEW BALANCE 2.0', price: '₦21,000.00', discount: '12%', color: '#1877F2', category: 'GEARS' },
    { id: '3', name: 'NIKE ARFORCE SNI...', price: '₦19,500.00', discount: '60%', color: '#FFFFFF', category: 'GEARS' },
    { id: '4', name: 'NEW BALANCE 2.0', price: '₦21,000.00', discount: '12%', color: '#1877F2', category: 'GEARS' },
  ];

  const supplements = [
    { id: '5', name: 'Protein Powder', price: '₦15,000.00', discount: '30%', color: '#FFE5B4', category: 'SUPPLEMENTS' },
    { id: '6', name: 'Multivitamin Pack', price: '₦8,500.00', discount: '25%', color: '#E8F5E9', category: 'SUPPLEMENTS' },
    { id: '9', name: 'Creatine Monohydrate', price: '₦12,000.00', discount: '20%', color: '#FFF3E0', category: 'SUPPLEMENTS' },
    { id: '10', name: 'BCAA Supplement', price: '₦10,500.00', discount: '15%', color: '#F1F8E9', category: 'SUPPLEMENTS' },
  ];

  const plans = [
    { id: '7', name: 'Monthly Plan', price: '₦25,000.00', discount: '40%', color: '#E3F2FD', category: 'PLANS' },
    { id: '8', name: 'Annual Plan', price: '₦200,000.00', discount: '50%', color: '#F3E5F5', category: 'PLANS' },
    { id: '11', name: '3-Month Plan', price: '₦60,000.00', discount: '35%', color: '#E8EAF6', category: 'PLANS' },
    { id: '12', name: '6-Month Plan', price: '₦110,000.00', discount: '45%', color: '#FCE4EC', category: 'PLANS' },
  ];

  // Get products based on selected tab
  const getProducts = () => {
    switch (selectedTab) {
      case 'GEARS':
        return gears;
      case 'SUPPLEMENTS':
        return supplements;
      case 'PLANS':
        return plans;
      default:
        return gears;
    }
  };

  const products = getProducts();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>SHOP</Text>
        <TouchableOpacity onPress={() => router.push('/(creator)/payment-history')}>
          <Ionicons name="bag-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={{
              paddingHorizontal: spacing.md,
              borderRadius: 16,
              backgroundColor: selectedTab === tab ? colors.brand : 'white',
              marginRight: spacing.xs,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: selectedTab === tab ? '#0F0F0F' : colors.subtext, textAlign: 'center' }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Ionicons name="search-outline" size={20} color={colors.subtext} />
            <TextInput placeholder="What are you looking for?" style={{ flex: 1, marginLeft: spacing.sm, fontFamily: fonts.regular }} />
          </View>
        </View>

        {/* You Might Be Interested In */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.md }}>YOU MIGHT BE INTERESTED IN</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {products.map((product) => {
              const saved = isSaved(product.id);
              return (
                <View key={product.id} style={{ width: '48%', marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, overflow: 'hidden' }}>
                  <TouchableOpacity
                    style={{ width: '100%' }}
                    onPress={() => router.push({ pathname: '/(user)/product-detail', params: { productId: product.id } })}
                  >
                    <View style={{ width: '100%', height: 165, backgroundColor: product.color, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="football-outline" size={60} color={colors.subtext} />
                    </View>
                    <View style={{ padding: spacing.md }}>
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, marginBottom: spacing.xs, color: colors.subtext }}>{product.name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                        <Text style={{ fontSize: 14, fontFamily: fonts.regular }}>{product.price}</Text>
                      </View>
                      <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#FFA500', alignSelf: 'flex-start' }}>
                        {product.discount} Discount
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ position: 'absolute', top: spacing.md, right: spacing.md, padding: spacing.xs, zIndex: 10 }}
                    onPress={() => {
                      if (saved) {
                        unsaveProduct(product.id);
                      } else {
                        saveProduct({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          discount: product.discount,
                          imageColor: product.color,
                        });
                      }
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? colors.brand : colors.text} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(creator)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(creator)/search')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/creator')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(creator)/workout')} style={{ alignItems: 'center' }}>
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
    </SafeAreaView>
  );
}
