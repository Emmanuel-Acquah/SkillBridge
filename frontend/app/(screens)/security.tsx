// app/settings/security.tsx
// Security & Privacy — 2FA management + login activity.
// This is the screen reached from "Security & Privacy" Quick Action on ProfileScreen.

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert, Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { C, shadow } from '../../constants/Theme';

interface Session {
  id: string;
  device: string;
  location: string;
  time: string;
  icon: string;
  current: boolean;
}

const SESSIONS: Session[] = [
  { id: '1', device: 'iPhone 15 Pro',       location: 'San Francisco, CA', time: 'Active now',       icon: '📱', current: true  },
  { id: '2', device: 'MacBook Pro (Chrome)', location: 'San Francisco, CA', time: '2 hours ago',      icon: '💻', current: false },
  { id: '3', device: 'iPad Air',            location: 'Los Angeles, CA',   time: 'Yesterday, 9:41 AM', icon: '📟', current: false },
  { id: '4', device: 'Windows PC (Edge)',   location: 'New York, NY',      time: '3 days ago',       icon: '🖥',  current: false },
];

export default function SecurityScreen() {
  const router = useRouter();
  const [twoFactorApp,   setTwoFactorApp]   = useState(true);
  const [twoFactorSms,   setTwoFactorSms]   = useState(false);
  const [twoFactorEmail, setTwoFactorEmail] = useState(true);
  const [loginAlerts,    setLoginAlerts]    = useState(true);
  const [sessions, setSessions] = useState(SESSIONS);

  const revokeSession = (id: string) => {
    Alert.alert('Revoke Session', 'This will log out that device immediately.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Revoke', style: 'destructive',
        onPress: () => setSessions(prev => prev.filter(s => s.id !== id)),
      },
    ]);
  };

  const revokeAll = () => {
    Alert.alert('Revoke All Sessions', 'You will be logged out on all other devices.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Revoke All', style: 'destructive',
        onPress: () => setSessions(prev => prev.filter(s => s.current)),
      },
    ]);
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Security & Privacy</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* ── Security Score ── */}
        <View style={s.scoreCard}>
          <View style={s.scoreLeft}>
            <Text style={s.scoreTitle}>Security Score</Text>
            <Text style={s.scoreSub}>Your account is well protected</Text>
            <View style={s.scoreBarBg}>
              <View style={[s.scoreBarFill, { width: '82%' }]} />
            </View>
          </View>
          <View style={s.scoreCircle}>
            <Text style={s.scoreNum}>82</Text>
            <Text style={s.scoreMax}>/100</Text>
          </View>
        </View>

        {/* ── Two-Factor Auth ── */}
        <Text style={s.sectionLabel}>TWO-FACTOR AUTHENTICATION</Text>

        <View style={s.infoCard}>
          <Text style={{ fontSize: 22, marginBottom: 8 }}>🛡</Text>
          <Text style={s.infoTitle}>Add an extra layer of security</Text>
          <Text style={s.infoSub}>
            Two-factor authentication adds an extra security check whenever you sign in from a new device.
          </Text>
        </View>

        <ToggleRow
          icon="📲" iconBg={C.greenBg}
          label="Authenticator App"
          sub="Google Authenticator, Authy…"
          value={twoFactorApp}
          onValueChange={setTwoFactorApp}
          badge={twoFactorApp ? 'RECOMMENDED' : undefined}
          badgeColor={C.green}
        />
        <ToggleRow
          icon="💬" iconBg={C.purpleBg}
          label="SMS Text Message"
          sub="Sent to +1 (555) ••• 5678"
          value={twoFactorSms}
          onValueChange={setTwoFactorSms}
        />
        <ToggleRow
          icon="✉️" iconBg={C.orangeBg}
          label="Email Verification"
          sub="Sent to alex.t@skillbridge.io"
          value={twoFactorEmail}
          onValueChange={setTwoFactorEmail}
        />

        {twoFactorApp && (
          <TouchableOpacity
            style={s.backupBtn}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Backup Codes', 'Eight one-time backup codes would be displayed here.')}
          >
            <Text style={s.backupBtnText}>View Backup Codes</Text>
          </TouchableOpacity>
        )}

        {/* ── Login Alerts ── */}
        <Text style={s.sectionLabel}>LOGIN ALERTS</Text>
        <ToggleRow
          icon="🔔" iconBg={C.orangeBg}
          label="New Login Notifications"
          sub="Get alerted when a new device signs in"
          value={loginAlerts}
          onValueChange={setLoginAlerts}
        />

        {/* ── Login Activity ── */}
        <View style={s.activityHeader}>
          <Text style={s.sectionLabel}>ACTIVE SESSIONS</Text>
          {sessions.filter(s => !s.current).length > 0 && (
            <TouchableOpacity onPress={revokeAll} activeOpacity={0.7}>
              <Text style={s.revokeAllText}>Revoke All</Text>
            </TouchableOpacity>
          )}
        </View>

        {sessions.map(session => (
          <View key={session.id} style={s.sessionRow}>
            <View style={[s.sessionIcon, { backgroundColor: session.current ? C.greenBg : C.purpleBg }]}>
              <Text style={{ fontSize: 20 }}>{session.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={s.sessionDevice}>{session.device}</Text>
                {session.current && (
                  <View style={s.currentBadge}>
                    <Text style={s.currentBadgeText}>Current</Text>
                  </View>
                )}
              </View>
              <Text style={s.sessionLocation}>{session.location}</Text>
              <Text style={s.sessionTime}>{session.time}</Text>
            </View>
            {!session.current && (
              <TouchableOpacity
                style={s.revokeBtn}
                onPress={() => revokeSession(session.id)}
                activeOpacity={0.75}
              >
                <Text style={s.revokeBtnText}>Revoke</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* ── Privacy ── */}
        <Text style={s.sectionLabel}>PRIVACY</Text>
        {[
          { label: 'Profile Visibility',    sub: 'Anyone can view your profile' },
          { label: 'Show Online Status',    sub: 'Others can see when you\'re active' },
          { label: 'Data & Analytics',      sub: 'Help improve SkillBridge with usage data' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={s.privacyRow} activeOpacity={0.82}
            onPress={() => Alert.alert(item.label, 'Privacy settings coming soon.')}
          >
            <View style={{ flex: 1 }}>
              <Text style={s.privacyLabel}>{item.label}</Text>
              <Text style={s.privacySub}>{item.sub}</Text>
            </View>
            <Text style={s.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Helper components ─────────────────────────

function ToggleRow({ icon, iconBg, label, sub, value, onValueChange, badge, badgeColor }: {
  icon: string; iconBg: string; label: string; sub: string;
  value: boolean; onValueChange: (v: boolean) => void;
  badge?: string; badgeColor?: string;
}) {
  return (
    <View style={s.toggleRow}>
      <View style={[s.toggleIcon, { backgroundColor: iconBg }]}>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <Text style={s.toggleLabel}>{label}</Text>
          {badge && (
            <View style={{ backgroundColor: C.greenBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
              <Text style={{ fontSize: 9, fontWeight: '700', color: badgeColor }}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={s.toggleSub}>{sub}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: C.border, true: C.purple }}
        thumbColor={C.white}
      />
    </View>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: C.white },
  scroll:  { flex: 1, backgroundColor: C.bg },
  content: { paddingBottom: 24 },

  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  backBtn:     { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:    { fontSize: 22, color: C.dark },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.dark },

  scoreCard:    { margin: 16, backgroundColor: C.purple, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16 },
  scoreLeft:    { flex: 1 },
  scoreTitle:   { fontSize: 16, fontWeight: '700', color: C.white, marginBottom: 4 },
  scoreSub:     { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 12 },
  scoreBarBg:   { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3 },
  scoreBarFill: { height: 6, backgroundColor: C.white, borderRadius: 3 },
  scoreCircle:  { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  scoreNum:     { fontSize: 22, fontWeight: '800', color: C.white },
  scoreMax:     { fontSize: 10, color: 'rgba(255,255,255,0.7)' },

  sectionLabel:  { fontSize: 11, fontWeight: '700', color: C.grey, letterSpacing: 1, paddingHorizontal: 16, marginTop: 20, marginBottom: 10 },
  activityHeader:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 16 },
  revokeAllText: { fontSize: 13, color: C.red, fontWeight: '600', marginTop: 20, marginBottom: 10 },

  infoCard:  { marginHorizontal: 16, backgroundColor: C.purpleBg, borderRadius: 14, padding: 16, marginBottom: 4, alignItems: 'center' },
  infoTitle: { fontSize: 15, fontWeight: '700', color: C.purple, marginBottom: 6 },
  infoSub:   { fontSize: 13, color: C.med, textAlign: 'center', lineHeight: 18 },

  toggleRow:  { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, gap: 12, ...shadow.sm },
  toggleIcon: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  toggleLabel:{ fontSize: 14, fontWeight: '600', color: C.dark },
  toggleSub:  { fontSize: 12, color: C.grey },

  backupBtn:     { marginHorizontal: 16, marginBottom: 4, borderRadius: 12, paddingVertical: 13, alignItems: 'center', borderWidth: 1.5, borderColor: C.purple },
  backupBtnText: { fontSize: 14, fontWeight: '600', color: C.purple },

  sessionRow:     { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, gap: 12, ...shadow.sm },
  sessionIcon:    { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sessionDevice:  { fontSize: 14, fontWeight: '600', color: C.dark },
  sessionLocation:{ fontSize: 12, color: C.grey, marginTop: 3 },
  sessionTime:    { fontSize: 11, color: C.grey, marginTop: 2 },
  currentBadge:   { backgroundColor: C.greenBg, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 10 },
  currentBadgeText:{ fontSize: 10, fontWeight: '700', color: C.green },
  revokeBtn:      { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: C.redBg, borderRadius: 20 },
  revokeBtnText:  { fontSize: 12, fontWeight: '600', color: C.red },

  privacyRow:   { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, gap: 12, ...shadow.sm },
  privacyLabel: { fontSize: 14, fontWeight: '600', color: C.dark, marginBottom: 3 },
  privacySub:   { fontSize: 12, color: C.grey },
  chevron:      { fontSize: 22, color: C.grey },
});