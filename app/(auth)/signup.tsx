import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function Signup() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [referralCode, setReferralCode] = React.useState('');

  const emailOk = /.+@.+\..+/.test(email);
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;
  const pwdOk = hasMinLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
  const phoneOk = phone.length >= 10;
  const phoneError = phone.length > 0 && !phoneOk;
  const canSubmit = emailOk && username.length >= 2 && pwdOk && phoneOk;

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 40, fontFamily: fonts.bold, marginBottom: 8 }}>Create Account</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular }}>
        New users can earn up to ₦5000 upon Registration.
      </Text>
      <Input value={email} onChangeText={setEmail} placeholder="Enter email" leftIcon="mail-outline" showClearIcon />
      <Input value={username} onChangeText={setUsername} placeholder="Enter username" leftIcon="person-outline" showClearIcon />
      <View>
        <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry leftIcon="lock-closed-outline" showClearIcon />
        <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.xs }}>
            <Text style={{ color: hasLowerCase ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
              {hasLowerCase ? '✓' : '✗'} 1 small letter
            </Text>
            <Text style={{ color: hasUpperCase ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
              {hasUpperCase ? '✓' : '✗'} 1 capital letter
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={{ color: hasNumber ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
              {hasNumber ? '✓' : '✗'} 1 number
            </Text>
            <Text style={{ color: hasSpecialChar ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
              {hasSpecialChar ? '✓' : '✗'} 1 special character
            </Text>
            <Text style={{ color: hasMinLength ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12 }}>
              {hasMinLength ? '✓' : '✗'} 8 characters
            </Text>
          </View>
        </View>
      </View>
      <Input
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        keyboardType="phone-pad"
        error={phoneError ? 'Oh, snapp! Some error message.' : ''}
      />
      <Input value={referralCode} onChangeText={setReferralCode} placeholder="Referral code (optional)" />

      <View style={{ height: spacing.lg }} />
      <Button title="Submit" disabled={!canSubmit} onPress={() => router.push('/(verify)/phone-verify')} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.md }}>
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

const styles = {} as const;


