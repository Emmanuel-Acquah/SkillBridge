import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Copy,
  Smartphone,
  Building2,
  Check,
  ChevronDown,
  Shield,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import FloatingLabelInput from "../shared/FloatingLabelInput";
import Button from "../shared/Button";

type WithdrawMethod = "mobile_money" | "bank_transfer";

const WithdrawFunds = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [selectedMethod, setSelectedMethod] =
    useState<WithdrawMethod>("mobile_money");
  const [accountName, setAccountName] = useState("John Doe");
  const [accountNumber, setAccountNumber] = useState("024 000 0000");
  const [selectedNetwork, setSelectedNetwork] = useState("MTN Ghana");
  const [amount, setAmount] = useState("1250");
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);

  const networks = ["MTN Ghana", "Vodafone Ghana", "AirtelTigo"];

  const platformFee = 5.0;
  const amountNum = parseFloat(amount) || 0;
  const totalReceive = amountNum - platformFee;

  const methods = [
    {
      key: "mobile_money" as const,
      icon: Smartphone,
      title: "Mobile Money",
      subtitle: "",
    },
    {
      key: "bank_transfer" as const,
      icon: Building2,
      title: "Bank Transfer",
      subtitle: "Swift & Secure",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 10,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={[
            styles.headerBtn,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <ArrowLeft
            size={20}
            color={theme.colors.textPrimary}
            strokeWidth={2}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold },
          ]}
        >
          Withdraw Funds
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.headerBtn,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <Copy size={18} color={theme.colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Balance Info */}
        <View style={styles.balanceSection}>
          <Text
            style={[
              styles.balanceLabel,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            Available Balance
          </Text>
          <Text
            style={[
              styles.balanceAmount,
              { color: theme.colors.primary, fontFamily: theme.fonts.bold },
            ]}
          >
            GH₵1,250
          </Text>

          <View style={styles.infoRow}>
            <Text
              style={[
                styles.infoLabel,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              Min. Withdrawal
            </Text>
            <Text
              style={[
                styles.infoValue,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              GH₵50
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text
              style={[
                styles.infoLabel,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              Est. Processing
            </Text>
            <Text
              style={[
                styles.infoValue,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              24-48 Hours
            </Text>
          </View>
        </View>

        <View
          style={[styles.divider, { backgroundColor: theme.colors.border }]}
        />

        {/* Withdrawal Method */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          Withdrawal Method
        </Text>

        {methods.map((method) => {
          const isSelected = selectedMethod === method.key;
          const Icon = method.icon;
          return (
            <TouchableOpacity
              key={method.key}
              onPress={() => setSelectedMethod(method.key)}
              activeOpacity={0.7}
              style={[
                styles.methodCard,
                {
                  backgroundColor: isSelected
                    ? theme.colors.primarySurface
                    : theme.colors.surface,
                  borderColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.methodIcon,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.surfaceSecondary,
                  },
                ]}
              >
                <Icon
                  size={20}
                  color={
                    isSelected
                      ? theme.colors.textOnPrimary
                      : theme.colors.textSecondary
                  }
                  strokeWidth={1.8}
                />
              </View>

              <View style={styles.methodContent}>
                <Text
                  style={[
                    styles.methodTitle,
                    {
                      color: theme.colors.textPrimary,
                      fontFamily: isSelected
                        ? theme.fonts.semiBold
                        : theme.fonts.medium,
                    },
                  ]}
                >
                  {method.title}
                </Text>
                {method.subtitle ? (
                  <Text
                    style={[
                      styles.methodSub,
                      {
                        color: theme.colors.textLight,
                        fontFamily: theme.fonts.regular,
                      },
                    ]}
                  >
                    {method.subtitle}
                  </Text>
                ) : null}
              </View>

              <View
                style={[
                  styles.radio,
                  {
                    borderColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.border,
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : "transparent",
                  },
                ]}
              >
                {isSelected && (
                  <Check
                    size={14}
                    color={theme.colors.textOnPrimary}
                    strokeWidth={3}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <View
          style={[styles.divider, { backgroundColor: theme.colors.border }]}
        />

        {/* Account Details */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          Account Details
        </Text>

        <FloatingLabelInput
          label="Account Name"
          value={accountName}
          onChangeText={setAccountName}
        />

        <FloatingLabelInput
          label={
            selectedMethod === "mobile_money"
              ? "Mobile Money Number / Account Number"
              : "Account Number"
          }
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="phone-pad"
        />

        {/* Network Dropdown */}
        <View style={styles.dropdownWrapper}>
          <Text
            style={[
              styles.dropdownLabel,
              { color: theme.colors.textLight, fontFamily: theme.fonts.medium },
            ]}
          >
            Select Network / Bank
          </Text>
          <TouchableOpacity
            onPress={() => setShowNetworkDropdown(!showNetworkDropdown)}
            activeOpacity={0.7}
            style={[
              styles.dropdown,
              {
                backgroundColor: theme.colors.inputBackground,
                borderColor: showNetworkDropdown
                  ? theme.colors.primary
                  : theme.colors.inputBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.dropdownValue,
                {
                  color: theme.colors.inputText,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              {selectedNetwork}
            </Text>
            <ChevronDown
              size={18}
              color={theme.colors.textLight}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {showNetworkDropdown && (
            <View
              style={[
                styles.dropdownOptions,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                  ...Platform.select({
                    ios: {
                      shadowColor: theme.colors.shadow,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.12,
                      shadowRadius: 12,
                    },
                    android: { elevation: 6 },
                  }),
                },
              ]}
            >
              {networks.map((network) => (
                <TouchableOpacity
                  key={network}
                  onPress={() => {
                    setSelectedNetwork(network);
                    setShowNetworkDropdown(false);
                  }}
                  activeOpacity={0.7}
                  style={[
                    styles.dropdownOption,
                    selectedNetwork === network && {
                      backgroundColor: theme.colors.primarySurface,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          selectedNetwork === network
                            ? theme.colors.primary
                            : theme.colors.textPrimary,
                        fontFamily:
                          selectedNetwork === network
                            ? theme.fonts.semiBold
                            : theme.fonts.regular,
                      },
                    ]}
                  >
                    {network}
                  </Text>
                  {selectedNetwork === network && (
                    <Check
                      size={16}
                      color={theme.colors.primary}
                      strokeWidth={2.5}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View
          style={[styles.divider, { backgroundColor: theme.colors.border }]}
        />

        {/* Review Withdrawal */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          Review Withdrawal
        </Text>

        {/* Amount */}
        <Text
          style={[
            styles.fieldLabel,
            {
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.regular,
            },
          ]}
        >
          Amount to Withdraw (GH₵)
        </Text>
        <View
          style={[
            styles.amountInputRow,
            {
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.inputBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.currencyPrefix,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            GH₵
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={[
              styles.amountInput,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold },
            ]}
            selectionColor={theme.colors.primary}
          />
        </View>

        {/* Fee */}
        <View style={styles.reviewRow}>
          <Text
            style={[
              styles.reviewLabel,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            Platform Fee
          </Text>
          <Text
            style={[
              styles.reviewFee,
              { color: theme.colors.error, fontFamily: theme.fonts.semiBold },
            ]}
          >
            GH₵{platformFee.toFixed(2)}
          </Text>
        </View>

        {/* Total */}
        <View style={styles.reviewRow}>
          <Text
            style={[
              styles.totalLabel,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            Total to Receive
          </Text>
          <Text
            style={[
              styles.totalValue,
              { color: theme.colors.success, fontFamily: theme.fonts.bold },
            ]}
          >
            GH₵
            {totalReceive > 0
              ? totalReceive.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "0.00"}
          </Text>
        </View>

        {/* Confirm */}
        <View style={styles.confirmContainer}>
          <Button
            title="Confirm Withdrawal"
            onPress={() => {}}
            icon={
              <Check
                size={18}
                color={theme.colors.textOnPrimary}
                strokeWidth={2.5}
              />
            }
          />
        </View>

        {/* Security */}
        <View style={styles.securityRow}>
          <Shield size={14} color={theme.colors.textLight} strokeWidth={2} />
          <Text
            style={[
              styles.securityText,
              {
                color: theme.colors.textLight,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            Your transaction is protected by 256-bit SSL encryption
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  // Balance
  balanceSection: { marginBottom: 4 },
  balanceLabel: { fontSize: 13, marginBottom: 4 },
  balanceAmount: { fontSize: 34, marginBottom: 16 },
  infoRow: { marginBottom: 8 },
  infoLabel: { fontSize: 12, marginBottom: 2 },
  infoValue: { fontSize: 15 },
  divider: { height: 1, marginVertical: 20 },
  sectionTitle: { fontSize: 17, marginBottom: 16 },
  // Method
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
    gap: 14,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  methodContent: { flex: 1 },
  methodTitle: { fontSize: 15 },
  methodSub: { fontSize: 12, marginTop: 1 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  // Dropdown
  dropdownWrapper: { marginBottom: 16, zIndex: 10 },
  dropdownLabel: { fontSize: 13, marginBottom: 8 },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
  },
  dropdownValue: { fontSize: 15 },
  dropdownOptions: {
    position: "absolute",
    top: 82,
    left: 0,
    right: 0,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 20,
  },
  dropdownOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionText: { fontSize: 14 },
  // Review
  fieldLabel: { fontSize: 13, marginBottom: 8 },
  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  currencyPrefix: { fontSize: 15 },
  amountInput: { flex: 1, fontSize: 18, height: "100%" },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewLabel: { fontSize: 14 },
  reviewFee: { fontSize: 14 },
  totalLabel: { fontSize: 15 },
  totalValue: { fontSize: 22 },
  confirmContainer: { marginTop: 12, marginBottom: 16 },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  securityText: { fontSize: 12 },
});

export default WithdrawFunds;
