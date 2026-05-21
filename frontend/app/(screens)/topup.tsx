import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { C } from '../../constants/Theme';

const AMOUNTS = [10, 25, 50, 100];
const MOBILE_MONEY = [
  { id: 'mtn', name: 'MTN', color: '#FFCC00', icon: 'alpha-m-circle' },
  { id: 'telecel', name: 'Telecel', color: '#FF3333', icon: 'alpha-v-circle' },
  { id: 'airteltigo', name: 'AirtelTigo', color: '#0033A0', icon: 'alpha-a-circle' }
];

export default function TopUpScreen() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'mtn' | 'telecel' | 'airteltigo' | 'card' | 'bank' | null>('mtn');

  const onSelectAmount = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount('');
  };

  const handleContinue = () => {
    // Navigate to Confirm Top Up
    router.push('/(screens)/confirmTopUp');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={C.purple} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Up Wallet</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Ionicons name="help-circle-outline" size={24} color={C.dark} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        
        {/* Wallet Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Ionicons name="wallet-outline" size={20} color={C.white} />
          </View>
          <Text style={styles.balanceAmount}>$1,250.00</Text>
          <View style={styles.walletMeta}>
            <View style={styles.walletBadge}>
              <Text style={styles.walletBadgeText}>Primary Wallet</Text>
            </View>
            <Text style={styles.walletLast4}>•••• 4421</Text>
          </View>
        </View>

        {/* Select Amount Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Amount</Text>
          <Text style={styles.currencyLabel}>USD</Text>
        </View>

        <View style={styles.amountGrid}>
          {AMOUNTS.map((amt) => {
            const isSelected = selectedAmount === amt;
            return (
              <TouchableOpacity
                key={amt}
                style={[styles.amountBtn, isSelected && styles.amountBtnActive]}
                onPress={() => onSelectAmount(amt)}
              >
                <Text style={[styles.amountText, isSelected && styles.amountTextActive]}>${amt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.customAmountWrap}>
          <Text style={styles.customAmountSymbol}>$</Text>
          <TextInput 
            style={styles.customInput}
            placeholder="Enter custom amount"
            placeholderTextColor={C.grey}
            keyboardType="decimal-pad"
            value={customAmount}
            onChangeText={(v) => {
              setCustomAmount(v);
              setSelectedAmount(null);
            }}
          />
        </View>

        {/* Payment Method Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 16 }]}>Payment Method</Text>
        
        <View style={styles.methodsWrap}>
          <Text style={styles.methodsLabel}>MOBILE MONEY</Text>
          
          <View style={styles.momoRow}>
            {MOBILE_MONEY.map((m) => {
              const isSelected = selectedMethod === m.id;
              return (
                <View style={styles.momoItemContainer} key={m.id}>
                  <TouchableOpacity
                    style={[styles.momoBtn, isSelected && styles.momoBtnActive]}
                    onPress={() => setSelectedMethod(m.id as any)}
                  >
                    <View style={styles.momoIconWrap}>
                      <MaterialCommunityIcons name={m.icon as any} size={28} color={m.color} />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.momoLabel}>{m.name}</Text>
                </View>
              );
            })}
          </View>

          <TouchableOpacity style={styles.methodRow} onPress={() => setSelectedMethod('card')}>
            <View style={[styles.methodIconWrap, { backgroundColor: C.purpleBg }]}>
              <Ionicons name="card-outline" size={20} color={C.purple} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.methodTitle}>Credit / Debit Card</Text>
              <Text style={styles.methodSub}>Visa, Mastercard, Maestro</Text>
            </View>
            <View style={[styles.radio, selectedMethod === 'card' && styles.radioActive]}>
              {selectedMethod === 'card' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.methodRow} onPress={() => setSelectedMethod('bank')}>
            <View style={[styles.methodIconWrap, { backgroundColor: C.purpleBg }]}>
              <MaterialCommunityIcons name="bank-outline" size={20} color={C.purple} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.methodTitle}>Bank Transfer</Text>
              <Text style={styles.methodSub}>Instant transfer available</Text>
            </View>
            <View style={[styles.radio, selectedMethod === 'bank' && styles.radioActive]}>
              {selectedMethod === 'bank' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Continue */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="chevron-forward" size={18} color={C.white} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 24) : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border },
  backBtn: { padding: 4 },
  helpBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.purple },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

  balanceCard: { backgroundColor: C.purple, borderRadius: 20, padding: 24, marginBottom: 24, shadowColor: C.purple, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '500' },
  balanceAmount: { color: C.white, fontSize: 32, fontWeight: '700', marginBottom: 16 },
  walletMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  walletBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  walletBadgeText: { color: C.white, fontSize: 11, fontWeight: '600' },
  walletLast4: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '500' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: C.dark },
  currencyLabel: { fontSize: 12, fontWeight: '700', color: C.purple },

  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  amountBtn: { width: '48%', backgroundColor: C.white, paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  amountBtnActive: { backgroundColor: C.purple, shadowColor: C.purple, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  amountText: { fontSize: 18, fontWeight: '600', color: C.dark },
  amountTextActive: { color: C.white },

  customAmountWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 14, marginTop: 16, paddingHorizontal: 16, paddingVertical: 14 },
  customAmountSymbol: { fontSize: 18, fontWeight: '600', color: C.med, marginRight: 8 },
  customInput: { flex: 1, fontSize: 16, fontWeight: '500', color: C.dark },

  methodsWrap: { backgroundColor: C.white, borderRadius: 20, padding: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  methodsLabel: { fontSize: 10, fontWeight: '700', color: C.grey, letterSpacing: 1, marginBottom: 12 },
  momoRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  momoItemContainer: { alignItems: 'center', gap: 6 },
  momoBtn: { width: 64, height: 64, borderRadius: 16, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  momoBtnActive: { borderColor: C.purple, backgroundColor: C.purpleBg, borderWidth: 1.5 },
  momoIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  momoLabel: { fontSize: 10, fontWeight: '500', color: C.med },

  methodRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  methodIconWrap: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  methodTitle: { fontSize: 14, fontWeight: '600', color: C.dark, marginBottom: 2 },
  methodSub: { fontSize: 11, color: C.grey },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: C.grey, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: C.purple },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: C.purple },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingVertical: 20, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  continueBtn: { flexDirection: 'row', backgroundColor: C.purple, paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: C.purple, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  continueBtnText: { color: C.white, fontSize: 16, fontWeight: '600', marginRight: 4 },
});