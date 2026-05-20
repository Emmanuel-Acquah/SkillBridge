import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.stepText,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.medium,
          },
        ]}
      >
        Step {currentStep} of {totalSteps}
      </Text>

      <View style={styles.barRow}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index < currentStep;
          return (
            <View
              key={index}
              style={[
                styles.bar,
                {
                  backgroundColor: isActive
                    ? theme.colors.primary
                    : theme.colors.border,
                  flex: 1,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  stepText: {
    fontSize: 13,
    textAlign: "right",
    marginBottom: 8,
  },
  barRow: {
    flexDirection: "row",
    gap: 6,
  },
  bar: {
    height: 4,
    borderRadius: 2,
  },
});

export default StepIndicator;
