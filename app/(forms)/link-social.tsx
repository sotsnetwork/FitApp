import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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

      {/* TikTok */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
        <Image
          source={require('../../assets/Tiktok.png')}
          style={{ width: 28, height: 28, borderRadius: 6, marginRight: spacing.sm }}
          resizeMode="contain"
        />
        <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>TIKTOK</Text>
      </View>
      <Input placeholder="Paste Link" value={tiktok} onChangeText={setTiktok} showClearIcon />

      {/* Instagram */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
        <Image
          source={require('../../assets/Instagram.png')}
          style={{ width: 28, height: 28, borderRadius: 6, marginRight: spacing.sm }}
          resizeMode="contain"
        />
        <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>INSTAGRAM</Text>
      </View>
      <Input placeholder="Paste Link" value={instagram} onChangeText={setInstagram} showClearIcon />

      {/* Facebook */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
        <Image
          source={require('../../assets/Facebook.png')}
          style={{ width: 28, height: 28, borderRadius: 6, marginRight: spacing.sm }}
          resizeMode="contain"
        />
        <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>FACEBOOK</Text>
      </View>
      <Input placeholder="Paste Link" value={facebook} onChangeText={setFacebook} showClearIcon />

      <View style={{ flex: 1 }} />
      <View style={{ paddingBottom: spacing.lg }}>
        <Button 
          title="Next" 
          onPress={() => router.push({ pathname: '/(verify)/account-verified', params: { role } })} 
        />
      </View>
    </View>
  );
}

