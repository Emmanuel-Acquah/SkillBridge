import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ActiveJobCardProps {
  title: string;
  client: string;
  progress: number; // 0-100
  dueText?: string;
  status?: "In Progress" | "Review" | "Due Soon" | "Completed";
  isNew?: boolean;
  onPress?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const ActiveJobCard: React.FC<ActiveJobCardProps> = ({
  title,
  client,
  progress,
  dueText,
  status = "In Progress",
  isNew = false,
  onPress,
  actionLabel = "Open Job",
  onAction,
}) => {
  const { theme } = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case "In Progress":
        return theme.colors.primary;
      case "Review":
        return theme.colors.info;
      case "Due Soon":
        return theme.colors.warning;
      case "Completed":
        return theme.colors.success;
    }
  };

  const statusColor = getStatusColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.cardBorder,
          ...Platform.select({
            ios: {
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            },
            android: { elevation: 2 },
          }),
        },
      ]}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {isNew && (
            <View
              style={[styles.newBadge, { backgroundColor: theme.colors.error }]}
            >
              <Text style={styles.newBadgeText}>New</Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${statusColor}15`, borderColor: statusColor },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: statusColor, fontFamily: theme.fonts.medium },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* Client */}
      <Text
        style={[
          styles.client,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.regular,
          },
        ]}
      >
        Client: {client}
      </Text>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text
            style={[
              styles.progressLabel,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.medium,
              },
            ]}
          >
            Progress
          </Text>
          <Text
            style={[
              styles.progressPercent,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            {progress}%
          </Text>
        </View>
        <View
          style={[
            styles.progressTrack,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: statusColor,
                width: `${Math.min(progress, 100)}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {dueText && (
          <Text
            style={[
              styles.dueText,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            {dueText}
          </Text>
        )}
        <TouchableOpacity
          onPress={onAction}
          activeOpacity={0.7}
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text
            style={[
              styles.actionText,
              {
                color: theme.colors.textOnPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    flexShrink: 1,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
  },
  client: {
    fontSize: 13,
    marginBottom: 12,
  },
  progressSection: {
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressPercent: {
    fontSize: 12,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dueText: {
    fontSize: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionText: {
    fontSize: 13,
  },
});

export default ActiveJobCard;
