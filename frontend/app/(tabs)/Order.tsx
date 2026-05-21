import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const PURPLE = '#5112B5';
const TEXT_DARK = '#1A1A2E';
const TEXT_GREY = '#7B7B9A';
const BG_COLOR = '#FDF8FF';

export default function OrderScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SkillBridge</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(screens)/Notification')}>
            <Ionicons name="notifications-outline" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/Messages')}>
            <Ionicons name="chatbubble-ellipses-outline" size={23} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.userAvatar}>
            <Image source={{uri: 'https://i.pravatar.cc/100?img=11'}} style={styles.avatarImg} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title & Subtitle */}
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Active Orders</Text>
          <Text style={styles.pageSubtitle}>
            Manage your ongoing collaborations, track project milestones, and review completed deliverables all in one secure place.
          </Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.tabActive]} activeOpacity={0.8}>
            <Text style={styles.tabTextActive}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} activeOpacity={0.6}>
            <Text style={styles.tabText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} activeOpacity={0.6}>
            <Text style={styles.tabText}>Cancelled</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentList}>
          {/* Main Card with Image */}
          <TouchableOpacity style={styles.orderCard} activeOpacity={0.9}>
            <ImageBackground source={require('../../assets/images/blockchain.jpg')} style={styles.cardImage} imageStyle={{ borderRadius: 16 }} />
            
            <View style={styles.cardInfo}>
              <View style={styles.badgeRow}>
                <View style={styles.statusBadgeGreen}>
                  <Text style={styles.statusTextGreen}>In Progress</Text>
                </View>
                <Text style={styles.orderId}>Order #58-9402</Text>
              </View>

              <Text style={styles.cardTitle}>Premium Fintech Mobile App Design</Text>
              
              <View style={styles.authorRow}>
                <Image source={{uri: 'https://i.pravatar.cc/100?img=12'}} style={styles.smallAvatar} />
                <Text style={styles.authorName}>Alex Rivera</Text>
                <Ionicons name="checkmark-circle" size={14} color={PURPLE} style={{ marginLeft: 4 }} />
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressText}>Project Milestone: 75% Complete</Text>
                  <Text style={styles.dueDateText}>Due in 2 days</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '75%', backgroundColor: PURPLE }]} />
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push(`/(screens)/orderDetails?job=fintech`)}>
                  <Text style={styles.btnPrimaryText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push('/(tabs)/Messages')}>
                  <Text style={styles.btnSecondaryText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>TOTAL SPENT</Text>
            <Text style={styles.statsAmount}>$12,450.00</Text>
            
            <View style={styles.statsDataRow}>
              <Text style={styles.statsDataLabel}>Active Projects</Text>
              <Text style={styles.statsDataValue}>3</Text>
            </View>
            <View style={styles.statsDataRow}>
              <Text style={styles.statsDataLabel}>Pending Reviews</Text>
              <Text style={styles.statsDataValue}>1</Text>
            </View>

            <View style={styles.statsFooter}>
              <Text style={styles.statsFooterLabel}>Next payment release</Text>
              <Text style={styles.statsFooterDate}>Oct 24, 2025</Text>
            </View>
          </View>

          {/* Secondary Card 1 */}
          <TouchableOpacity style={styles.simpleCard} activeOpacity={0.8} onPress={() => router.push(`/(screens)/deliveryReview?job=fintech`)}>
            <View style={styles.badgeRow}>
              <View style={styles.statusBadgeOrange}>
                <Text style={styles.statusTextOrange}>Awaiting Review</Text>
              </View>
              <Text style={styles.orderId}>#58-6271</Text>
            </View>
            <Text style={styles.cardTitle}>Smart Contract Audit & Optimization</Text>
            <View style={styles.authorRow}>
              <Image source={{uri: 'https://i.pravatar.cc/100?img=13'}} style={styles.smallAvatar} />
              <Text style={styles.authorName}>David Chen</Text>
            </View>
            <View style={[styles.progressBarBg, { marginTop: 16 }]}>
              <View style={[styles.progressBarFill, { width: '100%', backgroundColor: '#10B981' }]} />
            </View>
            <View style={[styles.progressLabelRow, { marginTop: 8 }]}>
              <Text style={styles.progressText}>Files delivered for review</Text>
              <Text style={[styles.dueDateText, { color: PURPLE, fontWeight: '700' }]}>View Delivery</Text>
            </View>
          </TouchableOpacity>

          {/* Secondary Card 2 */}
          <TouchableOpacity style={styles.simpleCard} activeOpacity={0.8} onPress={() => router.push(`/(screens)/orderDetails?job=seo`)}>
            <View style={styles.badgeRow}>
              <View style={styles.statusBadgeGreen}>
                <Text style={styles.statusTextGreen}>In Progress</Text>
              </View>
              <Text style={styles.orderId}>#58-9110</Text>
            </View>
            <Text style={styles.cardTitle}>Enterprise SEO Strategy & Audit</Text>
            <View style={styles.authorRow}>
              <Image source={{uri: 'https://i.pravatar.cc/100?img=5'}} style={styles.smallAvatar} />
              <Text style={styles.authorName}>Sarah Jenkins</Text>
            </View>
            <View style={[styles.progressBarBg, { marginTop: 16 }]}>
              <View style={[styles.progressBarFill, { width: '25%', backgroundColor: PURPLE }]} />
            </View>
            <View style={[styles.progressLabelRow, { marginTop: 8 }]}>
              <Text style={styles.progressText}>Due in 14 days</Text>
              <Text style={[styles.dueDateText, { color: PURPLE, fontWeight: '700' }]}>View Details</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: BG_COLOR,
  },
  logo: {
    fontSize: 20,
    fontWeight: '800',
    color: PURPLE,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 2,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginLeft: 4,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    flex: 1,
  },
  headerContent: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 13,
    color: TEXT_GREY,
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabActive: {
    backgroundColor: PURPLE,
  },
  tabText: {
    fontSize: 13,
    color: TEXT_GREY,
    fontWeight: '600',
  },
  tabTextActive: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '700',
  },
  contentList: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardInfo: {
    paddingTop: 16,
    paddingHorizontal: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadgeGreen: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTextGreen: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  statusBadgeOrange: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTextOrange: {
    color: '#F97316',
    fontSize: 10,
    fontWeight: '700',
  },
  orderId: {
    fontSize: 11,
    color: TEXT_GREY,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 12,
    lineHeight: 24,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 13,
    color: TEXT_DARK,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 11,
    color: TEXT_GREY,
    fontWeight: '500',
  },
  dueDateText: {
    fontSize: 11,
    color: PURPLE,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: '700',
  },
  statsCard: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    padding: 24,
    shadowColor: PURPLE,
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  statsLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statsAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 24,
  },
  statsDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsDataLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
  },
  statsDataValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statsFooter: {
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statsFooterLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  statsFooterDate: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '700',
    marginTop: 4,
  },
  simpleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
