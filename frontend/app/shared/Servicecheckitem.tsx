import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ServiceCheckItemProps {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

const ServiceCheckItem: React.FC<ServiceCheckItemProps> = ({
  title,
  description,
  checked,
  onToggle,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: checked
            ? theme.colors.primarySurface
            : theme.colors.surface,
          borderColor: checked ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <View style={styles.content}>
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
      </View>

      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? theme.colors.primary : "transparent",
            borderColor: checked ? theme.colors.primary : theme.colors.border,
          },
        ]}
      >
        {checked && (
          <Check size={14} color={theme.colors.textOnPrimary} strokeWidth={3} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ServiceCheckItem;
