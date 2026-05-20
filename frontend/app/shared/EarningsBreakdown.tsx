import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface BreakdownItem {
  label: string;
  value: string;
  isDeduction?: boolean;
  isBold?: boolean;
}

interface EarningsBreakdownProps {
  title?: string;
  items: BreakdownItem[];
}

const EarningsBreakdown: React.FC<EarningsBreakdownProps> = ({
  title = "Earnings Breakdown",
  items,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.cardBorder,
        },
      ]}
    >
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

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={index}>
            {isLast && (
              <View
                style={[
                  styles.divider,
                  { backgroundColor: theme.colors.border },
                ]}
              />
            )}
            <View style={styles.row}>
              <Text
                style={[
                  styles.label,
                  {
                    color: item.isBold
                      ? theme.colors.textPrimary
                      : theme.colors.textSecondary,
                    fontFamily: item.isBold
                      ? theme.fonts.semiBold
                      : theme.fonts.regular,
                  },
                ]}
              >
                {item.label}
              </Text>
              <Text
                style={[
                  styles.value,
                  {
                    color: item.isDeduction
                      ? theme.colors.error
                      : item.isBold
                      ? theme.colors.success
                      : theme.colors.textPrimary,
                    fontFamily: item.isBold
                      ? theme.fonts.bold
                      : theme.fonts.semiBold,
                    fontSize: item.isBold ? 18 : 14,
                  },
                ]}
              >
                {item.isDeduction ? `- ${item.value}` : item.value}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 6,
  },
});

export default EarningsBreakdown;
