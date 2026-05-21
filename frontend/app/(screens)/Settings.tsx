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
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

// ── THEME ────────────────────────────────────
const PURPLE    = '#6B5CE7';
const BG        = '#F5F5F8';
const WHITE     = '#FFFFFF';
const TEXT_DARK = '#1A1A2E';
const TEXT_GREY = '#9B9BB0';
const GREEN     = '#22C55E';
const RED       = '#EF4444';
const GREEN_BG  = '#ECFDF5';
const BLUE_BG   = '#EEF2FF';

// ── SETTINGS DATA ────────────────────────────

interface SettingItem {
  id: string;
  label: string;
  sub: string;
  icon: string;
  iconBg: string;
  badge?: string;
  badgeColor?: string;
  onPressKey: string;
}

const accountSettings: SettingItem[] = [
  { id: 'a1', label: 'Personal Info',    sub: 'Name, email, and professional info',     icon: '👤', iconBg: BLUE_BG,  onPressKey: 'personalInfo' },
  { id: 'a2', label: 'Password',         sub: 'Last changed 5 months ago',              icon: '🔑', iconBg: '#FFF7ED', onPressKey: 'password' },
  { id: 'a3', label: 'Linked Accounts',  sub: 'GitHub, LinkedIn, and Stripe',           icon: '🔗', iconBg: BLUE_BG,  onPressKey: 'linkedAccounts' },
];

const preferenceSettings: SettingItem[] = [
  { id: 'p1', label: 'Notifications', sub: 'Email, Push, and SMS alerts',  icon: '🔔', iconBg: '#FFF7ED', onPressKey: 'notifications' },
  { id: 'p2', label: 'Language',      sub: 'English (US)',                  icon: '🌐', iconBg: BLUE_BG,  onPressKey: 'language' },
  { id: 'p3', label: 'Currency',      sub: 'USD ($) – US Dollar',           icon: '💵', iconBg: GREEN_BG,  onPressKey: 'currency' },
];

const securitySettings: SettingItem[] = [
  {
    id: 's1',
    label: 'Two-Factor Auth',
    sub: 'Secure your account with 2FA',
    icon: '🛡',
    iconBg: GREEN_BG,
    badge: 'ON',
    badgeColor: GREEN,
    onPressKey: 'twoFactor',
  },
  { id: 's2', label: 'Login Activity', sub: 'Review your active sessions', icon: '📱', iconBg: BLUE_BG, onPressKey: 'loginActivity' },
];

const supportSettings: SettingItem[] = [
  { id: 'su1', label: 'Help Center',       sub: 'FAQs and customer support',        icon: '❓', iconBg: BLUE_BG,  onPressKey: 'helpCenter' },
  { id: 'su2', label: 'Terms of Service',  sub: 'Legal agreement and usage rules',  icon: '📄', iconBg: '#FFF7ED', onPressKey: 'terms' },
  { id: 'su3', label: 'Privacy Policy',    sub: 'How we handle your data',          icon: '🔏', iconBg: BLUE_BG,  onPressKey: 'privacy' },
];

// ── COMPONENTS ───────────────────────────────

const SettingRow = ({
  item,
  onPress,
}: {
  item: SettingItem;
  onPress: () => void;
}) => (
  <TouchableOpacity style={s.settingRow} activeOpacity={0.82} onPress={onPress}>
    <View style={[s.settingIconWrap, { backgroundColor: item.iconBg }]}>
      <Text style={s.settingIconText}>{item.icon}</Text>
    </View>
    <View style={s.settingBody}>
      <View style={s.settingLabelRow}>
        <Text style={s.settingLabel}>{item.label}</Text>
        {item.badge && (
          <View style={[s.badge, { backgroundColor: item.badgeColor === GREEN ? GREEN_BG : BLUE_BG }]}>
            <Text style={[s.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
          </View>
        )}
      </View>
      <Text style={s.settingSub}>{item.sub}</Text>
    </View>
    <Text style={s.chevron}>›</Text>
  </TouchableOpacity>
);

const SectionLabel = ({ title }: { title: string }) => (
  <Text style={s.sectionLabel}>{title}</Text>
);

// ── SCREEN ───────────────────────────────────

export default function SettingsScreen() {
  const router = useRouter();

  const handlePress = (key: string) => {
    switch (key) {
      case 'personalInfo':
      case 'password':
      case 'linkedAccounts':
        // The edit-profile screen handles name, bio, image, password, and social links
        router.push('/edit-profile');
        break;
      case 'notifications':
        router.push('/Notification');
        break;
      case 'language':
        router.push('/language');
        break;
      case 'currency':
        router.push('/currency');
        break;
      case 'twoFactor':
        router.push('/twoFactor');
        break;
      case 'loginActivity':
        router.push('/loginActivity');
        break;
      default:
        console.log(`Settings → ${key}`);
        Alert.alert('Coming soon', `"${key}" settings will be available shortly.`);
        break;
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            // TODO: clear auth tokens, reset navigation, etc.
            console.log('User signed out');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      {/* ── Header with back button ── */}
      <View style={s.header}>
        {/*
          goBack() pops Settings off the stack and returns to wherever
          the user came from — ProfileScreen or DashboardScreen.
          React Navigation tracks this automatically.
        */}
        <TouchableOpacity
          style={s.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Settings</Text>
        {/* Spacer to center title */}
        <View style={s.backBtn} />
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Card ── */}
        <View style={s.profileCard}>
          <View style={s.profileAvatarWrap}>
            {/*
              Replace the View below with your image:
              <Image source={require('../assets/avatar/alex-thompson.png')} style={s.profileAvatar} />
            */}
            <View style={s.profileAvatarPlaceholder}>
              <Text style={s.profileAvatarInitials}>AT</Text>
            </View>
            <View style={s.onlineDot} />
          </View>
          <View style={s.profileInfo}>
            <Text style={s.profileName}>Alex Thompson</Text>
            <Text style={s.profileEmail}>alex.t@skillbridge.io</Text>
            <View style={s.profileBadgeRow}>
              <View style={s.verifiedBadge}>
                <Text style={s.verifiedText}>✓ Verified Pro Team</Text>
              </View>
              <View style={s.tierBadge}>
                <Text style={s.tierText}>Tier 1</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Account ── */}
        <SectionLabel title="ACCOUNT" />
        {accountSettings.map(item => (
          <SettingRow key={item.id} item={item} onPress={() => handlePress(item.onPressKey)} />
        ))}

        {/* ── Preferences ── */}
        <SectionLabel title="PREFERENCES" />
        {preferenceSettings.map(item => (
          <SettingRow key={item.id} item={item} onPress={() => handlePress(item.onPressKey)} />
        ))}

        {/* ── Security ── */}
        <SectionLabel title="SECURITY" />
        {securitySettings.map(item => (
          <SettingRow key={item.id} item={item} onPress={() => handlePress(item.onPressKey)} />
        ))}

        {/* ── Support ── */}
        <SectionLabel title="SUPPORT" />
        {supportSettings.map(item => (
          <SettingRow key={item.id} item={item} onPress={() => handlePress(item.onPressKey)} />
        ))}

        {/* ── Sign Out ── */}
        <TouchableOpacity
          style={s.signOutBtn}
          activeOpacity={0.8}
          onPress={handleSignOut}
        >
          <Text style={s.signOutText}>↑ Sign Out</Text>
        </TouchableOpacity>

        <Text style={s.versionText}>SkillBridge v1.4 · Build 20251101</Text>

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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5F0',
  },
  backBtn:     { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:    { fontSize: 22, color: TEXT_DARK, fontWeight: '400' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK },

  // Profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 2,
    borderColor: PURPLE,
    shadowColor: PURPLE,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  profileAvatarWrap:        { position: 'relative' },
  profileAvatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarInitials: { fontSize: 20, fontWeight: '700', color: WHITE },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: WHITE,
  },
  profileInfo: { flex: 1 },
  profileName:  { fontSize: 15, fontWeight: '700', color: TEXT_DARK, marginBottom: 2 },
  profileEmail: { fontSize: 12, color: TEXT_GREY, marginBottom: 6 },
  profileBadgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  verifiedBadge: { backgroundColor: GREEN_BG, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  verifiedText:  { fontSize: 10, fontWeight: '600', color: GREEN },
  tierBadge:     { backgroundColor: '#EEF2FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  tierText:      { fontSize: 10, fontWeight: '600', color: PURPLE },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_GREY,
    letterSpacing: 1,
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },

  // Setting row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  settingIconWrap: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  settingIconText: { fontSize: 18 },
  settingBody:     { flex: 1 },
  settingLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  settingLabel:    { fontSize: 14, fontWeight: '600', color: TEXT_DARK },
  settingSub:      { fontSize: 12, color: TEXT_GREY, lineHeight: 16 },
  chevron:         { fontSize: 22, color: TEXT_GREY },

  // Badge (e.g. 2FA "ON")
  badge:     { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { fontSize: 10, fontWeight: '700' },

  // Sign Out
  signOutBtn: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: WHITE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: RED,
    shadowColor: RED,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  signOutText: { fontSize: 15, fontWeight: '700', color: RED },

  // Version
  versionText: { fontSize: 11, color: TEXT_GREY, textAlign: 'center', marginTop: 16 },
});