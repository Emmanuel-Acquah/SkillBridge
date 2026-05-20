import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface CounterInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  suffix?: string;
}

const CounterInput: React.FC<CounterInputProps> = ({
  label,
  value,
  min = 0,
  max = 99,
  onIncrement,
  onDecrement,
  suffix,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
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

      <View style={styles.counterRow}>
        <TouchableOpacity
          onPress={onDecrement}
          disabled={value <= min}
          activeOpacity={0.7}
          style={[
            styles.counterButton,
            {
              backgroundColor: theme.colors.surfaceSecondary,
              borderColor: theme.colors.border,
              opacity: value <= min ? 0.4 : 1,
            },
          ]}
        >
          <Minus
            size={16}
            color={theme.colors.textSecondary}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.valueContainer,
            {
              backgroundColor: theme.colors.primaryFaded,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.value,
              {
                color: theme.colors.primary,
                fontFamily: theme.fonts.bold,
              },
            ]}
          >
            {value}
            {suffix ? ` ${suffix}` : ""}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onIncrement}
          disabled={value >= max}
          activeOpacity={0.7}
          style={[
            styles.counterButton,
            {
              backgroundColor: theme.colors.surfaceSecondary,
              borderColor: theme.colors.border,
              opacity: value >= max ? 0.4 : 1,
            },
          ]}
        >
          <Plus
            size={16}
            color={theme.colors.textSecondary}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
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
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  valueContainer: {
    minWidth: 56,
    height: 40,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  value: {
    fontSize: 16,
  },
});

export default CounterInput;
