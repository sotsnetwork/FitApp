import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserProfile } from '../../contexts/UserProfileContext';

export default function AccountVerification() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const { updateProfile } = useUserProfile();
  const [businessName, setBusinessName] = React.useState('');
  const [productCategory, setProductCategory] = React.useState('');

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={{ fontSize: 36, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Complete Account Verification</Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular, fontSize: 14 }}>
        Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus vivamus dolor. Dolor ultricies lacus
      </Text>

      <Input placeholder="Business Name" value={businessName} onChangeText={setBusinessName} />
      <Input placeholder="Product Category" value={productCategory} onChangeText={setProductCategory} />

      <View style={{ height: spacing.lg }} />
      <Button 
        title="Next" 
        onPress={async () => {
          // Save creator/vendor business information
          await updateProfile({
            businessName,
            productCategory,
          });
          // Both Creators and Vendors need to fill Contact Details (Shop Address, Closest Landmark)
          // Users skip both Account Verification and Contact Details
          if (role === 'creator' || role === 'vendor') {
            router.push({ pathname: '/(forms)/contact-details', params: { role } });
          } else {
            router.push({ pathname: '/(forms)/link-social', params: { role } });
          }
        }} 
      />
    </View>
  );
}

const styles = {} as const;


