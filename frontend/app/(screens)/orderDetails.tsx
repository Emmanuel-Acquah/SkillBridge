import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../constants/Theme';

type Milestone = {
  name: string;
  due: string;
  status: 'Completed' | 'In Progress' | 'Pending';
};

type OrderDetailsModel = {
  orderCode: string;
  title: string;
  progress: string;
  dueLabel: string;
  expertName: string;
  expertRole: string;
  company: string;
  image: any;
  files: { name: string; size: string }[];
  milestones: Milestone[];
};

const ORDER_DATA: Record<string, OrderDetailsModel> = {
  fintech: {
    orderCode: '#108-1412',
    title: 'Premium Fintech Mobile App Design',
    progress: '75% Complete',
    dueLabel: 'Due in 2 days',
    expertName: 'Alex Rivera',
    expertRole: 'Lead Product Designer',
    company: 'TYC Company',
    image: require('../../assets/images/mobileappdesign.jpg'),
    files: [
      { name: 'Fintech_UI_v2.fig', size: '24.5 MB' },
      { name: 'Brand_Assets.zip', size: '158 MB' },
    ],
    milestones: [
      { name: 'Wireframes & Research', due: 'Completed • Oct 10', status: 'Completed' },
      { name: 'UI Design System', due: 'Due Oct 26', status: 'In Progress' },
      { name: 'Prototype & Handoff', due: 'Due Nov 5', status: 'Pending' },
    ],
  },
  seo: {
    orderCode: '#58-9110',
    title: 'Enterprise SEO Strategy & Audit',
    progress: '25% Complete',
    dueLabel: 'Due in 14 days',
    expertName: 'Sarah Jenkins',
    expertRole: 'SEO Strategist',
    company: 'Growth Axis',
    image: require('../../assets/images/enterprise.jpg'),
    files: [
      { name: 'SEO_Audit_Report.pdf', size: '7.3 MB' },
      { name: 'Keyword_Cluster_Map.xlsx', size: '2.1 MB' },
    ],
    milestones: [
      { name: 'Technical SEO Crawl', due: 'Completed • May 17', status: 'Completed' },
      { name: 'On-page Optimization', due: 'Due May 27', status: 'In Progress' },
      { name: 'Backlink Gap Analysis', due: 'Due Jun 3', status: 'Pending' },
    ],
  },
};

function badgeStyle(status: Milestone['status']) {
  if (status === 'Completed') {
    return { bg: '#E8F8EF', text: '#1B8E4B' };
  }
  if (status === 'In Progress') {
    return { bg: '#EEE9FF', text: C.purple };
  }
  return { bg: '#EEF0F5', text: '#6B7280' };
}

export default function OrderDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { job } = useLocalSearchParams<{ job?: string }>();
  const details = ORDER_DATA[job === 'seo' ? 'seo' : 'fintech'];

  React.useEffect(() => {
    console.log('OrderDetails - Job Param:', job);
    console.log('OrderDetails - Details:', details);
  }, [job, details]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={20} color={C.purple} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="share-social-outline" size={18} color={C.purple} />
        </TouchableOpacity>
      </View>

      {!details ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#999', fontSize: 14 }}>Loading order details...</Text>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <View style={styles.heroCard}>
              <ImageBackground source={details.image} style={styles.heroImage} imageStyle={styles.heroImageInner} resizeMode="cover">
                <View style={styles.heroTopRow}>
                  <View style={styles.pillInProgress}>
                    <Text style={styles.pillInProgressText}>In Progress</Text>
                  </View>
                  <Text style={styles.orderCode}>{details.orderCode}</Text>
                </View>
              </ImageBackground>

              <Text style={styles.title}>{details.title}</Text>

              <View style={styles.metaRow}>
                <View style={styles.expertWrap}>
                  <Image source={{ uri: job === 'seo' ? 'https://i.pravatar.cc/100?img=5' : 'https://i.pravatar.cc/100?img=12' }} style={styles.avatar} />
                  <View>
                    <Text style={styles.metaName}>{details.expertName}</Text>
                    <Text style={styles.metaSub}>{details.expertRole}</Text>
                  </View>
                </View>
                <View style={styles.companyWrap}>
                  <MaterialIcons name="business" size={14} color="#888EA8" />
                  <Text style={styles.companyText}>{details.company}</Text>
                </View>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHead}>
                <Text style={styles.sectionLabel}>PROJECT MILESTONE</Text>
                <Text style={styles.progressLabel}>{details.progress}</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: details.progress === '25% Complete' ? '25%' : '75%' }]} />
              </View>
              <View style={styles.dueRow}>
                <Ionicons name="time-outline" size={12} color="#DD5B52" />
                <Text style={styles.dueText}>{details.dueLabel}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>MILESTONES</Text>
            <View style={styles.listCard}>
              {details.milestones.map((item, index) => {
                const badge = badgeStyle(item.status);
                return (
                  <View key={item.name} style={[styles.milestoneItem, index !== details.milestones.length - 1 && styles.itemDivider]}>
                    <View style={styles.leftAccent} />
                    <View style={styles.milestoneBody}>
                      <Text style={styles.milestoneTitle}>{item.name}</Text>
                      <Text style={styles.milestoneSub}>{item.due}</Text>
                    </View>
                    <View style={[styles.statePill, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.statePillText, { color: badge.text }]}>{item.status}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>FILES DELIVERED</Text>
              <TouchableOpacity onPress={() => router.push(`/(screens)/deliveryReview?job=${job ?? 'fintech'}`)}>
                <Text style={styles.downloadAll}>View Delivery</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.listCard}>
              {details.files.map((file, index) => (
                <View key={file.name} style={[styles.fileItem, index !== details.files.length - 1 && styles.itemDivider]}>
                  <View style={styles.fileLeft}>
                    <View style={styles.fileIconBox}>
                      <Ionicons name="document-text-outline" size={15} color={C.purple} />
                    </View>
                    <View>
                      <Text style={styles.fileName}>{file.name}</Text>
                      <Text style={styles.fileSize}>{file.size}</Text>
                    </View>
                  </View>
                  <Ionicons name="download-outline" size={17} color={C.purple} />
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: 12 + insets.bottom }]}>
            <TouchableOpacity style={styles.revisionBtn} onPress={() => router.push(`/(screens)/requestRevision?job=${job ?? 'fintech'}`)}>
              <Text style={styles.revisionBtnText}>Request Revision</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F7FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 10,
  },
  headerIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1D2434' },
  content: { paddingHorizontal: 10, paddingBottom: 96 },

  heroCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 8, marginBottom: 10 },
  heroImage: { height: 160, justifyContent: 'space-between' },
  heroImageInner: { borderRadius: 10 },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  pillInProgress: { backgroundColor: 'rgba(81,18,181,0.15)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  pillInProgressText: { color: '#7F4EF6', fontSize: 10, fontWeight: '600' },
  orderCode: { color: '#D7D8E5', fontSize: 10, fontWeight: '600' },
  title: { marginTop: 10, fontSize: 30, fontWeight: '800', color: '#22263A', lineHeight: 34, paddingHorizontal: 4 },

  metaRow: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, paddingBottom: 4 },
  expertWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  metaName: { fontSize: 11, fontWeight: '700', color: '#1E2235' },
  metaSub: { fontSize: 10, color: '#6B7280', marginTop: 1 },
  companyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F2F3F7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  companyText: { fontSize: 10, color: '#5A607C', fontWeight: '600' },

  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, marginBottom: 10 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#4A526C', letterSpacing: 0.2 },
  progressLabel: { fontSize: 11, color: C.purple, fontWeight: '700' },
  progressTrack: { marginTop: 8, height: 8, borderRadius: 99, backgroundColor: '#EBEDF2', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: C.purple },
  dueRow: { marginTop: 9, flexDirection: 'row', alignItems: 'center', gap: 5 },
  dueText: { fontSize: 10, color: '#DD5B52', fontWeight: '600' },

  sectionTitle: { fontSize: 12, color: '#5C6179', fontWeight: '700', marginTop: 4, marginBottom: 8, letterSpacing: 0.5 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  downloadAll: { fontSize: 11, color: C.purple, fontWeight: '700' },

  listCard: { backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden' },
  milestoneItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 11 },
  leftAccent: { width: 3, height: 38, borderRadius: 2, backgroundColor: '#2BB673', marginRight: 8 },
  milestoneBody: { flex: 1 },
  milestoneTitle: { fontSize: 11, color: '#202637', fontWeight: '700' },
  milestoneSub: { marginTop: 2, fontSize: 10, color: '#8B90A6' },
  statePill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999 },
  statePillText: { fontSize: 10, fontWeight: '700' },

  fileItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 12 },
  fileLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fileIconBox: { width: 24, height: 24, borderRadius: 8, backgroundColor: '#F3EEFF', alignItems: 'center', justifyContent: 'center' },
  fileName: { fontSize: 11, color: '#1F2536', fontWeight: '700' },
  fileSize: { fontSize: 10, color: '#8D91A6', marginTop: 2 },

  itemDivider: { borderBottomWidth: 1, borderBottomColor: '#F0F1F6' },

  revisionBtn: {
    borderWidth: 1.5,
    borderColor: '#9B75FF',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FAF8FF',
  },
  revisionBtnText: { color: C.purple, fontWeight: '700', fontSize: 12 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});