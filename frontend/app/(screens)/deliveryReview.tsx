import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { C } from '../../constants/Theme';

const FILES_FINTECH = [
  { name: 'Fintech_UI_v2.fig', meta: '24.5 MB • FIG' },
  { name: 'Brand_Assets.zip', meta: '158 MB • ZIP' },
];

const FILES_SEO = [
  { name: 'SEO_Audit_Report.pdf', meta: '7.3 MB • PDF' },
  { name: 'Keyword_Cluster_Map.xlsx', meta: '2.1 MB • XLSX' },
];

export default function DeliveryReviewScreen() {
  const router = useRouter();
  const { job } = useLocalSearchParams<{ job?: string }>();

  const FILES = job === 'seo' ? FILES_SEO : FILES_FINTECH;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={C.purple} />
        </TouchableOpacity>
        <View style={styles.headCenter}>
          <Text style={styles.headerTitle}>Delivery Review</Text>
          <Text style={styles.headerSub}>ORDER ID #38-8211</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="share-social-outline" size={17} color={C.purple} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.awaitingCard}>
          <View style={styles.awaitingIcon}>
            <Ionicons name="alert-circle-outline" size={13} color={C.purple} />
          </View>
          <View>
            <Text style={styles.awaitingTitle}>Awaiting your review</Text>
            <Text style={styles.awaitingSub}>{job === 'seo' ? 'Submitted May 20' : 'Submitted Oct 22'}</Text>
          </View>
        </View>

        <View style={styles.expertCard}>
          <View style={styles.expertTop}>
            <View style={styles.expertLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>DC</Text>
              </View>
              <View>
                <Text style={styles.expertName}>David Chen</Text>
                <Text style={styles.expertRole}>Smart Contract Developer</Text>
              </View>
            </View>
            <View style={styles.ratingWrap}>
              <Text style={styles.rating}>4.8</Text>
              <Ionicons name="star" size={11} color="#FBBF24" />
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Project:</Text>
            <Text style={styles.fieldValue}>{job === 'seo' ? 'Enterprise SEO Strategy & Audit' : 'Premium Fintech Mobile App Design'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Delivery Note</Text>
        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            Hi! I’ve completed the full smart contract audit. All critical vulnerabilities have been patched. Please find the detailed report and updated contracts in the files below.
          </Text>
          <Text style={styles.noteTime}>Oct 22, 2:34 PM</Text>
        </View>

        <View style={styles.filesHeader}>
          <Text style={styles.sectionTitle}>Delivered Files</Text>
          <TouchableOpacity>
            <Text style={styles.downloadAll}>Download All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fileList}>
          {FILES.map((item, index) => (
            <View key={item.name} style={[styles.fileRow, index !== FILES.length - 1 && styles.fileDivider]}>
              <View style={styles.fileLeft}>
                <View style={styles.fileIconWrap}>
                  <Ionicons name="document-text-outline" size={16} color={C.purple} />
                </View>
                <View>
                  <Text style={styles.fileName}>{item.name}</Text>
                  <Text style={styles.fileMeta}>{item.meta}</Text>
                </View>
              </View>
              <Ionicons name="download-outline" size={17} color={C.purple} />
            </View>
          ))}
        </View>

        <View style={styles.rateWrap}>
          <Text style={styles.rateTitle}>Rate this delivery</Text>
          <Text style={styles.rateSub}>How was David’s work?</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Ionicons key={n} name="star-outline" size={20} color="#C9CCDA" />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.approveBtn}>
          <Text style={styles.approveText}>Approve Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.revisionBtn} onPress={() => router.push('/(screens)/requestRevision')}>
          <Text style={styles.revisionText}>Request Revision</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F7FB' },
  header: {
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  headCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 21, fontWeight: '700', color: '#1F2638' },
  headerSub: { marginTop: 1, fontSize: 9, color: '#9599AC', fontWeight: '700', letterSpacing: 0.4 },

  content: { paddingHorizontal: 10, paddingBottom: 120 },
  awaitingCard: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#ECE8FA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  awaitingIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E1D9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  awaitingTitle: { fontSize: 12, fontWeight: '700', color: C.purple },
  awaitingSub: { marginTop: 2, fontSize: 10, color: '#6D738A' },

  expertCard: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E8EAF3',
  },
  expertTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  expertLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 10, fontWeight: '700', color: '#334155' },
  expertName: { fontSize: 13, fontWeight: '700', color: '#111827' },
  expertRole: { marginTop: 1, fontSize: 10, color: '#7A8098' },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 11, fontWeight: '700', color: '#374151' },

  fieldRow: { marginTop: 8, flexDirection: 'row' },
  fieldLabel: { fontSize: 11, color: '#767C92', fontStyle: 'italic' },
  fieldValue: { fontSize: 11, color: '#4B5563', fontStyle: 'italic' },

  sectionTitle: { marginTop: 12, marginBottom: 8, fontSize: 13, fontWeight: '700', color: '#3B4157' },
  noteCard: {
    backgroundColor: '#ECEFF7',
    borderRadius: 10,
    padding: 10,
  },
  noteText: { fontSize: 12, color: '#4B5563', lineHeight: 18 },
  noteTime: { marginTop: 10, textAlign: 'right', fontSize: 10, color: '#7F879E' },

  filesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  downloadAll: { marginTop: 8, fontSize: 12, color: C.purple, fontWeight: '700' },

  fileList: { backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#E8EAF3' },
  fileRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 11 },
  fileLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fileIconWrap: { width: 24, height: 24, borderRadius: 8, backgroundColor: '#F3EEFF', alignItems: 'center', justifyContent: 'center' },
  fileName: { fontSize: 11, fontWeight: '700', color: '#1F2937' },
  fileMeta: { marginTop: 2, fontSize: 9, color: '#7A8197' },
  fileDivider: { borderBottomWidth: 1, borderBottomColor: '#EFF1F7' },

  rateWrap: { alignItems: 'center', marginTop: 18 },
  rateTitle: { fontSize: 15, fontWeight: '700', color: '#21293E' },
  rateSub: { marginTop: 3, fontSize: 12, color: '#7D839B' },
  stars: { marginTop: 8, flexDirection: 'row', gap: 8 },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EAF3',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 10,
  },
  approveBtn: { backgroundColor: C.purple, borderRadius: 999, paddingVertical: 13, alignItems: 'center' },
  approveText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  revisionBtn: { borderRadius: 999, borderWidth: 1.5, borderColor: '#C6B8F8', paddingVertical: 12, alignItems: 'center', backgroundColor: '#FAF8FF' },
  revisionText: { color: C.purple, fontSize: 13, fontWeight: '700' },
});