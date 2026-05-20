import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
  compact?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color,
  compact = false,
}) => {
  const { theme } = useTheme();
  const accentColor = color || theme.colors.primary;

  return (
    <View
      style={[
        styles.container,
        compact && styles.compactContainer,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.cardBorder,
          ...Platform.select({
            ios: {
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 4,
            },
            android: { elevation: 1 },
          }),
        },
      ]}
    >
      {icon && (
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: `${accentColor}15` },
          ]}
        >
          {icon}
        </View>
      )}
      <Text
        style={[
          styles.value,
          compact && styles.compactValue,
          {
            color: accentColor,
            fontFamily: theme.fonts.bold,
          },
        ]}
      >
        {value}
      </Text>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textLight,
            fontFamily: theme.fonts.regular,
          },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  compactContainer: {
    padding: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    marginBottom: 2,
  },
  compactValue: {
    fontSize: 18,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
  },
});

export default StatCard;
