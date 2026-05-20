import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface SegmentedControlProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
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
      <View
        style={[
          styles.segmentRow,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            borderColor: theme.colors.border,
          },
        ]}
      >
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => onSelect(option)}
              activeOpacity={0.8}
              style={[
                styles.segment,
                isSelected && {
                  backgroundColor: theme.colors.primary,
                  ...theme.shadows.sm,
                },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: isSelected
                      ? theme.colors.textOnPrimary
                      : theme.colors.textSecondary,
                    fontFamily: isSelected
                      ? theme.fonts.semiBold
                      : theme.fonts.medium,
                  },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  segmentRow: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: {
    fontSize: 13,
  },
});

export default SegmentedControl;
