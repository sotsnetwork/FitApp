import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function LinkSocial() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const [tiktok, setTiktok] = React.useState('');
  const [instagram, setInstagram] = React.useState('');
  const [facebook, setFacebook] = React.useState('');

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Link Social Media Accounts</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular, fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
          <Text style={{ color: 'white', fontSize: 12, fontFamily: fonts.bold }}>TT</Text>
        </View>
        <Input placeholder="Paste Link" value={tiktok} onChangeText={setTiktok} showClearIcon style={{ flex: 1 }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#E4405F', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
          <Text style={{ color: 'white', fontSize: 12, fontFamily: fonts.bold }}>IG</Text>
        </View>
        <Input placeholder="Paste Link" value={instagram} onChangeText={setInstagram} showClearIcon style={{ flex: 1 }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#1877F2', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
          <Text style={{ color: 'white', fontSize: 12, fontFamily: fonts.bold }}>FB</Text>
        </View>
        <Input placeholder="Paste Link" value={facebook} onChangeText={setFacebook} showClearIcon style={{ flex: 1 }} />
      </View>

      <View style={{ height: spacing.lg }} />
      <Button 
        title="Next" 
        onPress={() => router.push({ pathname: '/(verify)/account-verified', params: { role } })} 
      />
    </View>
  );
}

