import React from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const PURPLE = '#6B5CE7';
const PURPLE_LIGHT = '#7B6CF0';
const BG = '#F5F5F8';
const WHITE = '#FFFFFF';
const TEXT_DARK = '#1A1A2E';
const TEXT_GREY = '#9B9BB0';
const TEXT_MED = '#4A4A6A';
const GREEN = '#22C55E';
const RED = '#EF4444';
const BADGE_BLUE = '#EEF2FF';
const BADGE_ORANGE = '#FFF7ED';

// ── DATA (Using modern vector icon names and initials fallback) ──

const activeOrders = [
  {
    id: '1',
    title: 'Modern UI Design System',
    subtitle: 'Dustin · 2 days · In Progress',
    statusLabel: 'In Progress',
    statusColor: '#3B82F6',
    statusBg: BADGE_BLUE,
    color: '#3B82F6',
    iconName: 'edit-3',
  },
  {
    id: '2',
    title: 'API Integration (Python)',
    subtitle: 'Reviewing · Submitted',
    statusLabel: 'Submitted',
    statusColor: '#F97316',
    statusBg: BADGE_ORANGE,
    color: '#F97316',
    iconName: 'code',
  },
  {
    id: '3',
    title: 'SEO Audit & Consulting',
    subtitle: 'Sarah · 14 days · In Progress',
    statusLabel: 'In Progress',
    statusColor: '#3B82F6',
    statusBg: BADGE_BLUE,
    color: '#3B82F6',
    iconName: 'search',
  },
  {
    id: '4',
    title: 'Smart Contract Audit',
    subtitle: 'David · Reviewing · Submitted',
    statusLabel: 'Submitted',
    statusColor: '#F97316',
    statusBg: BADGE_ORANGE,
    color: '#F97316',
    iconName: 'shield',
  },
];

const categories = [
  { id: '1', label: 'CV Writing',  iconName: 'file-document-edit-outline', iconType: 'MaterialCommunityIcons' },
  { id: '2', label: 'Design',      iconName: 'brush-outline',              iconType: 'Ionicons' },
  { id: '3', label: 'Tutoring',    iconName: 'school-outline',             iconType: 'Ionicons' },
  { id: '4', label: 'Coding',      iconName: 'console',                    iconType: 'MaterialCommunityIcons' },
  { id: '5', label: 'Marketing',   iconName: 'bar-chart-2',                iconType: 'Feather' },
  { id: '6', label: 'Translation', iconName: 'translate',                  iconType: 'MaterialIcons' },
];

const recommended = [
  {
    id: '1',
    title: 'Corporate Pitch Deck Design',
    seller: 'By Sarah Mitchell, Top Rated',
    badge: 'BEST SELLER',
    badgeColor: '#F59E0B',
    rating: '4.9(4)',
    price: '$249',
    from: 'from ',
    color: '#1E293B',
    iconName: 'bar-chart-2',
    image: require('../../assets/images/corporate.jpg'),
  },
  {
    id: '2',
    title: 'Blockchain Smart Contracts',
    seller: 'By David Chen, Level 2',
    badge: 'FEATURED',
    badgeColor: '#6B5CE7',
    rating: '4.8(4)',
    price: '$750',
    from: 'from ',
    color: '#0F172A',
    iconName: 'cpu',
    image: require('../../assets/images/blockchain1.jpg'),
  },
];

const experts = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Presentation Design',
    rating: '4.9',
    color: '#E0E7FF',
    initials: 'SM',
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'Full-stack Python',
    rating: '4.8',
    color: '#FEE2E2',
    initials: 'JW',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'SEO Strategy',
    rating: '5.0',
    color: '#ECFDF5',
    initials: 'ER',
  },
];

const transactions = [
  {
    id: '1',
    label: 'Payment for "UI Design System"',
    sub: 'Cause Released',
    amount: '-$1,200.53',
    amountColor: RED,
    color: '#EC4899',
    iconName: 'credit-card',
  },
  {
    id: '2',
    label: 'Wallet Top-Up',
    sub: 'Oct 22, 2025 · Ref A',
    amount: '+$1,500.00',
    amountColor: GREEN,
    color: '#10B981',
    iconName: 'arrow-down-left',
  },
  {
    id: '3',
    label: 'Payment for "Copywriting"',
    sub: 'Complete',
    amount: '-$99.03',
    amountColor: RED,
    color: '#EC4899',
    iconName: 'credit-card',
  },
];

// ── COMPONENTS ───────────────────────────────

const SectionHeader = ({
  title,
  actionLabel = 'View All',
  onPress,
}: {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.sectionAction}>{actionLabel}</Text>
    </TouchableOpacity>
  </View>
);

const OrderCard = ({ item }: { item: (typeof activeOrders)[0] }) => (
  <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
    {/* Colored background with centered icon */}
    <View style={[styles.orderIcon, { backgroundColor: item.color + '15', alignItems: 'center', justifyContent: 'center' }]}>
      <Feather name={item.iconName as any} size={18} color={item.color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.orderTitle}>{item.title}</Text>
      <Text style={styles.orderSub}>{item.subtitle}</Text>
    </View>
    <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
      <Text style={[styles.statusText, { color: item.statusColor }]}>
        {item.statusLabel}
      </Text>
    </View>
  </TouchableOpacity>
);

const CategoryItem = ({ item }: { item: (typeof categories)[0] }) => {
  const IconComponent = () => {
    switch (item.iconType) {
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={item.iconName as any} size={22} color="#1A1A2E" />;
      case 'Ionicons':
        return <Ionicons name={item.iconName as any} size={22} color="#1A1A2E" />;
      case 'MaterialIcons':
        return <MaterialIcons name={item.iconName as any} size={22} color="#1A1A2E" />;
      case 'Feather':
      default:
        return <Feather name={item.iconName as any} size={20} color="#1A1A2E" />;
    }
  };

  return (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <IconComponent />
      </View>
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const RecommendedCard = ({ item }: { item: (typeof recommended)[0] }) => (
  <TouchableOpacity style={styles.recCard} activeOpacity={0.85}>
    <ImageBackground source={item.image} style={styles.recThumbnail} resizeMode="cover" imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
    <View
      style={[styles.recBadge, { backgroundColor: item.badgeColor }]}
    >
      <Text style={styles.recBadgeText}>{item.badge}</Text>
    </View>
    <View style={styles.recBody}>
      <Text style={styles.recTitle}>{item.title}</Text>
      <Text style={styles.recSeller}>{item.seller}</Text>
      <View style={styles.recFooter}>
        <View style={styles.ratingRow}>
          <Text style={styles.starIcon}>★</Text>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.recPrice}>
          <Text style={styles.recFrom}>{item.from}</Text>
          {item.price}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ExpertRow = ({ item }: { item: (typeof experts)[0] }) => (
  <TouchableOpacity style={styles.expertRow} activeOpacity={0.7}>
    {/* Initials profile bubble */}
    <View style={[styles.expertAvatar, { backgroundColor: item.color, alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={{ color: TEXT_DARK, fontWeight: 'bold', fontSize: 13 }}>{item.initials}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.expertName}>{item.name}</Text>
      <Text style={styles.expertRole}>{item.role}</Text>
    </View>
    <View style={styles.ratingRow}>
      <Text style={styles.starIcon}>★</Text>
      <Text style={styles.ratingText}>{item.rating}</Text>
    </View>
    <TouchableOpacity style={styles.hireBtn}>
      <Text style={styles.hireBtnText}>Hire</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const TransactionRow = ({ item }: { item: (typeof transactions)[0] }) => (
  <TouchableOpacity style={styles.txRow} activeOpacity={0.7}>
    {/* Colored background with centered transaction icon */}
    <View style={[styles.txIcon, { backgroundColor: item.color + '15', alignItems: 'center', justifyContent: 'center' }]}>
      <Feather name={item.iconName as any} size={16} color={item.color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.txLabel}>{item.label}</Text>
      {item.sub ? <Text style={styles.txSub}>{item.sub}</Text> : null}
    </View>
    <Text style={[styles.txAmount, { color: item.amountColor }]}>
      {item.amount}
    </Text>
  </TouchableOpacity>
);

// ── SCREEN ───────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DashboardScreen() {
  const [showAllCategories, setShowAllCategories] = React.useState(false);
  // Any modern mobile screen >= 355dp (which covers almost all modern smartphones like Note 20 Ultra) fits all 6 categories beautifully!
  const fitsAllCategories = SCREEN_WIDTH >= 355;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      {/* ── Sticky Header ── */}
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: PURPLE, letterSpacing: -0.5 }}>
          SkillBridge
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(screens)/Notification')}>
            <Ionicons name="notifications-outline" size={24} color={TEXT_DARK} />
            {/* Notification dot */}
            <View style={styles.notifDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/Messages')}>
            <Ionicons name="chatbubble-ellipses-outline" size={23} color={TEXT_DARK} />
          </TouchableOpacity>
          {/* User Avatar Initials */}
          <View style={[styles.userAvatar, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={{ color: WHITE, fontWeight: 'bold', fontSize: 13 }}>A</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Welcome ── */}
        <Text style={styles.welcomeText}>Welcome back, Alex!</Text>

        {/* ── Wallet Card ── */}
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>WALLET BALANCE</Text>
          <Text style={styles.walletAmount}>$4,285.50</Text>
          <View style={styles.walletActions}>
            <TouchableOpacity style={styles.walletBtn}>
              <Text style={styles.walletBtnText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.walletBtn, styles.walletBtnOutline]}
            >
              <Text style={[styles.walletBtnText, styles.walletBtnTextOutline]}>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Active Orders ── */}
        <SectionHeader 
          title="Active Orders" 
          actionLabel="View All"
          onPress={() => router.push('/(tabs)/Order')}
        />
        {activeOrders.slice(0, 2).map((order) => (
          <OrderCard key={order.id} item={order} />
        ))}

        {/* ── Categories ── */}
        <SectionHeader 
          title="Categories" 
          actionLabel={fitsAllCategories ? undefined : (showAllCategories ? "Show Less" : "View All")}
          onPress={fitsAllCategories ? undefined : () => setShowAllCategories(!showAllCategories)}
        />
        {fitsAllCategories ? (
          <View style={styles.categoriesRowBalanced}>
            {categories.map((item) => (
              <CategoryItem key={item.id} item={item} />
            ))}
          </View>
        ) : showAllCategories ? (
          <View style={styles.categoriesGrid}>
            {categories.map((item) => (
              <View key={item.id} style={styles.gridItemWrapper}>
                <CategoryItem item={item} />
              </View>
            ))}
          </View>
        ) : (
          <FlatList
            data={categories.slice(0, 4)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            contentContainerStyle={styles.categoriesRow}
            renderItem={({ item }) => <CategoryItem item={item} />}
          />
        )}

        {/* ── Recommended ── */}
        <SectionHeader title="Recommended for You" actionLabel="Explore All" />
        <FlatList
          data={recommended}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.recRow}
          renderItem={({ item }) => <RecommendedCard item={item} />}
        />

        {/* ── Top Experts ── */}
        <SectionHeader title="Top Experts" />
        {experts.map((e) => (
          <ExpertRow key={e.id} item={e} />
        ))}
        <TouchableOpacity style={styles.seeAllBtn}>
          <Text style={styles.seeAllText}>See All Top Freelancers</Text>
        </TouchableOpacity>

        {/* ── Recent Transactions ── */}
        <SectionHeader title="Recent Transactions" />
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} item={tx} />
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── STYLES ───────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: WHITE,
    // Add status bar padding on Android to prevent title side interfering with the status bar
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 24) : 0,
  },
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logo: {
    width: 120,
    height: 28,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    position: 'relative',
    padding: 2,
  },
  iconImg: {
    width: 22,
    height: 22,
  },
  notifDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RED,
    borderWidth: 1.5,
    borderColor: WHITE,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PURPLE,
    marginLeft: 4,
  },

  // Welcome
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_DARK,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: WHITE,
  },

  // Wallet
  walletCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: PURPLE,
    padding: 20,
  },
  walletLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 6,
  },
  walletAmount: {
    fontSize: 34,
    fontWeight: '700',
    color: WHITE,
    marginBottom: 16,
  },
  walletActions: {
    flexDirection: 'row',
    gap: 12,
  },
  walletBtn: {
    flex: 1,
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  walletBtnOutline: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  walletBtnText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 14,
  },
  walletBtnTextOutline: {
    color: WHITE,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  sectionAction: {
    fontSize: 13,
    color: PURPLE,
    fontWeight: '500',
  },

  // Order Card
  orderCard: {
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
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  orderSub: {
    fontSize: 12,
    color: TEXT_GREY,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Categories
  categoriesRow: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 12,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 6,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryImg: {
    width: 24,
    height: 24,
  },
  categoryLabel: {
    fontSize: 10,
    color: TEXT_MED,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Recommended
  recRow: {
    paddingHorizontal: 16,
    gap: 14,
    paddingBottom: 4,
  },
  recCard: {
    width: 200,
    backgroundColor: WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  recThumbnail: {
    width: '100%',
    height: 110,
  },
  recBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  recBadgeText: {
    color: WHITE,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  recBody: {
    padding: 12,
  },
  recTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  recSeller: {
    fontSize: 11,
    color: TEXT_GREY,
    marginBottom: 8,
  },
  recFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: PURPLE,
  },
  recFrom: {
    fontWeight: '400',
    fontSize: 11,
    color: TEXT_GREY,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starIcon: {
    color: '#F59E0B',
    fontSize: 13,
  },
  ratingText: {
    fontSize: 12,
    color: TEXT_MED,
    fontWeight: '500',
  },

  // Experts
  expertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  expertAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  expertName: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_DARK,
  },
  expertRole: {
    fontSize: 12,
    color: TEXT_GREY,
  },
  hireBtn: {
    backgroundColor: BADGE_BLUE,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  hireBtnText: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: '600',
  },

  // See All
  seeAllBtn: {
    marginHorizontal: 16,
    marginTop: 2,
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PURPLE,
  },
  seeAllText: {
    color: PURPLE,
    fontWeight: '600',
    fontSize: 14,
  },

  // Transactions
  txRow: {
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
  txIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
  },
  txLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  txSub: {
    fontSize: 11,
    color: TEXT_GREY,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    rowGap: 16,
    marginBottom: 14,
  },
  gridItemWrapper: {
    width: '33.33%',
    alignItems: 'center',
  },
  categoriesRowBalanced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 14,
  },
});
