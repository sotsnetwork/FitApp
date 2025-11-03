import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function ContactDetails() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [shopAddress, setShopAddress] = React.useState('');
  const [streetAddress, setStreetAddress] = React.useState('');
  const [landmark, setLandmark] = React.useState('');

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Contact Details</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular, fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>

      <Input placeholder="Country of Citizenship" value={country} onChangeText={setCountry} />
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <View style={{ flex: 1 }}>
          <Input placeholder="State/Province" value={state} onChangeText={setState} />
        </View>
        <View style={{ flex: 1 }}>
          <Input placeholder="Enter City" value={city} onChangeText={setCity} />
        </View>
      </View>
      <Input placeholder="Shop Address" value={shopAddress} onChangeText={setShopAddress} leftIcon="location-outline" />
      <Input placeholder="Street Address" value={streetAddress} onChangeText={setStreetAddress} />
      <Input placeholder="Closest Landmark" value={landmark} onChangeText={setLandmark} leftIcon="location-outline" />

      <View style={{ height: spacing.lg }} />
      <Button 
        title="Next" 
        onPress={() => router.push({ pathname: '/(forms)/link-social', params: { role } })} 
      />
    </View>
  );
}

