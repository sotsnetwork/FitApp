import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import MenuOverlay from './menu-overlay';

export default function VendorEarn() {
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
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>EARN</Text>
        <TouchableOpacity onPress={() => router.push('/(vendor)/payment-history')}>
          <Ionicons name="receipt-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Total Balance */}
        <View style={{ padding: spacing.lg, margin: spacing.lg, borderRadius: 16, alignItems: 'center' }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.brandTint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontSize: 32, fontFamily: fonts.bold }}>FP</Text>
          </View>
          <Text style={{ fontFamily: fonts.bold, fontSize: 32, color: colors.text, marginBottom: spacing.xs }}>$5,678</Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.subtext }}>Total balance</Text>
        </View>

        {/* Activity Categories */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          <Text style={{ fontFamily: fonts.bold, fontSize: 18, marginBottom: spacing.md }}>Activity</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activityCategories.map((category, index) => (
              <View key={index} style={{ marginRight: spacing.md, alignItems: 'center', minWidth: 100 }}>
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: category.color + '20', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs }}>
                  <Ionicons name={category.icon as any} size={28} color={category.color} />
                </View>
                <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.text, marginBottom: spacing.xs }}>{category.count}</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext, textAlign: 'center' }}>{category.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Filter and Earnings List */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>Earnings</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.subtext }}>{highestEarningFilter}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.subtext} />
            </TouchableOpacity>
          </View>

          {filteredEarnings.map((earning) => (
            <View key={earning.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: colors.text, marginBottom: spacing.xs }}>{earning.title}</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>{earning.views}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.brand }}>{earning.amount}</Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>{earning.date.toLocaleDateString()}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} currentScreen="earn" />

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: spacing.md, minWidth: 200 }}>
            {['Most Recent', 'Highest Earning', 'Lowest Earning', 'Oldest'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => {
                  setHighestEarningFilter(filter);
                  setFilterModalVisible(false);
                }}
                style={{ paddingVertical: spacing.md }}
              >
                <Text style={{ fontFamily: fonts.regular, color: highestEarningFilter === filter ? colors.brand : colors.text }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

