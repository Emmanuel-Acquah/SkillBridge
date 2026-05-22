import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { C } from '../../constants/Theme';

export default function WithdrawFundsScreen() {
  const router = useRouter();
  const [method, setMethod] = useState('momo');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={C.purple} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdraw Funds</Text>
        <Image source={{ uri: 'https://i.pravatar.cc/100?img=11' }} style={styles.avatar} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$1,300.50</Text>
          <View style={styles.readyBadge}>
            <Ionicons name="checkmark-circle-outline" size={12} color="#FFF" />
            <Text style={styles.readyText}>Funds ready to withdraw</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ENTER AMOUNT</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput 
            style={styles.amountInput}
            value="500.00"
            keyboardType="numeric"
          />
          <TouchableOpacity>
            <Text style={styles.maxText}>Max</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>WITHDRAW TO</Text>
        
        {/* Mobile Money */}
        <TouchableOpacity style={[styles.methodCard, method === 'momo' && styles.methodCardActive]} onPress={() => setMethod('momo')}>
          <View style={[styles.methodIconBg, { backgroundColor: '#E6FBD9' }]}>
            <Ionicons name="phone-portrait-outline" size={18} color="#0B8E36" />
          </View>
          <View style={styles.methodInfo}>
            <Text style={styles.methodName}>Mobile Money</Text>
            <Text style={styles.methodSub}>+1 (555) 012-3456</Text>
          </View>
          <Feather name="edit-2" size={14} color={C.med} style={{ marginRight: 8 }} />
          <Ionicons name={method === 'momo' ? "radio-button-on" : "radio-button-off"} size={20} color={method === 'momo' ? C.purple : C.grey} />
        </TouchableOpacity>

        {/* Bank Account */}
        <TouchableOpacity style={[styles.methodCard, method === 'bank' && styles.methodCardActive]} onPress={() => setMethod('bank')}>
          <View style={[styles.methodIconBg, { backgroundColor: '#EEF2FF' }]}>
            <Ionicons name="business-outline" size={18} color={C.purple} />
          </View>
          <View style={styles.methodInfo}>
            <Text style={styles.methodName}>Bank Account</Text>
            <Text style={styles.methodSub}>Chase Bank •••• 8821</Text>
          </View>
          <Ionicons name={method === 'bank' ? "radio-button-on" : "radio-button-off"} size={20} color={method === 'bank' ? C.purple : C.grey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addMethodBtn}>
          <Ionicons name="add-circle-outline" size={18} color={C.purple} />
          <Text style={styles.addMethodText}>Add New Method</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={16} color={C.med} />
          <Text style={styles.infoText}>Withdrawals may take 1-3 business days to reflect in your account depending on your provider.</Text>
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={() => router.push('/(screens)/withdrawVerification')}>
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA', paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 24) : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, backgroundColor: '#F8F9FA', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 15, fontWeight: '700', color: C.purple, flex: 1, marginLeft: 10 },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingVertical: 14, paddingBottom: 24 },
  
  balanceCard: { backgroundColor: C.purple, borderRadius: 14, padding: 18, marginBottom: 18, shadowColor: C.purple, shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 4 },
  balanceLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '500', marginBottom: 5 },
  balanceAmount: { color: '#FFF', fontSize: 26, fontWeight: '800', marginBottom: 10 },
  readyBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 14, gap: 3 },
  readyText: { color: '#FFF', fontSize: 10, fontWeight: '500' },

  sectionTitle: { fontSize: 10, fontWeight: '700', color: C.med, letterSpacing: 0.3, marginBottom: 9, marginTop: 5 },
  
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 11, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  currencySymbol: { fontSize: 16, fontWeight: '700', color: C.purple, marginRight: 5 },
  amountInput: { flex: 1, fontSize: 16, fontWeight: '700', color: C.dark, padding: 0 },
  maxText: { fontSize: 11, fontWeight: '600', color: C.purple },

  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 9, borderWidth: 1, borderColor: '#E5E7EB' },
  methodCardActive: { borderColor: C.purple, borderWidth: 1.5, backgroundColor: '#F9F7FF' },
  methodIconBg: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  methodInfo: { flex: 1 },
  methodName: { fontSize: 12, fontWeight: '700', color: C.dark, marginBottom: 1 },
  methodSub: { fontSize: 10, color: C.med },

  addMethodBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingVertical: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderStyle: 'dashed', gap: 5 },
  addMethodText: { fontSize: 12, fontWeight: '600', color: C.purple },

  infoBox: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 10, padding: 11, alignItems: 'flex-start', gap: 8, marginBottom: 12 },
  infoText: { flex: 1, fontSize: 10, color: C.med, lineHeight: 14 },

  continueBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#7134FF', borderRadius: 18, paddingVertical: 14, gap: 5 },
  continueBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' }
});