import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function NewPassword() {
  const [pwd, setPwd] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

  const hasLowerCase = /[a-z]/.test(pwd);
  const hasUpperCase = /[A-Z]/.test(pwd);
  const hasNumber = /\d/.test(pwd);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(pwd);
  const hasMinLength = pwd.length >= 8;
  const passwordsMatch = pwd === confirm && confirm.length > 0;

  const canSave = hasMinLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && passwordsMatch;

  const handleSave = async () => {
    if (!canSave) return;

    setIsSaving(true);
    try {
      // Save password to AsyncStorage (in a real app, you'd send this to your backend API)
      await AsyncStorage.setItem('userPassword', pwd);
      
      // Show success message and navigate to login
      Alert.alert('Success', 'Your password has been saved successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(auth)/login'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save password. Please try again.');
      setIsSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg, paddingTop: 64, backgroundColor: 'white' }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 32, fontFamily: fonts.bold, marginBottom: 16 }}>Create new password</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular, fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus.
      </Text>
      <Input value={pwd} onChangeText={setPwd} placeholder="New password" secureTextEntry leftIcon="lock-closed-outline" showClearIcon />
      <Input
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Confirm Password"
        secureTextEntry
        leftIcon="lock-closed-outline"
        showClearIcon
        error={confirm && !passwordsMatch ? 'Passwords do not match' : ''}
      />
      <View style={{ marginVertical: spacing.md }}>
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
      <View style={{ height: spacing.lg }} />
      <Button title="Save New Password" disabled={!canSave || isSaving} onPress={handleSave} />
    </View>
  );
}


