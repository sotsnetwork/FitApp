import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

const tabs = ['GEARS', 'SUPPLEMENTS', 'PLANS'];

export default function UserShop() {
  const [selectedTab, setSelectedTab] = React.useState('GEARS');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>SHOP</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="bag-outline" size={24} color={colors.text} />
          <View style={{ position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 10, color: 'white', fontFamily: fonts.bold }}>00</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: spacing.lg }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={{
              flex: 1,
              paddingVertical: spacing.md,
              borderBottomWidth: selectedTab === tab ? 2 : 0,
              borderBottomColor: colors.brand,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.semibold, color: selectedTab === tab ? colors.brand : colors.subtext }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
            <Ionicons name="search-outline" size={20} color={colors.subtext} />
            <TextInput placeholder="WHAT ARE YOU LOOKING FOR?" style={{ flex: 1, marginLeft: spacing.sm, fontFamily: fonts.regular }} />
          </View>
        </View>

        {/* You Might Be Interested In */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>YOU MIGHT BE INTERESTED IN</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { name: 'NIKE AIRFORCE SNI...', price: '₦19,500.00', discount: '50%', color: '#FFFFFF' },
              { name: 'NEW BALANCE 2.0', price: '₦21,000.00', discount: '12%', color: '#1877F2' },
            ].map((product, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: 200, marginRight: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, overflow: 'hidden' }}
                onPress={() => router.push('/(user)/product-detail')}
              >
                <View style={{ width: '100%', height: 180, backgroundColor: product.color, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="football-outline" size={60} color={colors.subtext} />
                </View>
                <View style={{ padding: spacing.md }}>
                  <Text style={{ fontSize: 14, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>{product.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                    <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>{product.price}</Text>
                    <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4 }}>
                      <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>{product.discount} Discount</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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

