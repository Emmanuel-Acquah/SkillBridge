import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type TransactionStatus = "Released" | "Held in Escrow" | "Pending" | "Withdrawn";

interface TransactionItemProps {
  name: string;
  avatar?: string;
  description: string;
  amount: string;
  status: TransactionStatus;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  name,
  avatar,
  description,
  amount,
  status,
}) => {
  const { theme } = useTheme();

  const getStatusConfig = () => {
    switch (status) {
      case "Released":
        return { color: theme.colors.success, bg: theme.colors.successLight };
      case "Held in Escrow":
        return { color: theme.colors.warning, bg: theme.colors.warningLight };
      case "Pending":
        return { color: theme.colors.info, bg: theme.colors.infoLight };
      case "Withdrawn":
        return { color: theme.colors.textSecondary, bg: theme.colors.surfaceSecondary };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={styles.container}>
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatarFallback, { backgroundColor: theme.colors.primaryFaded }]}>
          <Text style={[styles.avatarText, { color: theme.colors.primary, fontFamily: theme.fonts.bold }]}>
            {name.charAt(0)}
          </Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.description, { color: theme.colors.textLight, fontFamily: theme.fonts.regular }]} numberOfLines={1}>
          {description}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
          {amount}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
          <Text style={[styles.statusText, { color: config.color, fontFamily: theme.fonts.medium }]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
  },
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
  },
});

export default TransactionItem;
