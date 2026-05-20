import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  count?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
  count,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          {title}
        </Text>
        {count !== undefined && (
          <View
            style={[
              styles.countBadge,
              { backgroundColor: theme.colors.primaryFaded },
            ]}
          >
            <Text
              style={[
                styles.countText,
                {
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              {count}
            </Text>
          </View>
        )}
      </View>

      {actionLabel && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text
            style={[
              styles.actionLabel,
              {
                color: theme.colors.primary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 8,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  countText: {
    fontSize: 12,
  },
  actionLabel: {
    fontSize: 13,
  },
});

export default SectionHeader;
