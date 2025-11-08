import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useCart } from '../../contexts/CartContext';

export default function SelectPayment() {
  const params = useLocalSearchParams();
  const total = params.total as string || '0';
  const { clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = React.useState('NGN Debit/Credit Card');
  const [showSavedCards, setShowSavedCards] = React.useState(false);

  const paymentMethods = [
    { id: 'ngn-card', name: 'NGN Debit/Credit Card', fee: 'Fees: ₦22.50', icon: 'card-outline' },
    { id: 'usd-card', name: 'USD Debit/Credit Card', fee: 'Fee: $0.00', icon: 'card-outline' },
    { id: 'wallet', name: 'Wallet', fee: '', icon: 'wallet-outline' },
    { id: 'paystack', name: 'Paystack', fee: '', icon: 'card-outline' },
  ];

  const savedCards = [
    { id: '1', name: 'Debbie C. Annie', number: '**** **** 1234', expires: '02/24', isRecent: true, isExpired: false },
    { id: '2', name: 'Debbie C. Annie', number: '**** **** 5678', expires: '02/24', isRecent: false, isExpired: false },
    { id: '3', name: 'Debbie C. Annie', number: '**** **** 9012', expires: '02/24', isRecent: false, isExpired: true },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Select payment type</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {!showSavedCards ? (
            <>
              {/* Payment Methods */}
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => {
                    if (method.id === 'ngn-card' || method.id === 'usd-card') {
                      setShowSavedCards(true);
                      setSelectedPayment(method.name);
                    } else {
                      // Handle other payment methods (Wallet, Paystack)
                      clearCart();
                      router.push({ 
                        pathname: '/(payments)/success', 
                        params: { total, role: 'user' } 
                      });
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Ionicons name={method.icon as any} size={24} color={colors.text} style={{ marginRight: spacing.md }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{method.name}</Text>
                      {method.fee && (
                        <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginTop: 2 }}>
                          {method.fee}
                        </Text>
                      )}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {/* Saved Cards */}
              {savedCards.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => setSelectedPayment(card.number)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Ionicons name="card-outline" size={24} color={colors.text} style={{ marginRight: spacing.md }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{card.name}</Text>
                      <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, marginTop: 2 }}>
                        {card.number}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                        {card.isRecent && (
                          <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4, marginRight: spacing.xs }}>
                            <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#0F0F0F' }}>recently used</Text>
                          </View>
                        )}
                        <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: card.isExpired ? 'red' : colors.subtext }}>
                          Expires {card.expires}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: selectedPayment === card.number ? colors.brand : colors.border,
                      backgroundColor: selectedPayment === card.number ? colors.brand : 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {selectedPayment === card.number && <Ionicons name="checkmark" size={16} color="#0F0F0F" />}
                  </View>
                </TouchableOpacity>
              ))}

              {/* Add New Card Button */}
              <TouchableOpacity
                onPress={() => router.push('/(user)/add-card')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  marginTop: spacing.md,
                }}
              >
                <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.brand, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                  <Ionicons name="add" size={20} color={colors.brand} />
                </View>
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Add New Card</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Total and Next Button */}
      <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Total Amount</Text>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>₦{parseFloat(total).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (showSavedCards) {
              // Clear cart and proceed to payment success
              clearCart();
              router.push({ 
                pathname: '/(payments)/success', 
                params: { total, role: 'user' } 
              });
            } else {
              // Handle payment selection
            }
          }}
          style={{ backgroundColor: colors.brand, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: '#0F0F0F' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

