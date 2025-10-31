import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';

const BRAND = '#66F2C9';

export default function PhoneVerify() {
  const [code, setCode] = React.useState('');
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 36, fontWeight: '700', marginBottom: 16 }}>Verify Phone</Text>
      <Text style={{ color: '#7A7A7A', marginBottom: 16 }}>Enter the 4-digit code we sent you</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={4}
        style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, padding: 16, letterSpacing: 12, textAlign: 'center', fontSize: 24 }}
      />
      <View style={{ height: 24 }} />
      <TouchableOpacity
        onPress={() => router.push('/(verify)/email-verify')}
        style={{ backgroundColor: BRAND, paddingVertical: 18, borderRadius: 16, alignItems: 'center' }}
      >
        <Text style={{ color: '#0F0F0F', fontSize: 18, fontWeight: '600' }}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
}


