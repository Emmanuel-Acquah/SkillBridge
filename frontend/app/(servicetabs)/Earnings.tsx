import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

import Navbar from "../components/NavBar";
import SectionHeader from "../shared/SectionHeader";
import TransactionItem from "../shared/TransactionItem";
import Button from "../shared/Button";

const Earnings = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const transactions = [
    {
      name: "Sarah Jenkins",
      description: "Brand Identity",
      amount: "+GH₵450",
      status: "Released" as const,
    },
    {
      name: "Marcus Thorne",
      description: "SaaS Landing Page Design",
      amount: "+GH₵800",
      status: "Held in Escrow" as const,
    },
    {
      name: "Linda Mensah",
      description: "Mobile App Audit",
      amount: "+GH₵350",
      status: "Released" as const,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Navbar notificationCount={1} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
          Earnings
        </Text>

        {/* Balance Card */}
        <View
          style={[
            styles.balanceCard,
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
          <Text style={[styles.balanceLabel, { fontFamily: theme.fonts.medium }]}>
            Available Balance
          </Text>
          <Text style={[styles.balanceAmount, { fontFamily: theme.fonts.bold }]}>
            GH₵1,250
          </Text>
          <Text style={[styles.balanceSub, { fontFamily: theme.fonts.regular }]}>
            PAYOUTS PROCESSED EVERY FRIDAY
          </Text>

          {/* Sub stats */}
          <View style={styles.balanceStatsRow}>
            <View style={styles.balanceStatItem}>
              <Text style={[styles.balanceStatLabel, { fontFamily: theme.fonts.regular }]}>
                Total Earnings
              </Text>
              <Text style={[styles.balanceStatValue, { fontFamily: theme.fonts.bold }]}>
                GH₵4,500
              </Text>
            </View>
            <View style={[styles.balanceStatDivider, { backgroundColor: "rgba(255,255,255,0.2)" }]} />
            <View style={styles.balanceStatItem}>
              <Text style={[styles.balanceStatLabel, { fontFamily: theme.fonts.regular }]}>
                Pending Escrow
              </Text>
              <Text style={[styles.balanceStatValue, { fontFamily: theme.fonts.bold }]}>
                GH₵800
              </Text>
            </View>
          </View>
        </View>

        {/* Total Withdrawn */}
        <View
          style={[
            styles.withdrawnCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          <Text style={[styles.withdrawnLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>
            Total Withdrawn
          </Text>
          <Text style={[styles.withdrawnAmount, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
            GH₵2,450
          </Text>
        </View>

        {/* Next Release */}
        <View
          style={[
            styles.releaseCard,
            {
              backgroundColor: theme.colors.primaryFaded,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          <View style={[styles.releaseIcon, { backgroundColor: theme.colors.primary }]}>
            <Calendar size={18} color={theme.colors.textOnPrimary} strokeWidth={2} />
          </View>
          <View style={styles.releaseContent}>
            <Text style={[styles.releaseTitle, { color: theme.colors.primary, fontFamily: theme.fonts.semiBold }]}>
              Next Release: May 25, 2025
            </Text>
            <Text style={[styles.releaseDesc, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
              UI/UX Design for Fintech App{"\n"}Project Milestone 02
            </Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <SectionHeader
          title="Recent Transactions"
          actionLabel="View All"
          onAction={() => {}}
        />

        <View
          style={[
            styles.transactionsCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          {transactions.map((tx, index) => (
            <View key={index}>
              <TransactionItem
                name={tx.name}
                description={tx.description}
                amount={tx.amount}
                status={tx.status}
              />
              {index < transactions.length - 1 && (
                <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />
              )}
            </View>
          ))}
        </View>

        {/* Withdraw Button */}
        <View style={styles.withdrawBtnContainer}>
          <Button title="Withdraw Funds" onPress={() => {}} />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    marginTop: 16,
    marginBottom: 20,
  },
  // Balance Card
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 14,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    marginBottom: 6,
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 38,
    marginBottom: 6,
  },
  balanceSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 20,
  },
  balanceStatsRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  balanceStatItem: {
    flex: 1,
    alignItems: "center",
  },
  balanceStatLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginBottom: 4,
  },
  balanceStatValue: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  balanceStatDivider: {
    width: 1,
    height: 36,
  },
  // Withdrawn
  withdrawnCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  withdrawnLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  withdrawnAmount: {
    fontSize: 22,
  },
  // Release
  releaseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    gap: 14,
  },
  releaseIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  releaseContent: {
    flex: 1,
  },
  releaseTitle: {
    fontSize: 14,
    marginBottom: 3,
  },
  releaseDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  // Transactions
  transactionsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  divider: {
    height: 1,
  },
  withdrawBtnContainer: {
    marginTop: 4,
  },
});

export default Earnings;
