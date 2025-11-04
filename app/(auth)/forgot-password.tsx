import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: 8 }}>Forget Password</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular, fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus.
      </Text>
      <Input value={email} onChangeText={setEmail} placeholder="Enter email" leftIcon="mail-outline" showClearIcon />
      <View style={{ height: spacing.lg }} />
      <Button title="Continue" onPress={() => router.push('/(auth)/verify-phone')} />
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.xl }}>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={{ color: '#0A8C63', fontFamily: fonts.regular }}>Back to log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ color: '#0A8C63', fontFamily: fonts.regular }}>Contact us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


