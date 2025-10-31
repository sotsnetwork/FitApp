import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const BRAND = '#66F2C9';

export default function Signup() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const emailOk = /.+@.+\..+/.test(email);
  const pwdOk = password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
  const phoneOk = phone.length >= 10;
  const canSubmit = emailOk && username.length >= 2 && pwdOk && phoneOk;

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 40, fontWeight: '700', marginBottom: 16 }}>Create Account</Text>
      <Input value={email} onChangeText={setEmail} placeholder="Enter email" />
      <Input value={username} onChangeText={setUsername} placeholder="Enter username" />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Input value={phone} onChangeText={setPhone} placeholder="Phone number" keyboardType="phone-pad" />

      <View style={{ height: 24 }} />
      <Button title="Get Started" disabled={!canSubmit} onPress={() => router.push('/(verify)/phone-verify')} />
    </View>
  );
}

const styles = {} as const;


