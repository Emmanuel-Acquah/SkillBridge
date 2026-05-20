import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  timestamp: string;
  iconBgColor?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  subtitle,
  timestamp,
  iconBgColor,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: iconBgColor || theme.colors.primaryFaded,
          },
        ]}
      >
        {icon}
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.medium,
            },
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <Text
        style={[
          styles.timestamp,
          {
            color: theme.colors.textLight,
            fontFamily: theme.fonts.regular,
          },
        ]}
      >
        {timestamp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  timestamp: {
    fontSize: 11,
  },
});

export default ActivityItem;
