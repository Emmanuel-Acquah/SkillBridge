import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PURPLE = '#6B5CE7';
const TEXT_DARK = '#1A1A2E';
const TEXT_GREY = '#9B9BB0';
const BG = '#FFFFFF';

const conversations = [
  {
    id: '1',
    name: 'Sarah Jenkin',
    project: 'Fintech Dashboard/Redesign',
    preview: "I've uploaded the new wireframes for you...",
    time: '12:13 PM',
    unread: 1,
    avatarUri: 'https://i.pravatar.cc/100?img=5',
    online: true,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    project: 'In TheMarkyon batch tiny Engine',
    preview: "The latency issues have been seen, I'll ...",
    time: 'Yesterday',
    unread: 0,
    avatarUri: 'https://i.pravatar.cc/100?img=13',
    online: false,
  },
  {
    id: '3',
    name: 'Elena Rodrigues',
    project: 'Smart Management App Kynth',
    preview: "That makes sense. I'll st//t the...",
    time: 'Oct 24',
    unread: 0,
    avatarUri: 'https://i.pravatar.cc/100?img=9',
    online: true,
  },
  {
    id: '4',
    name: 'David Kim',
    project: 'Legacy + Ledger / Parkhunion',
    preview: 'The API document url has been...',
    time: 'Oct 22',
    unread: 0,
    avatarUri: 'https://i.pravatar.cc/100?img=15',
    online: false,
  },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={styles.logo}>SkillBridge</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/(screens)/Notification')}>
            <Ionicons name="notifications-outline" size={22} color={TEXT_DARK} />
          </TouchableOpacity>
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=11' }} style={styles.avatar} />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Messages</Text>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={TEXT_GREY} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={TEXT_GREY}
          />
        </View>

        {/* Conversations */}
        <View style={styles.list}>
          {conversations.map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.row} activeOpacity={0.7}>
              {/* Avatar with online indicator */}
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: item.avatarUri }} style={styles.userAvatar} />
                {item.online && <View style={styles.onlineDot} />}
              </View>

              {/* Content */}
              <View style={styles.rowContent}>
                <View style={styles.rowTop}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.project} numberOfLines={1}>{item.project}</Text>
                <Text style={styles.preview} numberOfLines={1}>{item.preview}</Text>
              </View>

              {/* Unread badge */}
              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* End of messages */}
        <View style={styles.endRow}>
          <View style={styles.endLine} />
          <Text style={styles.endText}>END OF MESSAGES</Text>
          <View style={styles.endLine} />
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
    gap: 10,
  },
  backBtn: { padding: 4 },
  logo: {
    fontSize: 18,
    fontWeight: '800',
    color: PURPLE,
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  scroll: { flex: 1 },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: TEXT_DARK,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
  },
  list: {
    paddingHorizontal: 16,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  rowContent: {
    flex: 1,
    gap: 3,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  time: {
    fontSize: 11,
    color: TEXT_GREY,
  },
  project: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '600',
  },
  preview: {
    fontSize: 13,
    color: TEXT_GREY,
  },
  unreadBadge: {
    backgroundColor: PURPLE,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  endRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 10,
  },
  endLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  endText: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_GREY,
    letterSpacing: 1,
  },
});