import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          onPress={action.onPress}
          activeOpacity={0.7}
          style={styles.actionItem}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.colors.primaryFaded },
            ]}
          >
            {action.icon}
          </View>
          <Text
            style={[
              styles.label,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.medium,
              },
            ]}
            numberOfLines={1}
          >
            {action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
  },
});

export default QuickActions;
