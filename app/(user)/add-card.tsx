import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import Input from '../../components/ui/Input';

export default function AddCard() {
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [cardholderName, setCardholderName] = React.useState('');
  const [addressLine1, setAddressLine1] = React.useState('');
  const [saveCard, setSaveCard] = React.useState(false);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Add New Card</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Card Details Section */}
          <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.md }}>Card details</Text>

          <View style={{ marginBottom: spacing.md }}>
            <TextInput
              placeholder="Card number"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                fontFamily: fonts.regular,
                fontSize: 14,
              }}
            />
            <Ionicons name="card-outline" size={24} color={colors.subtext} style={{ position: 'absolute', right: spacing.md, top: spacing.md }} />
          </View>

          <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md }}>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Expiry date"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                keyboardType="numeric"
                maxLength={5}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.md,
                  fontFamily: fonts.regular,
                  fontSize: 14,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="CVC/CVV"
                value={cvc}
                onChangeText={(text) => setCvc(text.replace(/\D/g, '').substring(0, 3))}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.md,
                  fontFamily: fonts.regular,
                  fontSize: 14,
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: spacing.lg }}>
            <TextInput
              placeholder="Cardholder name"
              value={cardholderName}
              onChangeText={setCardholderName}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                fontFamily: fonts.regular,
                fontSize: 14,
              }}
            />
          </View>

          {/* Billing Address Section */}
          <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.md, marginTop: spacing.lg }}>
            Billing address
          </Text>

          <View style={{ marginBottom: spacing.md }}>
            <TextInput
              placeholder="Address line 1"
              value={addressLine1}
              onChangeText={setAddressLine1}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                fontFamily: fonts.regular,
                fontSize: 14,
              }}
            />
          </View>

          {/* Save Card Checkbox */}
          <TouchableOpacity
            onPress={() => setSaveCard(!saveCard)}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.md }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: saveCard ? colors.brand : colors.border,
                backgroundColor: saveCard ? colors.brand : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.sm,
              }}
            >
              {saveCard && <Ionicons name="checkmark" size={16} color="#0F0F0F" />}
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.text }}>Save my card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity
          onPress={() => router.push('/(user)/select-payment')}
          style={{ backgroundColor: colors.brand, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: '#0F0F0F' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

