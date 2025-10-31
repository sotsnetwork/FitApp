import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const BRAND = '#66F2C9';

export default function EmailVerified() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 96, alignItems: 'center' }}>
      <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: '#D8FFEF', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: BRAND }} />
      </View>
      <Text style={{ fontSize: 32, fontWeight: '700', marginBottom: 12 }}>Email Verified</Text>
      <Text style={{ color: '#7A7A7A', textAlign: 'center', marginBottom: 24 }}>
        Your email was successfully verified. Proceed to account verification.
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/(forms)/account-verification')}
        style={{ backgroundColor: BRAND, paddingVertical: 18, borderRadius: 16, alignItems: 'center', alignSelf: 'stretch' }}
      >
        <Text style={{ color: '#0F0F0F', fontSize: 18, fontWeight: '600' }}>Proceed to Account Verification</Text>
      </TouchableOpacity>
    </View>
  );
}


