import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants/Theme';
import StandardHeader from '../components/StandardHeader';

export default function WithdrawInitiatedScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StandardHeader />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBg}>
            <Ionicons name="checkmark" size={36} color="#FFF" />
          </View>
        </View>

        <Text style={styles.title}>Withdrawal Initiated</Text>
        <Text style={styles.subtitle}>
          Your funds are being securely transferred to your linked bank account. This process usually takes 1-3 business days.
        </Text>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Status: Pending</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.amount}>$1,250.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Destination</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.valDark}>Chase Bank</Text>
              <Text style={styles.valSub}>•••• 4242</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.valPurple}>TXN-882941-SKL</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(screens)/TransactionHistory')}>
            <Text style={styles.primaryBtnText}>Track Withdrawal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(screens)/ClientsDashbord')}>
            <Text style={styles.secondaryBtnText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.supportBtn}>
          <Text style={styles.supportText}>Need help? <Text style={{color: C.purple, fontWeight: '600'}}>Contact Support</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA', paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 24) : 0 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },
  
  iconContainer: { alignItems: 'center', marginBottom: 18, marginTop: 28 },
  iconBg: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#7134FF', alignItems: 'center', justifyContent: 'center', shadowColor: C.purple, shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 8 },
  
  title: { fontSize: 22, fontWeight: '800', color: C.dark, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 13, color: C.med, textAlign: 'center', lineHeight: 20, marginBottom: 18, paddingHorizontal: 8 },

  statusBadge: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF1E6', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 18, gap: 5, marginBottom: 24, borderWidth: 1, borderColor: '#EBDEC2' },
  statusDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#B45309' },
  statusText: { color: '#B45309', fontSize: 12, fontWeight: '700' },

  card: { backgroundColor: '#FFF', borderRadius: 14, padding: 16, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },
  label: { fontSize: 12, color: C.med, fontWeight: '500' },
  amount: { fontSize: 18, fontWeight: '800', color: C.dark },
  valDark: { fontSize: 13, fontWeight: '600', color: C.dark, marginBottom: 1 },
  valSub: { fontSize: 11, color: C.med },
  valPurple: { fontSize: 11, fontWeight: '700', color: '#7134FF' },

  actions: { gap: 12, marginBottom: 20 },
  primaryBtn: { backgroundColor: '#7134FF', paddingVertical: 15, borderRadius: 14, alignItems: 'center', shadowColor: C.purple, shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  primaryBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  secondaryBtn: { paddingVertical: 15, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFF' },
  secondaryBtnText: { color: '#7134FF', fontSize: 14, fontWeight: '600' },

  supportBtn: { alignItems: 'center' },
  supportText: { fontSize: 12, color: C.med, fontWeight: '500' },
});