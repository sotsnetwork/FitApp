import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
        <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: fonts.bold }}>♪</Text>
        </View>
        <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>TIKTOK</Text>
      </View>
      <Input placeholder="Paste Link" value={tiktok} onChangeText={setTiktok} showClearIcon />

      {/* Instagram */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
        <View style={{ width: 28, height: 28, borderRadius: 6, overflow: 'hidden', marginRight: spacing.sm }}>
          <LinearGradient
            colors={['#833AB4', '#FD1D1D', '#FCB045']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={{ position: 'relative', width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
              {/* Camera lens - large circle */}
              <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: '#FFFFFF' }} />
              {/* Viewfinder - small circle in top right */}
              <View style={{ position: 'absolute', top: -2, right: -2, width: 4, height: 4, borderRadius: 2, borderWidth: 1, borderColor: '#FFFFFF' }} />
              {/* Plus sign next to viewfinder */}
              <View style={{ position: 'absolute', top: -1, right: -4, width: 2, height: 2, backgroundColor: '#FFFFFF' }} />
            </View>
          </LinearGradient>
        </View>
        <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>INSTAGRAM</Text>
      </View>
      <Input placeholder="Paste Link" value={instagram} onChangeText={setInstagram} showClearIcon />

      {/* Facebook */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
        <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#1877F2', alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: fonts.bold }}>f</Text>
        </View>
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

