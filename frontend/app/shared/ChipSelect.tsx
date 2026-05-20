import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { X } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ChipSelectProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
  error?: string;
}

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        {
          backgroundColor: selected
            ? theme.colors.primary
            : theme.colors.surfaceSecondary,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          {
            color: selected
              ? theme.colors.textOnPrimary
              : theme.colors.textSecondary,
            fontFamily: selected ? theme.fonts.semiBold : theme.fonts.medium,
          },
        ]}
      >
        {label}
      </Text>
      {selected && (
        <X
          size={14}
          color={theme.colors.textOnPrimary}
          strokeWidth={2.5}
          style={{ marginLeft: 4 }}
        />
      )}
    </TouchableOpacity>
  );
};

const ChipSelect: React.FC<ChipSelectProps> = ({
  label,
  options,
  selectedOptions,
  onToggle,
  error,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.medium,
          },
        ]}
      >
        {label}
      </Text>
      <View style={styles.chipsRow}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selectedOptions.includes(option)}
            onPress={() => onToggle(option)}
          />
        ))}
      </View>
      {error && (
        <Text
          style={[
            styles.error,
            { color: theme.colors.error, fontFamily: theme.fonts.regular },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
  },
  error: {
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
});

export default ChipSelect;
