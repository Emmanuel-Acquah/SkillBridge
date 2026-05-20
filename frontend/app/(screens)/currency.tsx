// app/settings/currency.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { C, shadow } from '../../constants/Theme';

const ALL_CURRENCIES = [
  { code: 'USD', symbol: '$',  label: 'US Dollar',         flag: '🇺🇸' },
  { code: 'EUR', symbol: '€',  label: 'Euro',              flag: '🇪🇺' },
  { code: 'GBP', symbol: '£',  label: 'British Pound',     flag: '🇬🇧' },
  { code: 'CAD', symbol: 'CA$',label: 'Canadian Dollar',   flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'JPY', symbol: '¥',  label: 'Japanese Yen',      flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥',  label: 'Chinese Yuan',      flag: '🇨🇳' },
  { code: 'INR', symbol: '₹',  label: 'Indian Rupee',      flag: '🇮🇳' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real',    flag: '🇧🇷' },
  { code: 'NGN', symbol: '₦',  label: 'Nigerian Naira',    flag: '🇳🇬' },
  { code: 'GHS', symbol: '₵',  label: 'Ghanaian Cedi',     flag: '🇬🇭' },
  { code: 'ZAR', symbol: 'R',  label: 'South African Rand',flag: '🇿🇦' },
  { code: 'AED', symbol: 'د.إ',label: 'UAE Dirham',        flag: '🇦🇪' },
];

export default function CurrencyScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('USD');
  const [search, setSearch]     = useState('');

  const filtered = ALL_CURRENCIES.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Currency</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.searchWrap}>
          <Text style={{ fontSize: 16 }}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search currency..."
            placeholderTextColor={C.grey}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        {filtered.map(cur => (
          <TouchableOpacity
            key={cur.code}
            style={[s.row, selected === cur.code && s.rowActive]}
            activeOpacity={0.82}
            onPress={() => { setSelected(cur.code); setTimeout(() => router.back(), 300); }}
          >
            <Text style={{ fontSize: 26 }}>{cur.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[s.curCode, selected === cur.code && { color: C.purple }]}>{cur.code}</Text>
              <Text style={s.curLabel}>{cur.label}</Text>
            </View>
            <Text style={[s.curSymbol, selected === cur.code && { color: C.purple }]}>{cur.symbol}</Text>
            {selected === cur.code && <Text style={{ color: C.purple, fontSize: 18, marginLeft: 6 }}>✓</Text>}
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: C.white },
  scroll:     { flex: 1, backgroundColor: C.bg },
  content:    { paddingBottom: 24 },
  header:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  backBtn:    { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:   { fontSize: 22, color: C.dark },
  headerTitle:{ fontSize: 18, fontWeight: '700', color: C.dark },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, margin: 16, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8, borderWidth: 1.5, borderColor: C.border },
  searchInput:{ flex: 1, fontSize: 14, color: C.dark },
  row:        { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, gap: 12, ...shadow.sm },
  rowActive:  { borderWidth: 2, borderColor: C.purple },
  curCode:    { fontSize: 14, fontWeight: '700', color: C.dark },
  curLabel:   { fontSize: 12, color: C.grey, marginTop: 2 },
  curSymbol:  { fontSize: 16, fontWeight: '600', color: C.med },
});