import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface PricingTabSelectorProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PricingTabSelector: React.FC<PricingTabSelectorProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.8}
            style={[
              styles.tab,
              isActive && [
                styles.activeTab,
                {
                  backgroundColor: theme.colors.primary,
                  ...Platform.select({
                    ios: {
                      shadowColor: theme.colors.primary,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                    },
                    android: {
                      elevation: 4,
                    },
                  }),
                },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: isActive
                    ? theme.colors.textOnPrimary
                    : theme.colors.textSecondary,
                  fontFamily: isActive
                    ? theme.fonts.semiBold
                    : theme.fonts.medium,
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {},
  tabText: {
    fontSize: 14,
  },
});

export default PricingTabSelector;
