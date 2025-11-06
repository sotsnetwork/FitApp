import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { spacing, fonts, colors } from '../../theme/tokens';

interface MenuOverlayProps {
  visible: boolean;
  onClose: () => void;
  currentScreen: string;
}

export default function UserMenuOverlay({ visible, onClose, currentScreen }: MenuOverlayProps) {
  const slideAnim = useRef(new Animated.Value(-340)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -340,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'home-outline', route: '/(user)/home' },
    { id: 'saved-videos', label: 'Saved Videos', icon: 'bookmark-outline', route: '/(user)/saved-videos' },
    { id: 'shopping-cart', label: 'Shopping Cart', icon: 'bag-outline', route: '/(user)/shop' },
  ];

  const handleNavigation = (route: string) => {
    onClose();
    router.push(route as any);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Animated.View style={{ width: 340, backgroundColor: 'white', transform: [{ translateX: slideAnim }] }}>
          {/* Profile Section */}
          <View style={{ padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 24 }}>👤</Text>
            </View>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.xs }}>Victor Drason</Text>
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, lineHeight: 20 }}>
              Enthusiast about exercise, health fitness and recreation
            </Text>
          </View>

          {/* Menu Items */}
          <View style={{ paddingVertical: spacing.md }}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleNavigation(item.route)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  backgroundColor: currentScreen === item.id ? colors.brandTint : 'transparent',
                }}
              >
                <Ionicons name={item.icon as any} size={24} color={currentScreen === item.id ? colors.brand : colors.text} style={{ marginRight: spacing.md }} />
                <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: currentScreen === item.id ? colors.brand : colors.text }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} activeOpacity={1} onPress={onClose} />
      </View>
    </Modal>
  );
}

