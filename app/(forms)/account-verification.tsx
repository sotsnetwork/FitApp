import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const BRAND = '#66F2C9';

export default function AccountVerification() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 36, fontWeight: '700', marginBottom: 8 }}>Complete Account Verification</Text>
      <Text style={{ color: '#7A7A7A', marginBottom: 16 }}>
        Provide your business information
      </Text>

      <Input placeholder="Business Name" />
      <Input placeholder="Product Category" />

      <View style={{ height: 24 }} />
      <Button title="Next" onPress={() => router.push('/(forms)/bank-setup')} />
    </View>
  );
}

const styles = {} as const;


