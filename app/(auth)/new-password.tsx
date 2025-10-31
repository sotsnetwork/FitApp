import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function NewPassword() {
  const [pwd, setPwd] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const canSave = pwd.length >= 8 && /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd) && pwd === confirm;
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 32, fontWeight: '700', marginBottom: 16 }}>Create new password</Text>
      <Input value={pwd} onChangeText={setPwd} placeholder="New password" secureTextEntry />
      <Input value={confirm} onChangeText={setConfirm} placeholder="Confirm Password" secureTextEntry error={confirm && confirm !== pwd ? 'Passwords do not match' : ''} />
      <View style={{ height: 24 }} />
      <Button title="Save New Password" disabled={!canSave} onPress={() => {}} />
    </View>
  );
}


