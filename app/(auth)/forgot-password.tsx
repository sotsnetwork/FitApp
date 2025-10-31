import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: 8 }}>Forget Password</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular }}>
        Enter the email associated with your account
      </Text>
      <Input value={email} onChangeText={setEmail} placeholder="Enter email" />
      <View style={{ height: spacing.lg }} />
      <Button title="Continue" onPress={() => router.push('/(auth)/reset-sent')} />
    </View>
  );
}


