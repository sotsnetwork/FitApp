import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const BRAND = '#66F2C9';

export default function BankSetup() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 36, fontWeight: '700', marginBottom: 8 }}>Setup Withdrawal Account</Text>
      <Text style={{ color: '#7A7A7A', marginBottom: 16 }}>Enter your bank details</Text>
      <Input placeholder="Account Type" />
      <Input placeholder="Bank Name" />
      <Input placeholder="Account Number" keyboardType="number-pad" />

      <View style={{ height: 24 }} />
      <Button title="Next" onPress={() => router.push('/(payments)/select-method')} />
    </View>
  );
}

const styles = {} as const;


