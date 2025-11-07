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
        return '#E8F5E9';
      case 'pending':
        return '#FFF9E6';
      case 'blocked':
        return '#FFEBEE';
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
        <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>Payment History</Text>
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
            borderBottomWidth: viewMode === 'overview' ? 2 : 0,
            borderBottomColor: colors.brand,
            marginRight: spacing.sm,
          }}
        >
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: viewMode === 'overview' ? colors.brand : colors.subtext }}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('detailed')}
          style={{
            flex: 1,
            paddingVertical: spacing.sm,
            alignItems: 'center',
            borderBottomWidth: viewMode === 'detailed' ? 2 : 0,
            borderBottomColor: colors.brand,
          }}
        >
          <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: viewMode === 'detailed' ? colors.brand : colors.subtext }}>
            Detailed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: spacing.lg }}>
          {viewMode === 'overview' ? (
            <>
              {/* Earnings Section */}
              <View style={{ marginBottom: spacing.xl }}>
                <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Earnings</Text>
                {transactions.filter((t) => t.type === 'earning').map((transaction) => (
                  <View
                    key={transaction.id}
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
                      <Text style={{ fontSize: 14, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>{transaction.title}</Text>
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{transaction.date}</Text>
                    </View>
                    <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: colors.brand }}>{transaction.amount}</Text>
                  </View>
                ))}
              </View>

              {/* Withdrawals Section */}
              <View>
                <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginBottom: spacing.md }}>Withdrawals</Text>
                {transactions.filter((t) => t.type === 'withdrawal').map((transaction) => (
                  <View
                    key={transaction.id}
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
                      <Text style={{ fontSize: 14, fontFamily: fonts.semibold, marginBottom: spacing.xs }}>{transaction.title}</Text>
                      <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{transaction.date}</Text>
                    </View>
                    <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: '#F44336' }}>{transaction.amount}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              {/* Detailed Transactions */}
              {detailedTransactions.map((transaction, index) => (
                <View
                  key={transaction.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: spacing.md,
                    borderBottomWidth: index < detailedTransactions.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                      <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginRight: spacing.sm }}>{transaction.amount}</Text>
                      {transaction.status && (
                        <View
                          style={{
                            backgroundColor: getStatusBgColor(transaction.status),
                            paddingHorizontal: spacing.sm,
                            paddingVertical: 2,
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: fonts.semibold,
                              color: getStatusColor(transaction.status),
                              textTransform: 'capitalize',
                            }}
                          >
                            {transaction.status}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext }}>{transaction.date}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedTransaction(transaction)}>
                    <Ionicons name="ellipsis-vertical" size={20} color={colors.subtext} />
                  </TouchableOpacity>
                </View>
              ))}

              {/* View More Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: colors.brand,
                  paddingVertical: spacing.md,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginTop: spacing.lg,
                }}
              >
                <Text style={{ fontSize: 14, fontFamily: fonts.semibold, color: '#0F0F0F' }}>View more</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Menu Modal */}
      <Modal visible={menuModalVisible} transparent animationType="fade" onRequestClose={() => setMenuModalVisible(false)}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setMenuModalVisible(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: spacing.md, minWidth: 200 }}>
            <TouchableOpacity
              style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}
              onPress={() => {
                setMenuModalVisible(false);
                // Add export functionality
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: spacing.md }}
              onPress={() => {
                setMenuModalVisible(false);
                // Add filter functionality
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>Filter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

