import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface CheckboxProps {
  label: string;
  description?: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked,
  onToggle,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onToggle(!checked)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View
        style={[
          styles.box,
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

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.medium,
            },
          ]}
        >
          {label}
        </Text>
        {description && (
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
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingVertical: 4,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 1,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 15,
  },
  description: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
});

export default Checkbox;
