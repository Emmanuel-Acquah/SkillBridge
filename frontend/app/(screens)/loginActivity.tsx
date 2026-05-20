// app/settings/login-activity.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { C, shadow } from '../../constants/Theme';

interface Session {
  id: string; icon: string; iconBg: string;
  device: string; browser: string;
  location: string; ip: string;
  time: string; current: boolean;
}

const INITIAL_SESSIONS: Session[] = [
  { id: '1', icon: '📱', iconBg: C.greenBg,  device: 'iPhone 15 Pro',        browser: 'SkillBridge App',    location: 'San Francisco, CA', ip: '192.168.1.1',   time: 'Active now',          current: true  },
  { id: '2', icon: '💻', iconBg: C.purpleBg, device: 'MacBook Pro',           browser: 'Chrome 118',         location: 'San Francisco, CA', ip: '192.168.1.2',   time: '2 hours ago',         current: false },
  { id: '3', icon: '📟', iconBg: C.orangeBg, device: 'iPad Air (5th gen)',    browser: 'Safari 17',          location: 'Los Angeles, CA',   ip: '10.0.0.12',     time: 'Yesterday, 9:41 AM',  current: false },
  { id: '4', icon: '🖥',  iconBg: C.purpleBg, device: 'Windows 11 PC',        browser: 'Microsoft Edge 118', location: 'New York, NY',      ip: '203.0.113.45',  time: '3 days ago',          current: false },
  { id: '5', icon: '💻', iconBg: '#F3F4F6',  device: 'Unknown Linux Device', browser: 'Firefox 119',        location: 'Unknown',           ip: '198.51.100.99', time: '5 days ago',          current: false },
];

export default function LoginActivityScreen() {
  const router = useRouter();
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  const revoke = (id: string, device: string) => {
    Alert.alert('Revoke Session', `Sign out "${device}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Revoke', style: 'destructive', onPress: () => setSessions(prev => prev.filter(s => s.id !== id)) },
    ]);
  };

  const revokeAll = () => {
    Alert.alert('Sign Out All Devices', 'You will be logged out on all devices except this one.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out All', style: 'destructive', onPress: () => setSessions(prev => prev.filter(s => s.current)) },
    ]);
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}><Text style={s.backIcon}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Login Activity</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        <View style={s.infoBanner}>
          <Text style={{ fontSize: 18, marginRight: 10 }}>📱</Text>
          <Text style={s.infoText}>
            Review devices that have accessed your account. Revoke any session you don't recognise immediately.
          </Text>
        </View>

        <View style={s.rowHeader}>
          <Text style={s.sectionLabel}>ACTIVE SESSIONS ({sessions.length})</Text>
          {sessions.filter(s => !s.current).length > 0 && (
            <TouchableOpacity onPress={revokeAll} activeOpacity={0.75}>
              <Text style={s.revokeAllBtn}>Sign Out All</Text>
            </TouchableOpacity>
          )}
        </View>

        {sessions.map(session => (
          <View key={session.id} style={[s.card, session.current && s.cardCurrent]}>
            <View style={[s.deviceIcon, { backgroundColor: session.iconBg }]}>
              <Text style={{ fontSize: 22 }}>{session.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.deviceTop}>
                <Text style={s.deviceName}>{session.device}</Text>
                {session.current && (
                  <View style={s.currentBadge}><Text style={s.currentText}>● Current</Text></View>
                )}
              </View>
              <Text style={s.deviceBrowser}>{session.browser}</Text>
              <View style={s.deviceMeta}>
                <Text style={s.metaText}>📍 {session.location}</Text>
                <Text style={s.metaDot}>·</Text>
                <Text style={s.metaText}>{session.ip}</Text>
              </View>
              <Text style={s.deviceTime}>🕐 {session.time}</Text>
              {!session.current && (
                <TouchableOpacity
                  style={s.revokeBtn}
                  onPress={() => revoke(session.id, session.device)}
                  activeOpacity={0.8}
                >
                  <Text style={s.revokeBtnText}>Revoke Access</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {sessions.length === 1 && (
          <View style={s.emptyWrap}>
            <Text style={{ fontSize: 40 }}>✅</Text>
            <Text style={s.emptyText}>No other active sessions</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: C.white },
  scroll:  { flex: 1, backgroundColor: C.bg },
  content: { paddingBottom: 24 },
  header:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:{ fontSize: 22, color: C.dark },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.dark },

  infoBanner: { flexDirection: 'row', alignItems: 'flex-start', margin: 16, backgroundColor: C.purpleBg, borderRadius: 14, padding: 14 },
  infoText:   { flex: 1, fontSize: 13, color: C.purple, lineHeight: 18 },

  rowHeader:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 16 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.grey, letterSpacing: 1, paddingHorizontal: 16, marginTop: 4, marginBottom: 10 },
  revokeAllBtn: { fontSize: 13, color: C.red, fontWeight: '600' },

  card:        { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 12, borderRadius: 16, padding: 16, gap: 14, ...shadow.sm },
  cardCurrent: { borderWidth: 2, borderColor: C.purple },
  deviceIcon:  { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  deviceTop:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  deviceName:  { fontSize: 14, fontWeight: '700', color: C.dark, flex: 1 },
  currentBadge:{ backgroundColor: C.greenBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  currentText: { fontSize: 10, fontWeight: '700', color: C.green },
  deviceBrowser:{ fontSize: 12, color: C.med, marginBottom: 6 },
  deviceMeta:  { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3 },
  metaText:    { fontSize: 11, color: C.grey },
  metaDot:     { fontSize: 11, color: C.grey },
  deviceTime:  { fontSize: 11, color: C.grey, marginBottom: 10 },
  revokeBtn:   { alignSelf: 'flex-start', backgroundColor: C.redBg, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  revokeBtnText:{ fontSize: 12, fontWeight: '700', color: C.red },

  emptyWrap: { alignItems: 'center', paddingVertical: 32, gap: 10 },
  emptyText: { fontSize: 14, color: C.grey, fontWeight: '500' },
});