import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Lightbulb, Info, AlertTriangle } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

type InfoCardVariant = "tip" | "info" | "warning";

interface InfoCardProps {
  title: string;
  description: string;
  variant?: InfoCardVariant;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  variant = "tip",
}) => {
  const { theme } = useTheme();

  const getConfig = () => {
    switch (variant) {
      case "tip":
        return {
          icon: Lightbulb,
          backgroundColor: theme.colors.primaryFaded,
          borderColor: theme.colors.primary,
          iconColor: theme.colors.primary,
          titleColor: theme.colors.primary,
        };
      case "info":
        return {
          icon: Info,
          backgroundColor: theme.colors.infoLight,
          borderColor: theme.colors.info,
          iconColor: theme.colors.info,
          titleColor: theme.colors.info,
        };
      case "warning":
        return {
          icon: AlertTriangle,
          backgroundColor: theme.colors.warningLight,
          borderColor: theme.colors.warning,
          iconColor: theme.colors.warning,
          titleColor: theme.colors.warning,
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
      ]}
    >
      <View style={styles.header}>
        <Icon size={18} color={config.iconColor} strokeWidth={2} />
        <Text
          style={[
            styles.title,
            {
              color: config.titleColor,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <Text
        style={[
          styles.description,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.regular,
          },
        ]}
      >
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
  },
});

export default InfoCard;
