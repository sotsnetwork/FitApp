import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function CreatorEarn() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [highestEarningFilter, setHighestEarningFilter] = React.useState('Most Recent');
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);

  const activityCategories = [
    { label: 'Approved', count: 785, icon: 'checkmark-circle', color: '#4CAF50' },
    { label: 'Ongoing', count: 5, icon: 'time-outline', color: '#9C27B0' },
    { label: 'Requiring documents', count: 4, icon: 'document-text-outline', color: '#FFC107' },
    { label: 'Rejected', count: 8, icon: 'close-circle', color: '#F44336' },
    { label: 'Disbursed', count: 785, icon: 'archive-outline', color: '#2196F3' },
  ];

  const allEarnings = [
    { id: '1', title: 'Video Title', views: '20k View', amount: '$34.00', amountValue: 34.00, date: new Date('2024-09-15') },
    { id: '2', title: 'Video Title', views: '15k View', amount: '$28.00', amountValue: 28.00, date: new Date('2024-09-10') },
    { id: '3', title: 'Video Title', views: '12k View', amount: '$22.00', amountValue: 22.00, date: new Date('2024-09-05') },
    { id: '4', title: 'Video Title', views: '25k View', amount: '$40.00', amountValue: 40.00, date: new Date('2024-09-20') },
    { id: '5', title: 'Video Title', views: '8k View', amount: '$18.00', amountValue: 18.00, date: new Date('2024-09-01') },
  ];

  // Filter earnings based on selected filter
  const filteredEarnings = React.useMemo(() => {
    const earnings = [...allEarnings];
    switch (highestEarningFilter) {
      case 'Highest Earning':
        return earnings.sort((a, b) => b.amountValue - a.amountValue);
      case 'Lowest Earning':
        return earnings.sort((a, b) => a.amountValue - b.amountValue);
      case 'Most Recent':
        return earnings.sort((a, b) => b.date.getTime() - a.date.getTime());
      case 'Oldest':
        return earnings.sort((a, b) => a.date.getTime() - b.date.getTime());
      default:
        return earnings;
    }
  }, [highestEarningFilter]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>EARN</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          {/* Receipt icon to open Payment History */}
          <TouchableOpacity onPress={() => router.push('/(creator)/payment-history')}>
            <Ionicons name="receipt-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {/* Total Balance Card (match product design: dark card with light text) */}
          <View style={{ backgroundColor: '#3B3B3B', borderRadius: 12, padding: spacing.lg, marginBottom: spacing.lg }}>
            <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: '#FFFFFF', opacity: 0.9, marginBottom: spacing.xs }}>Total balance</Text>
            <Text style={{ fontSize: 32, fontFamily: fonts.bold, color: '#FFFFFF' }}>EP $5,678</Text>
          </View>

          {/* Activity Categories */}
          <View style={{ marginBottom: spacing.lg }}>
            {activityCategories.map((category, index) => (
              <TouchableOpacity
                key={category.label}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  borderBottomWidth: index < activityCategories.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
                onPress={() => router.push('/(creator)/payment-history')}
              >
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: category.color + '20', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }}>
                  <Ionicons name={category.icon as any} size={20} color={category.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontFamily: fonts.regular, color: colors.text }}>{category.count} {category.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Earnings Section */}
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Earnings</Text>
              <TouchableOpacity
                onPress={() => setFilterModalVisible(true)}
                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.brand, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 12, fontFamily: fonts.semibold, color: '#0F0F0F', marginRight: spacing.xs }}>{highestEarningFilter}</Text>
                <Ionicons name="chevron-down" size={16} color="#0F0F0F" />
              </TouchableOpacity>
            </View>

            <View style={{ gap: spacing.md }}>
              {filteredEarnings.map((earning) => (
                <TouchableOpacity
                  key={earning.id}
                  style={{ flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 12, padding: spacing.md, alignItems: 'center' }}
                  onPress={() => router.push('/(creator)/payment-history')}
                >
                  <View style={{ width: 60, height: 60, backgroundColor: colors.border, borderRadius: 8, marginRight: spacing.md, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="play-circle" size={32} color={colors.subtext} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>{earning.title}</Text>
                    <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{earning.views}</Text>
                  </View>
                  <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: colors.text }}>{earning.amount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Highest Earning Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setFilterModalVisible(false)}
          />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
            <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
            </View>
            {['Most Recent', 'Highest Earning', 'Lowest Earning', 'Oldest'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setHighestEarningFilter(filter);
                  setFilterModalVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.lg,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{filter}</Text>
                {highestEarningFilter === filter && (
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setFilterModalVisible(false)}
              style={{ backgroundColor: colors.text, marginHorizontal: spacing.lg, marginTop: spacing.lg, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: 'white' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="earn" />
    </SafeAreaView>
  );
}

