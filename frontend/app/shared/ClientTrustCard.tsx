import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { Star, Minus } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface SmartFlag {
  label: string;
  type: "warning" | "success" | "info";
}

interface ClientTrustCardProps {
  rating: number;
  jobsCompleted: number;
  paymentReliability: string;
  flags?: SmartFlag[];
}

const ClientTrustCard: React.FC<ClientTrustCardProps> = ({
  rating,
  jobsCompleted,
  paymentReliability,
  flags = [],
}) => {
  const { theme } = useTheme();


  return (
    <View
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
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.semiBold,
          },
        ]}
      >
        Client Trust
      </Text>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statLabel,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.medium,
              },
            ]}
          >
            Rating
          </Text>
          <View style={styles.ratingRow}>
            <Star
              size={14}
              color={theme.colors.starRating}
              fill={theme.colors.starRating}
            />
            <Text
              style={[
                styles.statValue,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              {rating.toFixed(1)}/5
            </Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <Text
            style={[
              styles.statLabel,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.medium,
              },
            ]}
          >
            Jobs Completed
          </Text>
          <Text
            style={[
              styles.statValue,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.bold,
              },
            ]}
          >
            {jobsCompleted} Jobs
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text
            style={[
              styles.statLabel,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.medium,
              },
            ]}
          >
            Payment Reliability
          </Text>
          <Text
            style={[
              styles.statValue,
              {
                color: theme.colors.success,
                fontFamily: theme.fonts.bold,
              },
            ]}
          >
            {paymentReliability}
          </Text>
        </View>
      </View>

      {/* Smart Analysis */}
      {flags.length > 0 && (
        <View style={styles.flagsSection}>
          <Text
            style={[
              styles.flagsTitle,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            Smart Analysis
          </Text>
          {flags.map((flag, index) => (
            <View
              key={index}
              style={[styles.flagItem, { backgroundColor: theme.colors.primaryLight }]}
            >
              <Minus size={14} color="#fff" strokeWidth={2} />
              <Text
                style={[styles.flagText, { color: '#fff', fontFamily: theme.fonts.medium }]}
              >
                {flag.label}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    marginBottom: 14,
  },
  statsRow: {
    gap: 12,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
  },
  statValue: {
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagsSection: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 14,
  },
  flagsTitle: {
    fontSize: 13,
    marginBottom: 10,
  },
  flagItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    
    marginBottom: 6,
  },
  flagText: {
    fontSize: 12,
    flex: 1,
  },
});

export default ClientTrustCard;
