import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface Metric {
  label: string;
  value: string;
  color?: string;
}

interface PerformanceMetricsProps {
  title?: string;
  metrics: Metric[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  title = "Performance Metrics",
  metrics,
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
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.medium,
          },
        ]}
      >
        {title}
      </Text>

      <View style={styles.grid}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricItem}>
            <Text
              style={[
                styles.metricValue,
                {
                  color: metric.color || theme.colors.primary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              {metric.value}
            </Text>
            <Text
              style={[
                styles.metricLabel,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              {metric.label}
            </Text>
          </View>
        ))}
      </View>
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
    fontSize: 13,
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  metricItem: {
    width: "50%",
    paddingVertical: 8,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 22,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
  },
});

export default PerformanceMetrics;
