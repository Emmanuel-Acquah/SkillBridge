import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Clock, BadgeCheck } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface RequestCardProps {
  title: string;
  clientName: string;
  clientAvatar?: string;
  isVerified?: boolean;
  service: string;
  budget: string;
  deadline: string;
  timeAgo?: string;
  isNew?: boolean;
  description?: string;
  onViewDetails?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  showActions?: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({
  title,
  clientName,
  clientAvatar,
  isVerified = false,
  service,
  budget,
  deadline,
  timeAgo,
  isNew = false,
  description,
  onViewDetails,
  onAccept,
  onDecline,
  showActions = false,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: isNew ? theme.colors.primary : theme.colors.cardBorder,
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
      {/* Header */}
      <View style={styles.headerRow}>
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

      {/* Client Info */}
      <View style={styles.clientRow}>
        {clientAvatar ? (
          <Image source={{ uri: clientAvatar }} style={styles.avatar} />
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
                { color: theme.colors.primary, fontFamily: theme.fonts.semiBold },
              ]}
            >
              {clientName.charAt(0)}
            </Text>
          </View>
        )}
        <Text
          style={[
            styles.clientName,
            {
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.medium,
            },
          ]}
        >
          {clientName}
        </Text>
        {isVerified && (
          <BadgeCheck size={14} color={theme.colors.primary} strokeWidth={2} />
        )}
      </View>

      {/* Meta Row */}
      <View style={styles.metaRow}>
        <MetaItem
          label="SERVICE"
          value={service}
          theme={theme}
        />
        <MetaItem
          label="BUDGET"
          value={budget}
          theme={theme}
        />
        <MetaItem
          label="DEADLINE"
          value={deadline}
          theme={theme}
        />
      </View>

      {/* Description */}
      {description && (
        <Text
          style={[
            styles.description,
            {
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.regular,
            },
          ]}
          numberOfLines={2}
        >
          {description}
        </Text>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        {timeAgo && (
          <View style={styles.timeRow}>
            <Clock size={12} color={theme.colors.textLight} strokeWidth={2} />
            <Text
              style={[
                styles.timeText,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              {timeAgo}
            </Text>
          </View>
        )}

        {showActions ? (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              onPress={onDecline}
              activeOpacity={0.7}
              style={[
                styles.declineButton,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.declineText,
                  {
                    color: theme.colors.textSecondary,
                    fontFamily: theme.fonts.semiBold,
                  },
                ]}
              >
                Decline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAccept}
              activeOpacity={0.7}
              style={[
                styles.acceptButton,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text
                style={[
                  styles.acceptText,
                  {
                    color: theme.colors.textOnPrimary,
                    fontFamily: theme.fonts.semiBold,
                  },
                ]}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={onViewDetails}
            activeOpacity={0.7}
            style={[
              styles.viewButton,
              {
                borderColor: theme.colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.viewText,
                {
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              View Full Details
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const MetaItem = ({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: any;
}) => (
  <View style={metaStyles.item}>
    <Text
      style={[
        metaStyles.label,
        { color: theme.colors.textLight, fontFamily: theme.fonts.medium },
      ]}
    >
      {label}
    </Text>
    <Text
      style={[
        metaStyles.value,
        { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold },
      ]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

const metaStyles = StyleSheet.create({
  item: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    fontSize: 13,
  },
});

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
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
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
  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  avatarFallback: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 11,
  },
  clientName: {
    fontSize: 13,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  declineButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  declineText: {
    fontSize: 13,
  },
  acceptButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
  acceptText: {
    fontSize: 13,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  viewText: {
    fontSize: 13,
  },
});

export default RequestCard;
