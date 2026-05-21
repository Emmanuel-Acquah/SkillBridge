import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { C } from '../../constants/Theme';

export default function RequestRevisionScreen() {
  const router = useRouter();
  const { job } = useLocalSearchParams<{ job?: string }>();
  const [note, setNote] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={C.purple} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Revision</Text>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.contextCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AR</Text>
          </View>
          <View style={styles.contextBody}>
            <Text style={styles.contextLabel}>PROJECT CONTEXT</Text>
            <Text style={styles.contextTitle}>{job === 'seo' ? 'Enterprise SEO Strategy & Audit' : 'Premium Fintech Mobile App Design'}</Text>
            <Text style={styles.contextMeta}>Expert: {job === 'seo' ? 'Sarah Jenkins' : 'Alex Rivera'}</Text>
          </View>
        </View>

        <Text style={styles.title}>How can we improve?</Text>
        <Text style={styles.subtitle}>
          Provide specific feedback to help your expert deliver exactly what you need.
        </Text>

        <Text style={styles.sectionLabel}>Revision Details</Text>
        <View style={styles.inputBox}>
          <TextInput
            multiline
            value={note}
            onChangeText={setNote}
            placeholder="Describe the changes you'd like to see. For example: Please change the primary CTA color to a deeper purple and update the onboarding typography to be bolder."
            placeholderTextColor="#98A0B6"
            style={styles.input}
            textAlignVertical="top"
          />
          <View style={styles.tipPill}>
            <Ionicons name="information-circle-outline" size={12} color="#727A92" />
            <Text style={styles.tipText}>Specific details help experts work faster</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Upload Attachments</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <View style={styles.plusCircle}>
            <Ionicons name="add" size={20} color={C.purple} />
          </View>
          <Text style={styles.uploadTitle}>Click or drag files to upload</Text>
          <Text style={styles.uploadSub}>PNG, JPG or PDF (Max 25MB)</Text>
        </TouchableOpacity>

        <View style={styles.guaranteeCard}>
          <View style={styles.guaranteeRow}>
            <Ionicons name="shield-checkmark-outline" size={13} color="#A66B00" />
            <Text style={styles.guaranteeLabel}>SKILLBRIDGE GUARANTEE</Text>
          </View>
          <Text style={styles.guaranteeText}>
            Your expert is committed to 2 rounds of minor revisions per milestone. Complex scope changes may require a custom quote.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Revision Request</Text>
          <Ionicons name="paper-plane-outline" size={14} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.footerHint}>The expert usually responds within 24 hours.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 8,
  },
  iconBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#20283B' },

  content: { paddingHorizontal: 10, paddingBottom: 120 },
  contextCard: {
    marginTop: 8,
    backgroundColor: '#ECECF4',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#1B3358', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  contextBody: { flex: 1 },
  contextLabel: { fontSize: 9, fontWeight: '700', color: '#5C637B', letterSpacing: 0.4 },
  contextTitle: { marginTop: 1, fontSize: 13, fontWeight: '700', color: '#272D40' },
  contextMeta: { marginTop: 1, fontSize: 11, color: '#57607A' },

  title: { marginTop: 14, fontSize: 35, fontWeight: '800', color: '#1E2537', lineHeight: 38 },
  subtitle: { marginTop: 6, fontSize: 13, color: '#65708A', lineHeight: 18 },

  sectionLabel: { marginTop: 14, marginBottom: 8, fontSize: 12, color: '#3B435C', fontWeight: '700' },
  inputBox: { backgroundColor: '#ECEFF7', borderRadius: 10, padding: 8 },
  input: { minHeight: 98, fontSize: 12, color: '#374151', lineHeight: 18 },
  tipPill: {
    marginTop: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tipText: { fontSize: 10, color: '#727A92' },

  uploadBox: {
    height: 118,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D5D9E7',
    backgroundColor: '#F3F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#E0D7FF', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  uploadTitle: { fontSize: 12, fontWeight: '700', color: '#2E3344' },
  uploadSub: { marginTop: 2, fontSize: 10, color: '#7A8097' },

  guaranteeCard: {
    marginTop: 14,
    backgroundColor: '#FBF4E8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1E0C6',
    padding: 10,
  },
  guaranteeRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  guaranteeLabel: { fontSize: 10, fontWeight: '700', color: '#A66B00' },
  guaranteeText: { marginTop: 6, fontSize: 11, color: '#6F5A37', lineHeight: 16 },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E8F1',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
  },
  submitBtn: {
    backgroundColor: C.purple,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  submitText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  footerHint: { marginTop: 8, textAlign: 'center', fontSize: 10, color: '#8B91A8' },
});