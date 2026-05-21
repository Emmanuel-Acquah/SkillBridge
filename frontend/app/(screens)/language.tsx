// app/settings/language.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { C, shadow } from '../../constants/Theme';

const LANGUAGES = [
  { code: 'en-US', label: 'English (US)',       flag: '🇺🇸' },
  { code: 'en-GB', label: 'English (UK)',       flag: '🇬🇧' },
  { code: 'fr',    label: 'Français',           flag: '🇫🇷' },
  { code: 'de',    label: 'Deutsch',            flag: '🇩🇪' },
  { code: 'es',    label: 'Español',            flag: '🇪🇸' },
  { code: 'pt',    label: 'Português (BR)',     flag: '🇧🇷' },
  { code: 'zh',    label: '中文 (简体)',          flag: '🇨🇳' },
  { code: 'ja',    label: '日本語',              flag: '🇯🇵' },
  { code: 'ar',    label: 'العربية',            flag: '🇸🇦' },
  { code: 'hi',    label: 'हिन्दी',               flag: '🇮🇳' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('en-US');

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Language</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.hint}>Choose the language for the SkillBridge app interface.</Text>
        {LANGUAGES.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[s.row, selected === lang.code && s.rowActive]}
            activeOpacity={0.82}
            onPress={() => { setSelected(lang.code); setTimeout(() => router.back(), 300); }}
          >
            <Text style={{ fontSize: 26 }}>{lang.flag}</Text>
            <Text style={[s.rowLabel, selected === lang.code && s.rowLabelActive]}>{lang.label}</Text>
            {selected === lang.code && <Text style={{ color: C.purple, fontSize: 18 }}>✓</Text>}
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
  content:    { paddingBottom: 24, paddingTop: 4 },
  header:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  backBtn:    { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon:   { fontSize: 22, color: C.dark },
  headerTitle:{ fontSize: 18, fontWeight: '700', color: C.dark },
  hint:       { fontSize: 13, color: C.grey, margin: 16 },
  row:        { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, gap: 14, ...shadow.sm },
  rowActive:  { borderWidth: 2, borderColor: C.purple },
  rowLabel:   { flex: 1, fontSize: 15, color: C.dark, fontWeight: '500' },
  rowLabelActive: { fontWeight: '700', color: C.purple },
});