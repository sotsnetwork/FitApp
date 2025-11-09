import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserRole } from '../../contexts/UserRoleContext';
import { useUserProfile } from '../../contexts/UserProfileContext';

export default function Signup() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const { setRole } = useUserRole();
  const { updateProfile } = useUserProfile();
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [referralCode, setReferralCode] = React.useState('');

  // Email validation - only allow valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailOk = emailRegex.test(email.trim());
  const emailError = email.length > 0 && !emailOk;

  // Username validation - only allow alphabets and figures (alphanumeric)
  const usernameRegex = /^[A-Za-z0-9]*$/;
  const usernameOk = username.length >= 2 && usernameRegex.test(username);
  const usernameError = username.length > 0 && !usernameOk;

  // Password validation
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;
  const pwdOk = hasMinLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;

  // Phone validation: Only allow numbers (figures)
  const phoneDigits = phone.replace(/\D/g, ''); // Remove all non-digits
  const phoneOk = phoneDigits.length >= 10;
  const phoneError = phone.length > 0 && !phoneOk;

  const canSubmit = emailOk && usernameOk && pwdOk && phoneOk;

  // Handle phone input - only allow numbers
  const handlePhoneChange = (text: string) => {
    const numbersOnly = text.replace(/\D/g, ''); // Remove all non-digits
    setPhone(numbersOnly);
  };

  // Handle username input - only allow alphabets and figures
  const handleUsernameChange = (text: string) => {
    const alphanumericOnly = text.replace(/[^A-Za-z0-9]/g, ''); // Remove all non-alphanumeric
    setUsername(alphanumericOnly);
  };

  // Handle email input - validate email format
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: spacing.lg, paddingTop: 64 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 40, fontFamily: fonts.bold, marginBottom: 8 }}>Create Account</Text>
        <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular }}>
          New users can earn up to ₦5000 upon Registration.
        </Text>
        <Input 
          value={email} 
          onChangeText={handleEmailChange} 
          placeholder="Enter email" 
          leftIcon="mail-outline" 
          showClearIcon
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={emailError ? 'Please enter a valid email address' : ''}
        />
        <Input 
          value={username} 
          onChangeText={handleUsernameChange} 
          placeholder="Enter username" 
          leftIcon="person-outline" 
          showClearIcon
          autoCapitalize="none"
          autoCorrect={false}
          error={usernameError ? 'Username can only contain letters and numbers' : ''}
        />
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
          onChangeText={handlePhoneChange}
          placeholder="Phone number"
          keyboardType="phone-pad"
          error={phoneError ? 'Phone number must be at least 10 digits' : ''}
        />
        <Input value={referralCode} onChangeText={setReferralCode} placeholder="Referral code (optional)" />

        <View style={{ height: spacing.lg }} />
        <Button 
          title="Get Started" 
          disabled={!canSubmit} 
          onPress={async () => {
            if (!canSubmit) {
              return;
            }
            // Save user profile data from signup
            await updateProfile({
              username,
              email,
              phone,
            });
            await setRole(role as 'user' | 'creator' | 'vendor');
            router.push(`/(verify)/verify-email?role=${role}`);
          }} 
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.md, paddingBottom: spacing.xl }}>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={{ color: '#0A8C63', fontFamily: fonts.regular }}>Back to log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: '#0A8C63', fontFamily: fonts.regular }}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {} as const;


