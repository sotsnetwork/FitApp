import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';

export default function BankSetup() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const { updateProfile } = useUserProfile();
  const [accountType, setAccountType] = React.useState('');
  const [bankName, setBankName] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [accountName, setAccountName] = React.useState('');

  // Users should not see this screen - redirect them to user details
  React.useEffect(() => {
    if (role === 'user') {
      router.replace({ pathname: '/(onboarding)/user-details', params: { role } });
    }
  }, [role]);

  // Simulate account name verification when account number is entered
  React.useEffect(() => {
    if (role !== 'user' && accountNumber.length >= 10) {
      setAccountName('Debby Annie'); // Mock verification
    } else {
      setAccountName('');
    }
  }, [accountNumber, role]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 36, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Setup Withdrawal Account</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular, fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>
      <Input placeholder="Account Type" value={accountType} onChangeText={setAccountType} />
      <Input placeholder="Bank Name" value={bankName} onChangeText={setBankName} />
      <Input placeholder="Account Number" keyboardType="number-pad" value={accountNumber} onChangeText={setAccountNumber} />
      {accountName ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
          <Ionicons name="checkmark-circle" size={20} color={colors.brand} />
          <Text style={{ marginLeft: spacing.xs, fontFamily: fonts.regular, color: colors.text }}>{accountName}</Text>
        </View>
      ) : null}

      <View style={{ height: spacing.lg }} />
      <Button 
        title="Next" 
        onPress={async () => {
          // Save bank account information
          await updateProfile({
            accountType,
            bankName,
            accountNumber,
            accountName,
          });
          router.push({ pathname: '/(verify)/account-added', params: { role } });
        }} 
      />
    </View>
  );
}

const styles = {} as const;


