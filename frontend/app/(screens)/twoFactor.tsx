// app/settings/two-factor.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Switch, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { C, shadow } from '../../constants/Theme';

export default function TwoFactorScreen() {
  const router = useRouter();
  const [appEnabled,   setAppEnabled]   = useState(true);
  const [smsEnabled,   setSmsEnabled]   = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [step, setStep] = useState<'main' | 'setupApp' | 'verifySms'>('main');
  const [otpInput, setOtpInput] = useState('');

  if (step === 'setupApp') {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} onPress={() => setStep('main')} activeOpacity={0.7}><Text style={s.backIcon}>←</Text></TouchableOpacity>
          <Text style={s.headerTitle}>Setup Authenticator</Text>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView style={s.scroll} contentContainerStyle={s.content}>
          <View style={s.qrBox}>
            <Text style={{ fontSize: 80 }}>📲</Text>
            <Text style={s.qrHint}>QR code would appear here</Text>
            <Text style={s.qrSub}>Scan with Google Authenticator or Authy</Text>
          </View>
          <View style={s.manualBox}>
            <Text style={s.manualLabel}>Manual entry key</Text>
            <Text style={s.manualKey}>JBSWY3DPEHPK3PXP</Text>
          </View>
          <Text style={s.sectionLabel}>ENTER VERIFICATION CODE</Text>
          <View style={s.otpWrap}>
            <TextInput style={s.otpInput} value={otpInput} onChangeText={setOtpInput} keyboardType="number-pad" maxLength={6} placeholder="000000" placeholderTextColor={C.grey} textAlign="center" />
          </View>
          <TouchableOpacity style={s.saveBtn} activeOpacity={0.85} onPress={() => {
            if (otpInput.length === 6) { setAppEnabled(true); setStep('main'); Alert.alert('✓', 'Authenticator app enabled!'); }
            else Alert.alert('Error', 'Enter the 6-digit code from your app.');
          }}>
            <Text style={s.saveBtnText}>Verify & Enable</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}><Text style={s.backIcon}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Two-Factor Auth</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        <View style={s.heroBanner}>
          <Text style={{ fontSize: 36, marginBottom: 10 }}>🛡</Text>
          <Text style={s.heroTitle}>Two-Factor Authentication</Text>
          <Text style={s.heroSub}>Add an extra layer of protection to your SkillBridge account by requiring a second form of verification when you sign in.</Text>
        </View>

        <Text style={s.sectionLabel}>AUTHENTICATION METHODS</Text>

        {[
          { icon: '📲', iconBg: C.greenBg,  label: 'Authenticator App', sub: 'Google Authenticator, Authy, etc.', value: appEnabled,   onToggle: () => { if (!appEnabled) setStep('setupApp'); else Alert.alert('Disable', 'Are you sure?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Disable', style: 'destructive', onPress: () => setAppEnabled(false) }]); }, badge: 'RECOMMENDED' },
          { icon: '💬', iconBg: C.purpleBg, label: 'SMS Text Message',  sub: 'Code sent to +1 (555) ••• 5678',  value: smsEnabled,   onToggle: () => setSmsEnabled(v => !v), badge: undefined },
          { icon: '✉️', iconBg: C.orangeBg, label: 'Email Code',        sub: 'Code sent to your email address',  value: emailEnabled, onToggle: () => setEmailEnabled(v => !v), badge: undefined },
        ].map(m => (
          <View key={m.label} style={s.methodRow}>
            <View style={[s.methodIcon, { backgroundColor: m.iconBg }]}><Text style={{ fontSize: 20 }}>{m.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <Text style={s.methodLabel}>{m.label}</Text>
                {m.badge && <View style={[s.badge, { backgroundColor: C.greenBg }]}><Text style={[s.badgeText, { color: C.green }]}>{m.badge}</Text></View>}
              </View>
              <Text style={s.methodSub}>{m.sub}</Text>
            </View>
            <Switch value={m.value} onValueChange={m.onToggle} trackColor={{ false: C.border, true: C.purple }} thumbColor={C.white} />
          </View>
        ))}

        {appEnabled && (
          <>
            <Text style={s.sectionLabel}>BACKUP CODES</Text>
            <View style={s.backupCard}>
              <Text style={s.backupText}>Backup codes let you sign in if you lose access to your authenticator app. Each code can only be used once.</Text>
              <TouchableOpacity style={s.backupBtn} activeOpacity={0.8} onPress={() => Alert.alert('Backup Codes', 'ABCD-1234\nEFGH-5678\nIJKL-9012\nMNOP-3456\n(Save these somewhere safe!)')}>
                <Text style={s.backupBtnText}>View Backup Codes</Text>
              </TouchableOpacity>
            </View>
          </>
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

  heroBanner: { margin: 16, backgroundColor: C.purpleBg, borderRadius: 20, padding: 24, alignItems: 'center' },
  heroTitle:  { fontSize: 17, fontWeight: '700', color: C.dark, marginBottom: 8, textAlign: 'center' },
  heroSub:    { fontSize: 13, color: C.med, lineHeight: 19, textAlign: 'center' },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.grey, letterSpacing: 1, paddingHorizontal: 16, marginTop: 20, marginBottom: 10 },

  methodRow:  { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, gap: 12, ...shadow.sm },
  methodIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  methodLabel:{ fontSize: 14, fontWeight: '600', color: C.dark },
  methodSub:  { fontSize: 12, color: C.grey },
  badge:      { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8 },
  badgeText:  { fontSize: 9, fontWeight: '700' },

  backupCard: { marginHorizontal: 16, backgroundColor: C.white, borderRadius: 16, padding: 16, ...shadow.sm },
  backupText: { fontSize: 13, color: C.med, lineHeight: 18, marginBottom: 12 },
  backupBtn:  { borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1.5, borderColor: C.purple },
  backupBtnText:{ fontSize: 14, fontWeight: '600', color: C.purple },

  qrBox:    { alignItems: 'center', margin: 24, backgroundColor: C.purpleBg, borderRadius: 20, padding: 32 },
  qrHint:   { fontSize: 14, fontWeight: '600', color: C.dark, marginTop: 12 },
  qrSub:    { fontSize: 12, color: C.grey, marginTop: 4, textAlign: 'center' },
  manualBox:{ marginHorizontal: 16, backgroundColor: C.white, borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 8, ...shadow.sm },
  manualLabel:{ fontSize: 12, color: C.grey, marginBottom: 6 },
  manualKey:  { fontSize: 16, fontWeight: '700', color: C.dark, letterSpacing: 2, fontFamily: 'monospace' },
  otpWrap:    { marginHorizontal: 16, marginBottom: 8 },
  otpInput:   { backgroundColor: C.white, borderRadius: 12, paddingVertical: 16, fontSize: 28, fontWeight: '700', color: C.dark, borderWidth: 2, borderColor: C.purple, letterSpacing: 12, ...shadow.sm },
  saveBtn:    { marginHorizontal: 16, marginTop: 16, backgroundColor: C.purple, borderRadius: 14, paddingVertical: 16, alignItems: 'center', ...shadow.sm },
  saveBtnText:{ color: C.white, fontSize: 16, fontWeight: '700' },
});