// app/transaction-history.tsx
// Matches the Transaction History design: balance card, filter tabs,
// recent activity list with status badges, pagination.

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput, FlatList,
} from 'react-native';
import { useRouter } from "expo-router";
import { C, shadow } from "../../constants/Theme";

// ── DATA ─────────────────────────────────────

type TxStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

interface Transaction {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  date: string;
  amount: string;
  isCredit: boolean;
  status: TxStatus;
  category: 'Payments' | 'Refunds' | 'Withdrawals';
}

const ALL_TRANSACTIONS: Transaction[] = [
  {
    id: '1', icon: '🎨', iconBg: '#EEF2FF',
    title: 'Payment for Brand Identity Design',
    date: 'Oct 24, 2023 • 02:30 PM',
    amount: '$1,250.00', isCredit: false, status: 'COMPLETED', category: 'Payments',
  },
  {
    id: '2', icon: '💰', iconBg: '#ECFDF5',
    title: 'Wallet Top Up (Bank Transfer)',
    date: 'Oct 23, 2023 • 10:15 AM',
    amount: '$5,000.00', isCredit: true, status: 'COMPLETED', category: 'Payments',
  },
  {
    id: '3', icon: '💻', iconBg: '#EEF2FF',
    title: 'Payment for UI Audit Service',
    date: 'Oct 22, 2023 • 11:45 AM',
    amount: '$450.00', isCredit: false, status: 'PENDING', category: 'Payments',
  },
  {
    id: '4', icon: '🏦', iconBg: '#FFF7ED',
    title: 'Withdrawal to Chase Bank',
    date: 'Oct 20, 2023 • 09:00 AM',
    amount: '$3,000.00', isCredit: false, status: 'COMPLETED', category: 'Withdrawals',
  },
  {
    id: '5', icon: '↩️', iconBg: '#FEF2F2',
    title: 'Refund: Adobe Creative Suite Subscription',
    date: 'Oct 18, 2023 • 04:20 PM',
    amount: '$52.99', isCredit: true, status: 'FAILED', category: 'Refunds',
  },
  {
    id: '6', icon: '🎯', iconBg: '#EEF2FF',
    title: 'Payment for Logo Design',
    date: 'Oct 15, 2023 • 01:00 PM',
    amount: '$320.00', isCredit: false, status: 'COMPLETED', category: 'Payments',
  },
];

const FILTER_TABS = ['All', 'Payments', 'Refunds', 'Wi...'] as const;

const STATUS_STYLE: Record<TxStatus, { bg: string; color: string }> = {
  COMPLETED: { bg: C.greenBg,   color: C.green  },
  PENDING:   { bg: '#FFF7ED',   color: C.orange },
  FAILED:    { bg: C.redBg,     color: C.red    },
};

// ── COMPONENTS ───────────────────────────────

function TxCard({ tx }: { tx: Transaction }) {
  const st = STATUS_STYLE[tx.status];
  return (
    <TouchableOpacity style={s.txCard} activeOpacity={0.82}>
      <View style={[s.txIconWrap, { backgroundColor: tx.iconBg }]}>
        <Text style={{ fontSize: 20 }}>{tx.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.txTitle}>{tx.title}</Text>
        <Text style={s.txDate}>{tx.date}</Text>
      </View>
      <View style={s.txRight}>
        <Text style={[s.txAmount, { color: tx.isCredit ? C.green : C.dark }]}>
          {tx.isCredit ? '+' : '-'}${tx.amount}
        </Text>
        <View style={[s.statusBadge, { backgroundColor: st.bg }]}>
          <Text style={[s.statusText, { color: st.color }]}>{tx.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── SCREEN ───────────────────────────────────

export default function TransactionHistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const TOTAL_PAGES = 3;

  const filtered = ALL_TRANSACTIONS.filter(tx => {
    const matchTab = activeTab === 'All' || tx.category === activeTab;
    const matchSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <SafeAreaView style={s.safe}>
      {/* ── Custom Header ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Transaction History</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* ── Balance Card ── */}
        <View style={s.balanceCard}>
          <Text style={s.balanceLabel}>AVAILABLE FUNDS</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginBottom: 20 }}>
            <Text style={s.balanceAmount}>$24,850.42</Text>
            <Text style={s.balanceCurrency}>USD</Text>
          </View>
          <View style={s.balanceBtns}>
            <TouchableOpacity style={s.withdrawBtn} activeOpacity={0.85}>
              <Text style={s.withdrawBtnText}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.addMoneyBtn} activeOpacity={0.85}>
              <Text style={s.addMoneyBtnText}>Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Search ── */}
        <View style={s.searchWrap}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search transactions, services, or recipients..."
            placeholderTextColor={C.grey}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* ── Filter Tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.filterRow}
        >
          {FILTER_TABS.map(tab => {
            const isActive = activeTab === tab || (tab === 'All' && activeTab === 'All');
            const label = tab === 'Wi...' ? 'Withdrawals' : tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[s.filterTab, isActive && s.filterTabActive]}
                onPress={() => setActiveTab(label === 'Withdrawals' ? 'Withdrawals' : tab)}
                activeOpacity={0.75}
              >
                <Text style={[s.filterTabText, isActive && s.filterTabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Recent Activity ── */}
        <View style={s.activityHeader}>
          <Text style={s.activityTitle}>Recent Activity</Text>
          <TouchableOpacity activeOpacity={0.75}>
            <Text style={s.downloadCsv}>Download{'\n'}CSV</Text>
          </TouchableOpacity>
        </View>

        {filtered.length === 0 ? (
          <View style={s.emptyWrap}>
            <Text style={s.emptyText}>No transactions found.</Text>
          </View>
        ) : (
          filtered.map(tx => <TxCard key={tx.id} tx={tx} />)
        )}

        {/* ── View More ── */}
        <TouchableOpacity style={s.viewMoreBtn} activeOpacity={0.75}>
          <Text style={s.viewMoreText}>View More History</Text>
        </TouchableOpacity>

        {/* ── Pagination ── */}
        <View style={s.pagination}>
          <TouchableOpacity
            style={s.pageArrow}
            onPress={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            activeOpacity={0.7}
          >
            <Text style={[s.pageArrowText, page === 1 && { opacity: 0.3 }]}>‹</Text>
          </TouchableOpacity>
          {[1, 2, 3].map(p => (
            <TouchableOpacity
              key={p}
              style={[s.pageBtn, page === p && s.pageBtnActive]}
              onPress={() => setPage(p)}
              activeOpacity={0.75}
            >
              <Text style={[s.pageBtnText, page === p && s.pageBtnTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={s.pageArrow}
            onPress={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page === TOTAL_PAGES}
            activeOpacity={0.7}
          >
            <Text style={[s.pageArrowText, page === TOTAL_PAGES && { opacity: 0.3 }]}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── STYLES ───────────────────────────────────

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: C.white },
  scroll:  { flex: 1, backgroundColor: C.bg },
  content: { paddingBottom: 24 },

  // Header
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  backBtn:     { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:    { fontSize: 22, color: C.dark },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.dark },

  // Balance card
  balanceCard:    { margin: 16, borderRadius: 20, backgroundColor: C.white, padding: 20, ...shadow.md },
  balanceLabel:   { fontSize: 11, fontWeight: '600', color: C.grey, letterSpacing: 1, marginBottom: 6 },
  balanceAmount:  { fontSize: 36, fontWeight: '800', color: C.dark },
  balanceCurrency:{ fontSize: 16, fontWeight: '600', color: C.grey, paddingBottom: 6 },
  balanceBtns:    { flexDirection: 'row', gap: 12 },
  withdrawBtn:    { flex: 1, backgroundColor: C.purple, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  withdrawBtnText:{ color: C.white, fontWeight: '700', fontSize: 14 },
  addMoneyBtn:    { flex: 1, backgroundColor: C.white, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1.5, borderColor: C.purple },
  addMoneyBtnText:{ color: C.purple, fontWeight: '700', fontSize: 14 },

  // Search
  searchWrap:  { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 12, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8, ...shadow.sm },
  searchIcon:  { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 13, color: C.dark },

  // Filter tabs
  filterRow:       { paddingHorizontal: 16, gap: 8, marginBottom: 16, paddingVertical: 2 },
  filterTab:       { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: C.white, borderWidth: 1.5, borderColor: C.border },
  filterTabActive: { backgroundColor: C.purple, borderColor: C.purple },
  filterTabText:   { fontSize: 13, fontWeight: '500', color: C.grey },
  filterTabTextActive: { color: C.white, fontWeight: '600' },

  // Activity
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, marginBottom: 12 },
  activityTitle:  { fontSize: 18, fontWeight: '700', color: C.dark },
  downloadCsv:    { fontSize: 12, color: C.purple, fontWeight: '600', textAlign: 'right' },

  // Transaction card
  txCard:     { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, gap: 12, ...shadow.sm },
  txIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  txTitle:    { fontSize: 13, fontWeight: '600', color: C.dark, marginBottom: 4, flexShrink: 1 },
  txDate:     { fontSize: 11, color: C.grey },
  txRight:    { alignItems: 'flex-end', gap: 6, flexShrink: 0 },
  txAmount:   { fontSize: 14, fontWeight: '700' },
  statusBadge:{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3 },

  // Empty
  emptyWrap: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 14, color: C.grey },

  // View More
  viewMoreBtn:  { marginHorizontal: 16, marginTop: 8, marginBottom: 16, alignItems: 'center', paddingVertical: 14 },
  viewMoreText: { fontSize: 14, color: C.purple, fontWeight: '600' },

  // Pagination
  pagination:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8 },
  pageArrow:        { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  pageArrowText:    { fontSize: 22, color: C.dark, fontWeight: '600' },
  pageBtn:          { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: C.white, borderWidth: 1.5, borderColor: C.border },
  pageBtnActive:    { backgroundColor: C.purple, borderColor: C.purple },
  pageBtnText:      { fontSize: 14, fontWeight: '600', color: C.grey },
  pageBtnTextActive:{ color: C.white },
});