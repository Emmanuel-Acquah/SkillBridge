import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ChatListItemProps {
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  isVerified?: boolean;
  onPress: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline = false,
  isVerified = false,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        unreadCount > 0 && {
          backgroundColor: theme.colors.primarySurface,
        },
      ]}
    >
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarFallback,
              { backgroundColor: theme.colors.primaryFaded },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                { color: theme.colors.primary, fontFamily: theme.fonts.bold },
              ]}
            >
              {name.charAt(0)}
            </Text>
          </View>
        )}
        {isOnline && (
          <View
            style={[
              styles.onlineDot,
              {
                backgroundColor: theme.colors.success,
                borderColor: theme.colors.background,
              },
            ]}
          />
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.nameRow}>
            <Text
              style={[
                styles.name,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: unreadCount > 0 ? theme.fonts.bold : theme.fonts.semiBold,
                },
              ]}
              numberOfLines={1}
            >
              {name}
            </Text>
            {isVerified && (
              <View style={[styles.verifiedDot, { backgroundColor: theme.colors.primary }]} />
            )}
          </View>
          <Text
            style={[
              styles.timestamp,
              {
                color: unreadCount > 0 ? theme.colors.primary : theme.colors.textLight,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            {timestamp}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text
            style={[
              styles.message,
              {
                color: unreadCount > 0 ? theme.colors.textPrimary : theme.colors.textSecondary,
                fontFamily: unreadCount > 0 ? theme.fonts.medium : theme.fonts.regular,
              },
            ]}
            numberOfLines={1}
          >
            {lastMessage}
          </Text>
          {unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.unreadText, { fontFamily: theme.fonts.bold }]}>
                {unreadCount > 9 ? "9+" : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 18,
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
  },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    flexShrink: 1,
  },
  verifiedDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 10,
  },
});

export default ChatListItem;
