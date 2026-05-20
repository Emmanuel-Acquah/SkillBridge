import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import Navbar from "../components/NavBar";
import SearchBar from "../shared/SearchBar";
import ChatListItem from "../shared/ChatListItem";

const MOCK_CHATS = [
  {
    id: "1",
    name: "Alexander Chen",
    lastMessage: '"The latest draft looks...',
    timestamp: "2 mins ago",
    unreadCount: 3,
    isOnline: true,
    isVerified: true,
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    lastMessage: "Hi there! Just checking in on...",
    timestamp: "45 mins ago",
    unreadCount: 1,
    isOnline: false,
    isVerified: true,
  },
  {
    id: "3",
    name: "Marcus Thorne",
    lastMessage: "Thanks for the update on...",
    timestamp: "3 hours ago",
    unreadCount: 0,
    isOnline: false,
    isVerified: false,
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    lastMessage: '"The tone of voice you\'ve...',
    timestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    isVerified: true,
  },
  {
    id: "5",
    name: "David Park",
    lastMessage: "Hey, did you get a chance to...",
    timestamp: "5 hours ago",
    unreadCount: 2,
    isOnline: true,
    isVerified: false,
  },
  {
    id: "6",
    name: "Sophia Williams",
    lastMessage: "The social media assets are...",
    timestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    isVerified: false,
  },
  {
    id: "7",
    name: "James Wilson",
    lastMessage: "Can we schedule a meeting...",
    timestamp: "2 days ago",
    unreadCount: 0,
    isOnline: true,
    isVerified: true,
  },
  {
    id: "8",
    name: "Isabella Garcia",
    lastMessage: "Received the revised...",
    timestamp: "3 days ago",
    unreadCount: 0,
    isOnline: false,
    isVerified: false,
  },
  {
    id: "9",
    name: "Robert Taylor",
    lastMessage: "The UI components look...",
    timestamp: "4 days ago",
    unreadCount: 0,
    isOnline: false,
    isVerified: true,
  },
  {
    id: "10",
    name: "Mia Thompson",
    lastMessage: "Thanks again for the help...",
    timestamp: "Last week",
    unreadCount: 0,
    isOnline: false,
    isVerified: false,
  },
];

const Messages = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const activeCount = MOCK_CHATS.filter((c) => c.unreadCount > 0).length;

  const filteredChats = searchQuery.trim()
    ? MOCK_CHATS.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_CHATS;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Navbar notificationCount={2} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Row */}
        <View style={styles.titleRow}>
          <View>
            <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
              Messages
            </Text>
            <Text style={[styles.activeChats, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
              {activeCount} Active Chats
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.newMessageBtn, { backgroundColor: theme.colors.primary }]}
          >
            <Plus size={16} color={theme.colors.textOnPrimary} strokeWidth={2.5} />
            <Text style={[styles.newMessageText, { color: theme.colors.textOnPrimary, fontFamily: theme.fonts.semiBold }]}>
              New Message
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search conversations, clients or projects..."
          />
        </View>

        {/* Chat List */}
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            name={chat.name}
            lastMessage={chat.lastMessage}
            timestamp={chat.timestamp}
            unreadCount={chat.unreadCount}
            isOnline={chat.isOnline}
            isVerified={chat.isVerified}
            onPress={() =>
              navigation.navigate("(components)", {
                screen: "ChatRoom",
                params: { chatId: chat.id, name: chat.name },
              })
            }
          />
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            bottom: Platform.OS === "ios" ? insets.bottom + 80 : 80,
            ...Platform.select({
              ios: {
                shadowColor: theme.colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 12,
              },
              android: { elevation: 8 },
            }),
          },
        ]}
      >
        <Plus size={24} color={theme.colors.textOnPrimary} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
  },
  activeChats: {
    fontSize: 13,
    marginTop: 2,
  },
  newMessageBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  newMessageText: {
    fontSize: 13,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Messages;
