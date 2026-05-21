import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { C } from '../../constants/Theme';

export default function WithdrawVerificationScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');

  const handlePress = (num: string) => {
    if (pin.length < 4) setPin(prev => prev + num);
  };
  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={C.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdrawal Confirmation</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="card" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.shieldIconContainer}>
          <View style={styles.shieldBg}>
            <Ionicons name="shield-checkmark" size={20} color={C.purple} />
          </View>
          <Text style={styles.securityText}>SECURITY VERIFIED</Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.amount}>$200.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Destination</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.valDark}>MTN Mobile Money</Text>
              <Text style={styles.valSub}>+233 24 123 4567</Text>
            </View>
          </View>
          <View style={[styles.row, {marginTop: 12}]}>
            <Text style={styles.label}>Processing time</Text>
            <View style={styles.timeWrap}>
              <Feather name="clock" size={12} color="#B45309" />
              <Text style={styles.valTime}>1-3 days</Text>
            </View>
          </View>
          <View style={[styles.row, {marginTop: 12}]}>
            <Text style={styles.label}>Transaction Fee</Text>
            <Text style={styles.valGreen}>Free</Text>
          </View>
        </View>

        <Text style={styles.verifyTitle}>Security Verification</Text>
        <Text style={styles.verifySub}>Enter your 4-digit security PIN to authorize this withdrawal.</Text>

        <View style={styles.pinDots}>
          {[1,2,3,4].map((i) => (
            <View key={i} style={[styles.dot, pin.length >= i && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.numpad}>
          {[[1,2,3], [4,5,6], [7,8,9]].map((row, rIdx) => (
            <View key={rIdx} style={styles.numRow}>
              {row.map(num => (
                <TouchableOpacity key={num} style={styles.numBtn} onPress={() => handlePress(num.toString())}>
                  <Text style={styles.numText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <View style={styles.numRow}>
            <View style={styles.numBtnEmpty} />
            <TouchableOpacity style={styles.numBtn} onPress={() => handlePress('0')}>
              <Text style={styles.numText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numBtnEmpty} onPress={handleDelete}>
              <Ionicons name="backspace-outline" size={20} color={C.dark} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.confirmBtn, pin.length === 4 && styles.confirmBtnActive]} 
          onPress={() => router.push('/(screens)/withdrawInitiated')}
          disabled={pin.length !== 4}
        >
          <Text style={styles.confirmBtnText}>Confirm Withdrawal</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(screens)/withdrawFunds')} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA', paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 24) : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 15, fontWeight: '700', color: C.purple, flex: 1, marginLeft: 10 },
  iconBtn: { padding: 6, backgroundColor: '#1A2B4C', borderRadius: 12 },
  
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingVertical: 14, paddingBottom: 20 },
  
  shieldIconContainer: { alignItems: 'center', marginTop: 8, marginBottom: 18 },
  shieldBg: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  securityText: { fontSize: 10, fontWeight: '700', color: C.med, letterSpacing: 0.3 },

  detailsCard: { backgroundColor: '#FFF', borderRadius: 14, padding: 16, marginBottom: 18, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },
  label: { fontSize: 12, color: C.med, fontWeight: '500' },
  amount: { fontSize: 18, fontWeight: '800', color: C.dark },
  valDark: { fontSize: 12, fontWeight: '700', color: C.dark, marginBottom: 1 },
  valSub: { fontSize: 10, color: C.med },
  timeWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  valTime: { fontSize: 12, fontWeight: '600', color: C.dark },
  valGreen: { fontSize: 12, fontWeight: '700', color: '#0B8E36' },

  verifyTitle: { fontSize: 16, fontWeight: '700', color: C.dark, textAlign: 'center', marginBottom: 6 },
  verifySub: { fontSize: 12, color: C.med, textAlign: 'center', paddingHorizontal: 20, lineHeight: 16, marginBottom: 16 },

  pinDots: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 20 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E5E7EB' },
  dotActive: { backgroundColor: '#C4B5FD' },

  numpad: { paddingHorizontal: 8, marginBottom: 18 },
  numRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, gap: 8 },
  numBtn: { flex: 1, height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 },
  numBtnEmpty: { flex: 1, height: 56 },
  numText: { fontSize: 22, fontWeight: '600', color: C.dark },

  confirmBtn: { backgroundColor: '#D8D1F0', paddingVertical: 16, borderRadius: 18, alignItems: 'center', marginBottom: 12 },
  confirmBtnActive: { backgroundColor: '#7134FF' },
  confirmBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  cancelBtn: { alignItems: 'center', paddingVertical: 8 },
  cancelText: { color: C.dark, fontSize: 12, fontWeight: '600' },
});