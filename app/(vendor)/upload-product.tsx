import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function UploadProduct() {
  const [title, setTitle] = React.useState('');
  const [qty, setQty] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [hasPromo, setHasPromo] = React.useState(false);
  const [promoPrice, setPromoPrice] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');

  const canProceed = title.trim().length > 0 && qty.trim().length > 0 && price.trim().length > 0;

  // Helpers to format input as Nigerian Naira and enforce numeric-only
  const formatNaira = (text: string) => {
    const digitsOnly = text.replace(/\D/g, '');
    if (!digitsOnly) return '';
    const amount = parseInt(digitsOnly, 10);
    if (isNaN(amount)) return '';
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
          {/* Product Title */}
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Product Title</Text>
          <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, marginBottom: spacing.lg }}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter product title"
              style={{ height: 48, fontFamily: fonts.regular }}
            />
          </View>

          {/* Quantity and Price */}
          <View style={{ flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.sm }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Quantity Available</Text>
              <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md }}>
                <TextInput
                  value={qty}
                  onChangeText={setQty}
                  placeholder="Enter quantity (e.g. 50 pcs)"
                  keyboardType="numeric"
                  style={{ height: 48, fontFamily: fonts.regular }}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Price</Text>
              <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md }}>
                <TextInput
                  value={price}
                  onChangeText={(t) => setPrice(formatNaira(t))}
                  placeholder="₦0"
                  keyboardType="number-pad"
                  style={{ height: 48, fontFamily: fonts.regular }}
                />
              </View>
            </View>
          </View>

          {/* Promo toggle */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.xs }}>
            <Text style={{ fontFamily: fonts.regular, color: colors.text, marginRight: spacing.md }}>There is a promo</Text>
            <Switch value={hasPromo} onValueChange={setHasPromo} />
          </View>

          {/* Promo Price */}
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs, color: hasPromo ? colors.text : colors.subtext }}>Promo Price</Text>
          <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, marginBottom: spacing.lg, opacity: hasPromo ? 1 : 0.4 }}>
            <TextInput
              value={promoPrice}
              onChangeText={(t) => setPromoPrice(formatNaira(t))}
              placeholder="₦0"
              keyboardType="number-pad"
              editable={hasPromo}
              style={{ height: 48, fontFamily: fonts.regular }}
            />
          </View>

          {/* Country and State */}
          <View style={{ flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.xl }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Country</Text>
              <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md }}>
                <TextInput
                  value={country}
                  onChangeText={setCountry}
                  placeholder="Enter country"
                  style={{ height: 48, fontFamily: fonts.regular }}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>State</Text>
              <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md }}>
                <TextInput
                  value={state}
                  onChangeText={setState}
                  placeholder="Enter state"
                  style={{ height: 48, fontFamily: fonts.regular }}
                />
              </View>
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            disabled={!canProceed}
            onPress={() => router.push('/(vendor)/upload-product-shipping')}
            style={{ backgroundColor: canProceed ? colors.brand : colors.border, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
          >
            <Text style={{ fontFamily: fonts.semibold, color: canProceed ? '#0F0F0F' : colors.subtext }}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
