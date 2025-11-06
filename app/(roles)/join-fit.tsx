import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import { router } from 'expo-router';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function JoinFit() {
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Navigate after a short delay to show the selection
    setTimeout(() => {
      router.push(`/(auth)/signup?role=${role}`);
    }, 200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: spacing.lg, paddingTop: 64 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
        <Image
          source={require('../../assets/black fit logo.png')}
          style={{ width: 84, height: 84, resizeMode: 'contain', marginBottom: spacing.lg }}
        />
        <Text style={{ fontSize: 36, fontFamily: fonts.bold, marginBottom: spacing.xl }}>Join Fit</Text>
      </View>
      
      <Button 
        title="As a User" 
        variant={selectedRole === 'user' ? 'primary' : 'ghost'} 
        onPress={() => handleRoleSelect('user')} 
      />
      <View style={{ height: spacing.sm }} />
      <Button 
        title="As a Creator" 
        variant={selectedRole === 'creator' ? 'primary' : 'ghost'} 
        onPress={() => handleRoleSelect('creator')} 
      />
      <View style={{ height: spacing.sm }} />
      <Button 
        title="As a Vendor" 
        variant={selectedRole === 'vendor' ? 'primary' : 'ghost'} 
        onPress={() => handleRoleSelect('vendor')} 
      />
    </View>
  );
}


