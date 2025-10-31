import React from 'react';
import { View } from 'react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { router } from 'expo-router';

export default function AddCard() {
  const [number, setNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [name, setName] = React.useState('');
  const [addr, setAddr] = React.useState('');
  const valid = number.length >= 12 && expiry.length >= 4 && cvc.length >= 3 && name.length > 2;
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Input placeholder="Card number" keyboardType="number-pad" value={number} onChangeText={setNumber} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Input placeholder="Expiry date" value={expiry} onChangeText={setExpiry} />
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Input placeholder="cvc/ccv" keyboardType="number-pad" value={cvc} onChangeText={setCvc} />
        </View>
      </View>
      <Input placeholder="Cardholder name" value={name} onChangeText={setName} />
      <Input placeholder="Address line 1" value={addr} onChangeText={setAddr} />
      <View style={{ height: 24 }} />
      <Button title="Next" disabled={!valid} onPress={() => router.push('/(payments)/success')} />
    </View>
  );
}


