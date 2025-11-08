import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import Input from '../../components/ui/Input';

export default function EditAddress() {
  const params = useLocalSearchParams();
  const total = params.total as string || '0';
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [state, setState] = React.useState('Abuja');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [stateModalVisible, setStateModalVisible] = React.useState(false);

  const nigerianStates = [
    'Abuja', 'Lagos', 'Kano', 'Rivers', 'Kaduna', 'Oyo', 'Delta', 'Enugu', 'Anambra', 'Ogun',
    'Imo', 'Plateau', 'Edo', 'Akwa Ibom', 'Cross River', 'Abia', 'Sokoto', 'Bauchi', 'Bayelsa',
    'Osun', 'Benue', 'Borno', 'Katsina', 'Kwara', 'Niger', 'Ebonyi', 'Taraba', 'Gombe', 'Yobe',
    'Zamfara', 'Adamawa', 'Ekiti', 'Jigawa', 'Kebbi', 'Nasarawa'
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Edit Address</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.lg, lineHeight: 20 }}>
            Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies
          </Text>

          <Input
            label="Name"
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
            showClearIcon={name.length > 0}
            containerStyle={{ marginBottom: spacing.lg }}
          />

          <Input
            label="Surname"
            placeholder="Enter Surname"
            value={surname}
            onChangeText={setSurname}
            showClearIcon={surname.length > 0}
            containerStyle={{ marginBottom: spacing.lg }}
          />

          <Input
            label="Ship to (Address)"
            placeholder="Enter Address"
            value={address}
            onChangeText={setAddress}
            showClearIcon={address.length > 0}
            containerStyle={{ marginBottom: spacing.lg }}
          />

          <TouchableOpacity onPress={() => setStateModalVisible(true)} style={{ marginBottom: spacing.lg }}>
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.sm, color: colors.text }}>State</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.md, paddingVertical: spacing.md }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: state ? colors.text : colors.subtext }}>
                {state || 'Select State'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.subtext} />
            </View>
          </TouchableOpacity>

          <Input
            label="Phone Number"
            placeholder="(0)XXXXXXXX"
            value={phone}
            onChangeText={setPhone}
            showClearIcon={phone.length > 0}
            keyboardType="phone-pad"
            containerStyle={{ marginBottom: spacing.lg }}
          />

          <Input
            label="Email"
            placeholder="XXXXXX@gmail.com"
            value={email}
            onChangeText={setEmail}
            showClearIcon={email.length > 0}
            keyboardType="email-address"
            containerStyle={{ marginBottom: spacing.lg }}
          />
        </View>
      </ScrollView>

      {/* Total and Proceed Button */}
      <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>Total Amount</Text>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>₦{parseFloat(total).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push({ 
            pathname: '/(user)/select-payment', 
            params: { total } 
          })}
          style={{ backgroundColor: colors.brand, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: '#0F0F0F' }}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      {/* State Modal */}
      <Modal visible={stateModalVisible} transparent animationType="slide" onRequestClose={() => setStateModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setStateModalVisible(false)} />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '70%' }}>
            <View style={{ padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Select State</Text>
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {nigerianStates.map((stateName) => (
                <TouchableOpacity
                  key={stateName}
                  onPress={() => {
                    setState(stateName);
                    setStateModalVisible(false);
                  }}
                  style={{
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.lg,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: state === stateName ? colors.brand : colors.text }}>
                    {stateName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

