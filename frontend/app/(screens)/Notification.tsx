import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PURPLE = '#6B5CE7';
const TEXT_DARK = '#1A1A2E';
const TEXT_GREY = '#9B9BB0';
const BG = '#FAFAFF';

export default function NotificationScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Image source={{ uri: 'https://i.pravatar.cc/100?img=11' }} style={styles.avatar} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Stay updated on your freelance journey</Text>

        {/* TODAY SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today</Text>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>3 New</Text>
          </View>
          <TouchableOpacity style={{ marginLeft: 'auto' }}>
            <Text style={styles.markRead}>✓ Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {/* Notification 1 – Project Started */}
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: '#EDE9FF' }]}>
            <MaterialCommunityIcons name="rocket-launch-outline" size={20} color={PURPLE} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Project Started</Text>
              <Text style={styles.cardTime}>2m ago</Text>
            </View>
            <Text style={styles.cardBody}>
              Alex Chen has started working on "Fintech Dashboard UI Redesign". Estimated delivery: Oct 24.
            </Text>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.btnPurple}>
                <Text style={styles.btnPurpleText}>View Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/(tabs)/Messages')}>
                <Text style={styles.btnOutlineText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.unreadDot} />
        </View>

        {/* Notification 2 – Payment Released */}
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Payment Released</Text>
              <Text style={styles.cardTime}>5h ago</Text>
            </View>
            <Text style={styles.cardBody}>
              Your payment of $1,200.00 for "API Integration" has been successfully processed.
            </Text>
          </View>
          <View style={styles.unreadDot} />
        </View>

        {/* Notification 3 – New Message */}
        <View style={styles.card}>
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.userAvatar} />
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>New Message</Text>
              <Text style={styles.cardTime}>8h ago</Text>
            </View>
            <Text style={styles.cardBodySender}>Sarah Jenkins</Text>
            <Text style={styles.cardBody} numberOfLines={3}>
              Hey, I just sent the wireframes I've worked on so far. You can review them too. Can we discuss the next steps tomorrow morning?
            </Text>
          </View>
          <View style={styles.unreadDot} />
        </View>

        {/* EARLIER SECTION */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Earlier</Text>
        </View>

        {/* Notification 4 – Platform Update */}
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: '#F0F4FF' }]}>
            <Ionicons name="refresh-outline" size={20} color="#3B82F6" />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Platform Update v2.4</Text>
              <Text style={styles.cardTime}>Oct</Text>
            </View>
            <Text style={styles.cardBody}>
              We've enhanced our dispute resolution flow and added new analytics for freelancers. Check what's new in the latest update.
            </Text>
          </View>
        </View>

        {/* Notification 5 – Security Alert */}
        <View style={[styles.card, { marginBottom: 40 }]}>
          <View style={[styles.iconCircle, { backgroundColor: '#FFF1F2' }]}>
            <Ionicons name="shield-outline" size={20} color="#EF4444" />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Security Alert</Text>
              <Text style={styles.cardTime}>Oct 20</Text>
            </View>
            <Text style={styles.cardBody}>
              A new login was detected from a Chrome Browser on a MacOS device in San Francisco, CA. If this wasn't you, please change your password.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: BG,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_DARK,
    flex: 1,
  },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  scroll: { flex: 1 },
  subtitle: {
    fontSize: 14,
    color: TEXT_GREY,
    paddingHorizontal: 16,
    marginBottom: 20,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: TEXT_DARK,
  },
  newBadge: {
    backgroundColor: PURPLE,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  markRead: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    position: 'relative',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    flexShrink: 0,
  },
  cardContent: { flex: 1 },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  cardTime: {
    fontSize: 11,
    color: TEXT_GREY,
    fontWeight: '500',
  },
  cardBodySender: {
    fontSize: 12,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 2,
  },
  cardBody: {
    fontSize: 13,
    color: TEXT_GREY,
    lineHeight: 19,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  btnPurple: {
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  btnPurpleText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  btnOutlineText: { color: PURPLE, fontSize: 12, fontWeight: '700' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PURPLE,
    position: 'absolute',
    top: 14,
    right: 14,
  },
});
