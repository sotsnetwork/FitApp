import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal';
  title: string;
  amount: string;
  date: string;
  status?: 'disbursed' | 'pending' | 'blocked';
}

export default function PaymentHistory() {
  const [viewMode, setViewMode] = React.useState<'overview' | 'detailed'>('overview');
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const [menuModalVisible, setMenuModalVisible] = React.useState(false);

  const transactions: Transaction[] = [
    { id: '1', type: 'earning', title: 'Earning Paid Challenge', amount: '+$182.82', date: '01 Jun 2025' },
    { id: '2', type: 'earning', title: 'Earning Sponsored Bonus', amount: '+$59.92', date: '01 Jun 2025' },
    { id: '3', type: 'earning', title: 'Earning Sell outs', amount: '+$76.92', date: '01 Jun 2025' },
    { id: '4', type: 'withdrawal', title: 'Withdrawal', amount: '-$65.00', date: '01 Jun 2025' },
  ];

  const detailedTransactions: Transaction[] = [
    { id: '1', type: 'earning', title: 'Earning', amount: 'EP 9,500.00', date: '5 Sept 2024', status: 'disbursed' },
    { id: '2', type: 'earning', title: 'Earning', amount: 'EP 9,500.00', date: '5 Sept 2024', status: 'pending' },
    { id: '3', type: 'earning', title: 'Earning', amount: 'EP 9,500.00', date: '5 Sept 2024', status: 'blocked' },
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'disbursed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'blocked':
        return '#F44336';
      default:
        return colors.subtext;
    }
  };

  const getStatusBgColor = (status?: string) => {
    switch (status) {
      case 'disbursed':
        return '#4CAF5020';
      case 'pending':
        return '#FFC10720';
      case 'blocked':
        return '#F4433620';
      default:
        return colors.border;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>PAYMENT HISTORY</Text>
        <TouchableOpacity onPress={() => setMenuModalVisible(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* View Mode Toggle */}
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
        <TouchableOpacity
          onPress={() => setViewMode('overview')}
          style={{
            flex: 1,
            paddingVertical: spacing.sm,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: viewMode === 'overview' ? colors.brand : 'transparent',
          }}
        >
          <Text style={{ fontFamily: viewMode === 'overview' ? fonts.semibold : fonts.regular, color: viewMode === 'overview' ? colors.brand : colors.subtext }}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('detailed')}
          style={{
            flex: 1,
            paddingVertical: spacing.sm,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: viewMode === 'detailed' ? colors.brand : 'transparent',
          }}
        >
          <Text style={{ fontFamily: viewMode === 'detailed' ? fonts.semibold : fonts.regular, color: viewMode === 'detailed' ? colors.brand : colors.subtext }}>
            Detailed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {viewMode === 'overview' ? (
          <View style={{ padding: spacing.lg }}>
            {transactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => setSelectedTransaction(transaction)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: colors.text, marginBottom: spacing.xs }}>
                    {transaction.title}
                  </Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>{transaction.date}</Text>
                </View>
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 18,
                    color: transaction.type === 'earning' ? colors.brand : '#F44336',
                  }}
                >
                  {transaction.amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{ padding: spacing.lg }}>
            {detailedTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => setSelectedTransaction(transaction)}
                style={{
                  padding: spacing.md,
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  marginBottom: spacing.md,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: colors.text }}>{transaction.title}</Text>
                  <View
                    style={{
                      backgroundColor: getStatusBgColor(transaction.status),
                      paddingHorizontal: spacing.sm,
                      paddingVertical: spacing.xs,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.semibold, fontSize: 12, color: getStatusColor(transaction.status) }}>
                      {transaction.status?.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.brand, marginBottom: spacing.xs }}>
                  {transaction.amount}
                </Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.subtext }}>{transaction.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Transaction Detail Modal */}
      <Modal
        visible={selectedTransaction !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.xl }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg }}>
              <Text style={{ fontFamily: fonts.bold, fontSize: 20 }}>Transaction Details</Text>
              <TouchableOpacity onPress={() => setSelectedTransaction(null)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            {selectedTransaction && (
              <>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>{selectedTransaction.title}</Text>
                <Text style={{ fontFamily: fonts.bold, fontSize: 24, color: colors.brand, marginBottom: spacing.xs }}>
                  {selectedTransaction.amount}
                </Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.subtext, marginBottom: spacing.lg }}>
                  {selectedTransaction.date}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedTransaction(null)}
                  style={{ backgroundColor: colors.brand, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
                >
                  <Text style={{ fontFamily: fonts.semibold, color: '#0F0F0F' }}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Menu Modal */}
      <Modal
        visible={menuModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setMenuModalVisible(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: spacing.md, minWidth: 200 }}>
            <TouchableOpacity onPress={() => { setMenuModalVisible(false); }} style={{ paddingVertical: spacing.md }}>
              <Text style={{ fontFamily: fonts.regular, color: colors.text }}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuModalVisible(false); }} style={{ paddingVertical: spacing.md }}>
              <Text style={{ fontFamily: fonts.regular, color: colors.text }}>Filter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

