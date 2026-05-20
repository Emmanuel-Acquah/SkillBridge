import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

// ── THEME ────────────────────────────────────
const PURPLE       = '#6B5CE7';
const PURPLE_LIGHT = '#EEF2FF';
const BG           = '#F5F5F8';
const WHITE        = '#FFFFFF';
const TEXT_DARK    = '#1A1A2E';
const TEXT_GREY    = '#9B9BB0';
const TEXT_MED     = '#4A4A6A';
const GREEN        = '#22C55E';
const GREEN_BG     = '#ECFDF5';

// ── ACCOUNT OVERVIEW DATA ────────────────────
const overviewCards = [
  {
    id: '1',
    label: 'WALLET BALANCE',
    value: '$12,450.00',
    icon: '💳',
    iconBg: '#EEF2FF',
  },
  {
    id: '2',
    label: 'TOTAL INVESTMENT',
    value: '$84,200.00',
    sub: '+20% this month',
    subColor: GREEN,
    icon: '📈',
    iconBg: '#ECFDF5',
  },
  {
    id: '3',
    label: 'ORDERS COMPLETED',
    value: '156',
    sub: 'Active contracts: 12',
    subColor: TEXT_GREY,
    icon: '✅',
    iconBg: '#F0FDF4',
    isRow: true, // value and sub on same line
  },
];

// ── QUICK ACTIONS DATA ───────────────────────
const quickActions = [
  {
    id: '1',
    title: 'Edit Profile',
    sub: 'Update your personal information and bio',
    icon: '✏️',
    iconBg: '#EEF2FF',
    onPressKey: 'editProfile',
  },
  {
    id: '2',
    title: 'Manage Payment Methods',
    sub: '5 cards and 1 bank account linked',
    icon: '💳',
    iconBg: '#FFF7ED',
    onPressKey: 'paymentMethods',
  },
  {
    id: '3',
    title: 'Transaction History',
    sub: 'View your past payments',
    icon: '🕐',
    iconBg: '#EEF2FF',
    onPressKey: 'transactionHistory',
  },
  {
    id: '4',
    title: 'Notifications',
    sub: 'Manage your alerts',
    icon: '🔔',
    iconBg: '#FFF7ED',
    onPressKey: 'notifications',
  },
  {
    id: '5',
    title: 'Security & Privacy',
    sub: 'Two factor authentication is active',
    icon: '🔒',
    iconBg: '#ECFDF5',
    onPressKey: 'security',
  },
];

// ── COMPONENTS ───────────────────────────────

const OverviewCard = ({ item }: { item: typeof overviewCards[0] }) => (
  <View style={s.overviewCard}>
    <View style={[s.overviewIconWrap, { backgroundColor: item.iconBg }]}>
      <Text style={s.overviewIconText}>{item.icon}</Text>
    </View>
    <Text style={s.overviewLabel}>{item.label}</Text>
    <View style={item.isRow ? s.overviewValueRow : undefined}>
      <Text style={[s.overviewValue, item.isRow && { marginBottom: 0 }]}>{item.value}</Text>
      {item.isRow && <Text style={s.overviewValueLabel}> Active contracts: 12</Text>}
    </View>
    {item.sub && !item.isRow && (
      <Text style={[s.overviewSub, { color: item.subColor }]}>{item.sub}</Text>
    )}
  </View>
);

const QuickActionRow = ({
  item,
  onPress,
}: {
  item: typeof quickActions[0];
  onPress: () => void;
}) => (
  <TouchableOpacity style={s.actionRow} activeOpacity={0.82} onPress={onPress}>
    <View style={[s.actionIconWrap, { backgroundColor: item.iconBg }]}>
      <Text style={s.actionIconText}>{item.icon}</Text>
    </View>
    <View style={s.actionBody}>
      <Text style={s.actionTitle}>{item.title}</Text>
      <Text style={s.actionSub}>{item.sub}</Text>
    </View>
    <Text style={s.chevron}>›</Text>
  </TouchableOpacity>
);

// ── SCREEN ───────────────────────────────────

export default function ProfileScreen() {
  const router = useRouter();

  // Handlers for each quick action — navigate or alert as needed
  const handleAction = (key: string) => {
    switch (key) {
      case 'editProfile':
        router.push('/edit-profile');
        break;
      case 'transactionHistory':
        router.push('/TransactionHistory');
        break;
      case 'notifications':
        router.push('/Notification');
        break;
      case 'security':
        router.push('/security');
        break;
      default:
        console.log(`Pressed: ${key}`);
        break;
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      {/* ── Top Nav Bar ── */}
      <View style={s.navBar}>
        <Text style={s.navTitle}>SkillBridge</Text>
        {/*
          ⚙ Gear icon → Settings screen.
          Back on Settings returns here because the tab stack is preserved.
        */}
        <TouchableOpacity
          style={s.gearBtn}
          activeOpacity={0.75}
          onPress={() => router.push('/Settings')}
        >
          <Text style={s.gearIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Hero ── */}
        <View style={s.heroSection}>
          <View style={s.avatarWrap}>
            {/* Replace with actual image: <Image source={require('../assets/avatar/alexander.png')} style={s.avatar} /> */}
            <View style={s.avatarPlaceholder}>
              <Text style={s.avatarInitials}>AS</Text>
            </View>
            {/* Online indicator dot */}
            <View style={s.onlineDot} />
          </View>
          <Text style={s.userName}>Alexander Sterling</Text>
          <View style={s.premiumBadge}>
            <Text style={s.premiumText}>✦ PREMIUM MEMBER</Text>
          </View>
        </View>

        {/* ── Account Overview ── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Account Overview</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={s.sectionAction}>View Detailed Reports</Text>
          </TouchableOpacity>
        </View>

        {overviewCards.map(card => (
          <OverviewCard key={card.id} item={card} />
        ))}

        {/* ── Quick Actions ── */}
        <Text style={[s.sectionTitle, { paddingHorizontal: 16, marginTop: 20, marginBottom: 10 }]}>
          Quick Actions
        </Text>

        {quickActions.map(action => (
          <QuickActionRow
            key={action.id}
            item={action}
            onPress={() => handleAction(action.onPressKey)}
          />
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── STYLES ───────────────────────────────────

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: WHITE },
  scroll:        { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 24 },

  // Nav bar
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5F0',
  },
  navTitle: { fontSize: 18, fontWeight: '700', color: PURPLE },
  gearBtn:  { padding: 6 },
  gearIcon: { fontSize: 22, color: TEXT_MED },

  // Hero
  heroSection: { alignItems: 'center', backgroundColor: WHITE, paddingBottom: 24, paddingTop: 8 },
  avatarWrap:  { position: 'relative', marginBottom: 12 },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: WHITE,
    shadowColor: PURPLE,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  avatarInitials: { fontSize: 28, fontWeight: '700', color: WHITE },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: WHITE,
  },
  userName:     { fontSize: 22, fontWeight: '700', color: TEXT_DARK, marginBottom: 8 },
  premiumBadge: { backgroundColor: PURPLE, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  premiumText:  { color: WHITE, fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },

  // Section header
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16, marginBottom: 10 },
  sectionTitle:  { fontSize: 16, fontWeight: '700', color: TEXT_DARK },
  sectionAction: { fontSize: 12, color: PURPLE, fontWeight: '500' },

  // Overview card
  overviewCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  overviewIconWrap: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  overviewIconText: { fontSize: 18 },
  overviewLabel:    { fontSize: 11, fontWeight: '600', color: TEXT_GREY, letterSpacing: 0.8, marginBottom: 4 },
  overviewValue:    { fontSize: 26, fontWeight: '700', color: TEXT_DARK, marginBottom: 4 },
  overviewValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  overviewValueLabel: { fontSize: 14, color: TEXT_MED, fontWeight: '500' },
  overviewSub:      { fontSize: 12, fontWeight: '500' },

  // Quick action row
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionIconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionIconText: { fontSize: 20 },
  actionBody:     { flex: 1 },
  actionTitle:    { fontSize: 14, fontWeight: '600', color: TEXT_DARK, marginBottom: 3 },
  actionSub:      { fontSize: 12, color: TEXT_GREY, lineHeight: 16 },
  chevron:        { fontSize: 22, color: TEXT_GREY, marginLeft: 4 },
});