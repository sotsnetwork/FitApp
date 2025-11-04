import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
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
  // Street address not in the final design; removed to match Figma
  const [landmark, setLandmark] = React.useState('');

  const [countryOpen, setCountryOpen] = React.useState(false);
  const [stateOpen, setStateOpen] = React.useState(false);

  const countries = ['Nigeria', 'Ghana', 'Kenya', 'Zambia'];
  // Full list of Nigeria's 36 states & capital + FCT
  const nigeriaStatesAndCapitals: { state: string; capital: string }[] = [
    { state: 'Abia', capital: 'Umuahia' },
    { state: 'Adamawa', capital: 'Yola' },
    { state: 'Akwa Ibom', capital: 'Uyo' },
    { state: 'Anambra', capital: 'Awka' },
    { state: 'Bauchi', capital: 'Bauchi' },
    { state: 'Bayelsa', capital: 'Yenagoa' },
    { state: 'Benue', capital: 'Makurdi' },
    { state: 'Borno', capital: 'Maiduguri' },
    { state: 'Cross River', capital: 'Calabar' },
    { state: 'Delta', capital: 'Asaba' },
    { state: 'Ebonyi', capital: 'Abakaliki' },
    { state: 'Edo', capital: 'Benin City' },
    { state: 'Ekiti', capital: 'Ado-Ekiti' },
    { state: 'Enugu', capital: 'Enugu' },
    { state: 'Gombe', capital: 'Gombe' },
    { state: 'Imo', capital: 'Owerri' },
    { state: 'Jigawa', capital: 'Dutse' },
    { state: 'Kaduna', capital: 'Kaduna' },
    { state: 'Kano', capital: 'Kano' },
    { state: 'Katsina', capital: 'Katsina' },
    { state: 'Kebbi', capital: 'Birnin Kebbi' },
    { state: 'Kogi', capital: 'Lokoja' },
    { state: 'Kwara', capital: 'Ilorin' },
    { state: 'Lagos', capital: 'Ikeja' },
    { state: 'Nasarawa', capital: 'Lafia' },
    { state: 'Niger', capital: 'Minna' },
    { state: 'Ogun', capital: 'Abeokuta' },
    { state: 'Ondo', capital: 'Akure' },
    { state: 'Osun', capital: 'Osogbo' },
    { state: 'Oyo', capital: 'Ibadan' },
    { state: 'Plateau', capital: 'Jos' },
    { state: 'Rivers', capital: 'Port Harcourt' },
    { state: 'Sokoto', capital: 'Sokoto' },
    { state: 'Taraba', capital: 'Jalingo' },
    { state: 'Yobe', capital: 'Damaturu' },
    { state: 'Zamfara', capital: 'Gusau' },
    { state: 'FCT', capital: 'Abuja' },
  ];
  const stateMap: Record<string, string[]> = {
    Nigeria: nigeriaStatesAndCapitals.map(({ state, capital }) => `${state} (${capital})`),
    Ghana: [
      'Greater Accra', 'Ashanti', 'Western', 'Western North', 'Central', 'Eastern', 'Volta', 'Oti',
      'Northern', 'Savannah', 'North East', 'Upper East', 'Upper West', 'Bono', 'Bono East', 'Ahafo',
    ],
    Zambia: [
      'Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka', 'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western',
    ],
    Kenya: [
      'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega',
      'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni',
      'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang’a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
      'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga',
      'Wajir', 'West Pokot',
    ],
  };
  const statesForSelected = stateMap[country] || [];

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Contact Details</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular, fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>

      {/* Country of Citizenship (dropdown) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setCountryOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 16,
          padding: spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ flex: 1, color: country ? colors.text : colors.subtext, fontFamily: fonts.regular }}>
          {country || 'Country of Citizenship'}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.subtext} />
      </TouchableOpacity>

      {/* State / City (two columns) */}
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setStateOpen(true)}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              padding: spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ flex: 1, color: state ? colors.text : colors.subtext, fontFamily: fonts.regular }}>
              {state || 'State/Province'}
            </Text>
            <Ionicons name="chevron-down" size={18} color={colors.subtext} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Input placeholder="City" value={city} onChangeText={setCity} />
        </View>
      </View>

      {/* Shop Address - text input field */}
      <Input 
        placeholder="Shop Address" 
        value={shopAddress} 
        onChangeText={setShopAddress}
        leftIcon="location-outline"
      />

      {/* Closest Landmark - text input field */}
      <Input 
        placeholder="Closest Landmark" 
        value={landmark} 
        onChangeText={setLandmark}
        leftIcon="flag-outline"
      />

      <View style={{ height: spacing.lg }} />
      <Button 
        title="Next" 
        onPress={() => router.push({ pathname: '/(forms)/link-social', params: { role } })} 
      />
      {/* Country Picker Modal */}
      <Modal visible={countryOpen} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg, maxHeight: '60%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
              <TouchableOpacity onPress={() => setCountryOpen(false)}>
                <Text style={{ fontFamily: fonts.regular, color: colors.brand }}>Close</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: fonts.semibold }}>Select Country</Text>
              <View style={{ width: 48 }} />
            </View>
            <ScrollView>
              {countries.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => {
                    setCountry(c);
                    setState('');
                    setCountryOpen(false);
                  }}
                  style={{ paddingVertical: spacing.md }}
                >
                  <Text style={{ fontFamily: fonts.regular, color: colors.text }}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* State Picker Modal */}
      <Modal visible={stateOpen} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg, maxHeight: '60%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
              <TouchableOpacity onPress={() => setStateOpen(false)}>
                <Text style={{ fontFamily: fonts.regular, color: colors.brand }}>Close</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: fonts.semibold }}>Select State/Province</Text>
              <View style={{ width: 48 }} />
            </View>
            <ScrollView>
              {(statesForSelected.length ? statesForSelected : ['Select a country first']).map((s) => (
                <TouchableOpacity
                  key={s}
                  disabled={!statesForSelected.length}
                  onPress={() => {
                    setState(s);
                    setStateOpen(false);
                  }}
                  style={{ paddingVertical: spacing.md, opacity: statesForSelected.length ? 1 : 0.5 }}
                >
                  <Text style={{ fontFamily: fonts.regular, color: colors.text }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

