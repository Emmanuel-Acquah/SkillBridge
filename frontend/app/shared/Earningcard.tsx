import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface EarningsCardProps {
  totalEarnings: string;
  availableBalance: string;
  pendingEscrow: string;
  onWithdraw?: () => void;
}

const EarningsCard: React.FC<EarningsCardProps> = ({
  totalEarnings,
  availableBalance,
  pendingEscrow,
  onWithdraw,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.walletBackground,
          ...Platform.select({
            ios: {
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 14,
            },
            android: { elevation: 8 },
          }),
        },
      ]}
    >
      {/* Total Earnings */}
      <Text style={[styles.label, { fontFamily: theme.fonts.medium }]}>
        Total Earnings
      </Text>
      <Text style={[styles.totalAmount, { fontFamily: theme.fonts.bold }]}>
        {totalEarnings}
      </Text>

      {/* Sub balances */}
      <View style={styles.subRow}>
        <View style={styles.subItem}>
          <View style={[styles.subDot, { backgroundColor: "#34D399" }]} />
          <View>
            <Text
              style={[styles.subLabel, { fontFamily: theme.fonts.regular }]}
            >
              Available Balance
            </Text>
            <Text
              style={[styles.subAmount, { fontFamily: theme.fonts.semiBold }]}
            >
              {availableBalance}
            </Text>
          </View>
        </View>

        <View style={styles.subItem}>
          <View style={[styles.subDot, { backgroundColor: "#FBBF24" }]} />
          <View>
            <Text
              style={[styles.subLabel, { fontFamily: theme.fonts.regular }]}
            >
              Pending Escrow
            </Text>
            <Text
              style={[styles.subAmount, { fontFamily: theme.fonts.semiBold }]}
            >
              {pendingEscrow}
            </Text>
          </View>
        </View>
      </View>

      {/* Withdraw Button */}
      <TouchableOpacity
        onPress={onWithdraw}
        activeOpacity={0.8}
        style={styles.withdrawButton}
      >
        <Text
          style={[styles.withdrawText, { fontFamily: theme.fonts.semiBold }]}
        >
          Withdraw
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    marginBottom: 4,
  },
  totalAmount: {
    color: "#FFFFFF",
    fontSize: 32,
    marginBottom: 16,
  },
  subRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  subDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  subLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
  },
  subAmount: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  withdrawButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  withdrawText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default EarningsCard;
