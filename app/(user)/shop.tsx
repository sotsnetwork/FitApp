import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useSavedProducts } from '../../contexts/SavedProductsContext';

const tabs = ['GEARS', 'SUPPLEMENTS', 'PLANS'];

export default function UserShop() {
  const [selectedTab, setSelectedTab] = React.useState('GEARS');
  const { saveProduct, unsaveProduct, isSaved } = useSavedProducts();

  const products = [
    { id: '1', name: 'NIKE ARFORCE SNI...', price: '₦19,500.00', discount: '60%', color: '#FFFFFF' },
    { id: '2', name: 'NEW BALANCE 2.0', price: '₦21,000.00', discount: '12%', color: '#1877F2' },
    { id: '3', name: 'NIKE ARFORCE SNI...', price: '₦19,500.00', discount: '60%', color: '#FFFFFF' },
    { id: '4', name: 'NEW BALANCE 2.0', price: '₦21,000.00', discount: '12%', color: '#1877F2' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>SHOP</Text>
        <TouchableOpacity onPress={() => router.push('/(user)/shopping-cart')}>
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
        <TouchableOpacity onPress={() => router.push('/(user)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/user')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="barbell-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Ionicons name="bag" size={24} color={colors.text} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.text, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

