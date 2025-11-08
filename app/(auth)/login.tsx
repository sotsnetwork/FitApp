import React from 'react';
import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useUserRole } from '../../contexts/UserRoleContext';

const BRAND = '#66F2C9';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { role } = useUserRole();
  const canSubmit = email.length > 2 && password.length >= 6;

  const handleLogin = () => {
    // After successful login, route based on role
    // Creator and Vendor have the same login flow - both go through email-verify
    // The role will be passed to email-verify which will route accordingly
    router.push({ pathname: '/(verify)/email-verify', params: { role: role || 'user' } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 40, fontWeight: '700', marginBottom: 24 }}>Login</Text>

      <Input value={email} onChangeText={setEmail} placeholder="Enter email or username" />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />

      <View style={{ height: 24 }} />
      <Button title="Continue" disabled={!canSubmit} onPress={handleLogin} />

      <View style={{ height: 12 }} />
      <Link href="/(auth)/forgot-password" style={{ color: '#0A8C63', alignSelf: 'center' }}>
        Forgot password?
      </Link>

      <View style={{ height: 12 }} />
      <Link href="/(auth)/signup" style={{ color: '#0A8C63', alignSelf: 'center' }}>
        Create new Account
      </Link>
    </View>
  );
}


