import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { C } from '../../constants/Theme';

export default function ConfirmTopUpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={C.purple} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SkillBridge</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={24} color={C.dark} />
          </TouchableOpacity>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>A</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Confirm Top Up</Text>
        <Text style={styles.subtitle}>Please review your transaction details before proceeding.</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.valAmount}>$50.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={[styles.row, { marginBottom: 12 }]}>
            <Text style={styles.label}>Fees</Text>
            <Text style={styles.valSub}>$0.50</Text>
          </View>

          <View style={[styles.row, { marginBottom: 24 }]}>
            <Text style={styles.label}>Payment Method</Text>
            <View style={styles.methodBadgeWrap}>
              <View style={styles.momoBadge}>
                <Text style={styles.momoBadgeText}>MTN</Text>
              </View>
              <Text style={styles.valSubDark}>MTN Mobile Money</Text>
            </View>
          </View>

          <View style={styles.rowTotal}>
            <Text style={styles.labelTotal}>Total Charged</Text>
            <Text style={styles.valTotal}>$50.50</Text>
          </View>

          {/* Secure Mockup Banner */}
          <View style={styles.secureBanner}>
            <View style={styles.secureOverlay}>
              <Ionicons name="shield-checkmark" size={12} color={C.white} />
              <Text style={styles.secureText}>Secured by SkillBridge Pay</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.confirmBtn} onPress={() => router.push('/(screens)/topupSuccess')}>
            <Text style={styles.confirmBtnText}>Confirm Payment</Text>
            <Ionicons name="chevron-forward" size={16} color={C.white} style={{ marginTop: 2, marginLeft: 2 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn} onPress={() => router.back()}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.encryptWrap}>
          <Ionicons name="lock-closed-outline" size={12} color={C.grey} />
          <Text style={styles.encryptText}>END-TO-END ENCRYPTED</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 24) : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.purple, letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { padding: 4 },
  userAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center' },
  userAvatarText: { color: C.white, fontSize: 13, fontWeight: '700' },

  content: { flex: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: '800', color: C.dark, marginBottom: 8 },
  subtitle: { fontSize: 13, color: C.med, lineHeight: 18, marginBottom: 24, paddingRight: 40 },

  card: { backgroundColor: C.white, borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4, marginBottom: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 13, color: C.med, fontWeight: '500' },
  valAmount: { fontSize: 20, fontWeight: '800', color: C.dark },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 20 },
  valSub: { fontSize: 13, color: C.dark, fontWeight: '500' },
  methodBadgeWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  momoBadge: { backgroundColor: '#FFCC00', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  momoBadgeText: { fontSize: 9, fontWeight: '700', color: '#000' },
  valSubDark: { fontSize: 13, color: C.dark, fontWeight: '600' },
  
  rowTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  labelTotal: { fontSize: 15, fontWeight: '700', color: C.dark },
  valTotal: { fontSize: 18, fontWeight: '700', color: C.purple },

  secureBanner: { height: 110, backgroundColor: '#1A1A2E', borderRadius: 16, overflow: 'hidden', justifyContent: 'flex-end' },
  secureOverlay: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 12, backgroundColor: 'rgba(0,0,0,0.4)' },
  secureText: { color: C.white, fontSize: 11, fontWeight: '600' },

  actions: { gap: 14, marginBottom: 40 },
  confirmBtn: { flexDirection: 'row', backgroundColor: C.purple, paddingVertical: 18, borderRadius: 20, alignItems: 'center', justifyContent: 'center', shadowColor: C.purple, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  confirmBtnText: { color: C.white, fontSize: 15, fontWeight: '600' },
  editBtn: { backgroundColor: C.white, paddingVertical: 18, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F3EEFF' },
  editBtnText: { color: C.purple, fontSize: 15, fontWeight: '700' },

  encryptWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 'auto' },
  encryptText: { fontSize: 10, fontWeight: '700', color: C.grey, letterSpacing: 1 },
});