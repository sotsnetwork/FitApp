import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/ui/Button';
import { router } from 'expo-router';

const BRAND = '#66F2C9';

export default function SelectPaymentType() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: '700', marginBottom: 16 }}>Select payment type</Text>
      {['NGN Debit/Credit Card', 'USD Debit/Credit Card', 'Wallet', 'Paystack'].map((label) => (
        <View key={label} style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' }}>
          <Text style={{ fontSize: 16 }}>{label}</Text>
        </View>
      ))}
      <View style={{ height: 24 }} />
      <Button title="Next" onPress={() => router.push('/(payments)/select-saved')} />
    </View>
  );
}


