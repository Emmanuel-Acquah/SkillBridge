import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { Star } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ReputationCardProps {
  score: number;
  totalReviews: number;
  reviewQuote?: string;
  reviewAuthor?: string;
}

const ReputationCard: React.FC<ReputationCardProps> = ({
  score,
  totalReviews,
  reviewQuote,
  reviewAuthor,
}) => {
  const { theme } = useTheme();

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={theme.colors.starRating}
          fill={i <= Math.floor(score) ? theme.colors.starRating : "transparent"}
          strokeWidth={2}
        />
      );
    }
    return stars;
  };

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
          styles.sectionLabel,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.medium,
          },
        ]}
      >
        Reputation Score
      </Text>

      {/* Score Row */}
      <View style={styles.scoreRow}>
        <Text
          style={[
            styles.scoreText,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.bold,
            },
          ]}
        >
          {score.toFixed(1)}
        </Text>
        <View style={styles.starsRow}>{renderStars()}</View>
        <Text
          style={[
            styles.reviewCount,
            {
              color: theme.colors.textLight,
              fontFamily: theme.fonts.regular,
            },
          ]}
        >
          ({totalReviews})
        </Text>
      </View>

      {/* Review Quote */}
      {reviewQuote && (
        <View
          style={[
            styles.quoteContainer,
            {
              backgroundColor: theme.colors.surfaceSecondary,
              borderLeftColor: theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.quoteText,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            "{reviewQuote}"
          </Text>
          {reviewAuthor && (
            <Text
              style={[
                styles.quoteAuthor,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.medium,
                },
              ]}
            >
              — {reviewAuthor}
            </Text>
          )}
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
  sectionLabel: {
    fontSize: 13,
    marginBottom: 10,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 28,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
  },
  reviewCount: {
    fontSize: 13,
  },
  quoteContainer: {
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
  },
  quoteText: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: "italic",
  },
  quoteAuthor: {
    fontSize: 12,
    marginTop: 6,
  },
});

export default ReputationCard;
