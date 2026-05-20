import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Check, Clock, Circle } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

type StepStatus = "completed" | "current" | "upcoming";

interface TimelineStep {
  title: string;
  subtitle?: string;
  status: StepStatus;
}

interface WorkflowTimelineProps {
  title?: string;
  steps: TimelineStep[];
}

const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({
  title = "Workflow Timeline",
  steps,
}) => {
  const { theme } = useTheme();

  const getStepConfig = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return {
          dotColor: theme.colors.success,
          lineColor: theme.colors.success,
          icon: <Check size={12} color="#FFFFFF" strokeWidth={3} />,
        };
      case "current":
        return {
          dotColor: theme.colors.primary,
          lineColor: theme.colors.border,
          icon: <Clock size={12} color="#FFFFFF" strokeWidth={2.5} />,
        };
      case "upcoming":
        return {
          dotColor: theme.colors.border,
          lineColor: theme.colors.border,
          icon: <Circle size={8} color={theme.colors.textLight} strokeWidth={2} />,
        };
    }
  };

  return (
    <View style={styles.container}>
      {title && (
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
      )}

      {steps.map((step, index) => {
        const config = getStepConfig(step.status);
        const isLast = index === steps.length - 1;

        return (
          <View key={index} style={styles.stepRow}>
            {/* Dot + Line */}
            <View style={styles.dotColumn}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: config.dotColor,
                  },
                  step.status === "upcoming" && {
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                {step.status !== "upcoming" && config.icon}
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    { backgroundColor: config.lineColor },
                  ]}
                />
              )}
            </View>

            {/* Content */}
            <View style={[styles.stepContent, !isLast && { paddingBottom: 20 }]}>
              <Text
                style={[
                  styles.stepTitle,
                  {
                    color:
                      step.status === "upcoming"
                        ? theme.colors.textLight
                        : theme.colors.textPrimary,
                    fontFamily:
                      step.status === "current"
                        ? theme.fonts.semiBold
                        : theme.fonts.medium,
                  },
                ]}
              >
                {step.title}
              </Text>
              {step.subtitle && (
                <Text
                  style={[
                    styles.stepSubtitle,
                    {
                      color: theme.colors.textLight,
                      fontFamily: theme.fonts.regular,
                    },
                  ]}
                >
                  {step.subtitle}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: "row",
  },
  dotColumn: {
    alignItems: "center",
    width: 32,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
    marginLeft: 12,
    paddingTop: 2,
  },
  stepTitle: {
    fontSize: 14,
  },
  stepSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default WorkflowTimeline;
