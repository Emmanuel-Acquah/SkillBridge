import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { ArrowLeft, Plus, ShieldCheck, Shield, Smartphone, Building } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

const PaymentSummary = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [selectedMethod, setSelectedMethod] = useState<"card" | "mobile" | "bank">("card");
  const [promoCode, setPromoCode] = useState("");

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleBack = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handlePayNow = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(screens)/body2" as any);
  };

  const RadioIcon = ({ selected }: { selected: boolean }) => (
    <View
      style={[
        styles.radioOuter,
        {
          borderColor: selected ? theme.colors.primary : (isDark ? "#4A5568" : "#CBD5E0"),
        },
      ]}
    >
      {selected && <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0A0B10" : "#F4F0FA" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <ArrowLeft size={22} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Secure Payment</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Order Summary */}
        <View style={[styles.card, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Order Summary</Text>
          <View style={[styles.orderBox, { backgroundColor: isDark ? "#1C1D26" : "#F5F3FF" }]}>
            <View style={styles.orderHeader}>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop" }} 
                style={styles.orderImage} 
              />
              <Text style={[styles.orderTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>
                Advanced UI Design Package
              </Text>
            </View>
            <View style={styles.orderProvider}>
              <Image source={{ uri: "https://i.pravatar.cc/100?img=11" }} style={styles.providerAvatar} />
              <View style={styles.providerInfo}>
                <Text style={[styles.providerName, { color: isDark ? "#E2E8F0" : "#4A5568" }]}>
                  Alex Strathmore - Senior Designer
                </Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>VERIFIED PRO</Text>
                </View>
              </View>
            </View>
            <Text style={[styles.orderPrice, { color: theme.colors.primary }]}>$1,250.00</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={[styles.card, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#FFFFFF" : "#1A202C", flex: 1 }]}>Payment Method</Text>
            <TouchableOpacity style={styles.addCardBtn} activeOpacity={0.7} onPress={() => triggerHaptic(Haptics.ImpactFeedbackStyle.Light)}>
              <Plus size={14} color={theme.colors.primary} />
              <Text style={[styles.addCardText, { color: theme.colors.primary }]}>Add New Card</Text>
            </TouchableOpacity>
          </View>

          {/* Option 1: Card */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => { triggerHaptic(Haptics.ImpactFeedbackStyle.Light); setSelectedMethod("card"); }}
            style={[
              styles.paymentOption,
              { backgroundColor: isDark ? "#1C1D26" : "#FFFFFF" },
              selectedMethod === "card" && { borderColor: theme.colors.primary, backgroundColor: isDark ? "#1C1D26" : "#FFFFFF", borderWidth: 1.5 }
            ]}
          >
            <View style={[styles.iconBox, { backgroundColor: "#1A202C" }]}>
              <Text style={styles.visaText}>VISA</Text>
            </View>
            <View style={styles.paymentInfo}>
              <Text style={[styles.paymentTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>**** **** **** 4242</Text>
              <Text style={[styles.paymentSub, { color: isDark ? "#A0AEC0" : "#718096" }]}>Expires 12/26</Text>
            </View>
            <RadioIcon selected={selectedMethod === "card"} />
          </TouchableOpacity>

          {/* Option 2: Mobile Money */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => { triggerHaptic(Haptics.ImpactFeedbackStyle.Light); setSelectedMethod("mobile"); }}
            style={[
              styles.paymentOption,
              { backgroundColor: isDark ? "#1C1D26" : "#FFFFFF" },
              selectedMethod === "mobile" && { borderColor: theme.colors.primary, backgroundColor: isDark ? "#1C1D26" : "#FFFFFF", borderWidth: 1.5 }
            ]}
          >
            <View style={[styles.iconBox, { backgroundColor: isDark ? "#2D3748" : "#E9D8FD" }]}>
              <Smartphone size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={[styles.paymentTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Mobile Money</Text>
              <Text style={[styles.paymentSub, { color: isDark ? "#A0AEC0" : "#718096" }]}>M-Pesa, MTN, Airtel</Text>
            </View>
            <RadioIcon selected={selectedMethod === "mobile"} />
          </TouchableOpacity>

          {/* Option 3: Direct Bank Transfer */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => { triggerHaptic(Haptics.ImpactFeedbackStyle.Light); setSelectedMethod("bank"); }}
            style={[
              styles.paymentOption,
              { backgroundColor: isDark ? "#1C1D26" : "#FFFFFF" },
              selectedMethod === "bank" && { borderColor: theme.colors.primary, backgroundColor: isDark ? "#1C1D26" : "#FFFFFF", borderWidth: 1.5 }
            ]}
          >
            <View style={[styles.iconBox, { backgroundColor: isDark ? "#2D3748" : "#E9D8FD" }]}>
              <Building size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={[styles.paymentTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Direct Bank Transfer</Text>
              <Text style={[styles.paymentSub, { color: isDark ? "#A0AEC0" : "#718096" }]}>Secure local & international transfer</Text>
            </View>
            <RadioIcon selected={selectedMethod === "bank"} />
          </TouchableOpacity>
        </View>

        {/* Payment Details */}
        <View style={[styles.card, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
          <Text style={[styles.paymentDetailsTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Payment Details</Text>
          
          <View style={styles.receiptRow}>
            <Text style={[styles.receiptLabel, { color: isDark ? "#A0AEC0" : "#4A5568" }]}>Service Fee</Text>
            <Text style={[styles.receiptValue, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>$1,250.00</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={[styles.receiptLabel, { color: isDark ? "#A0AEC0" : "#4A5568" }]}>SkillBridge Platform Fee (3%)</Text>
            <Text style={[styles.receiptValue, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>$37.50</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={[styles.receiptLabel, { color: isDark ? "#A0AEC0" : "#4A5568" }]}>Taxes</Text>
            <Text style={[styles.receiptValue, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>$0.00</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? "#2D3748" : "#E2E8F0" }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.colors.primary }]}>Total Amount</Text>
            <Text style={[styles.totalValue, { color: theme.colors.primary }]}>$1,287.50</Text>
          </View>

          <TouchableOpacity style={[styles.payButton, { backgroundColor: theme.colors.primary }]} activeOpacity={0.9} onPress={handlePayNow}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>

          <Text style={[styles.termsText, { color: isDark ? "#A0AEC0" : "#718096" }]}>
            By clicking Pay Now, you agree to our{" "}
            <Text style={{ color: theme.colors.primary }}>Terms of Service</Text> and Escrow Protection policy.
          </Text>
        </View>

        {/* Security Badges */}
        <View style={styles.badgesContainer}>
          <View style={[styles.badgeCard, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
            <ShieldCheck size={20} color="#38A169" />
            <Text style={[styles.badgeTitle, { color: isDark ? "#A0AEC0" : "#4A5568" }]}>SSL SECURE</Text>
            <Text style={[styles.badgeSub, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>256-bit AES</Text>
          </View>
          <View style={[styles.badgeCard, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
            <Shield size={20} color={theme.colors.primary} />
            <Text style={[styles.badgeTitle, { color: isDark ? "#A0AEC0" : "#4A5568" }]}>PROTECTION</Text>
            <Text style={[styles.badgeSub, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Escrow Secured</Text>
          </View>
        </View>

        {/* Promo Code */}
        <View style={[styles.promoContainer, { backgroundColor: isDark ? "#1C1D26" : "#F5F3FF" }]}>
          <TextInput
            style={[styles.promoInput, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
            placeholder="Promo code"
            placeholderTextColor={isDark ? "#A0AEC0" : "#A0AEC0"}
            value={promoCode}
            onChangeText={setPromoCode}
            autoCapitalize="none"
          />
          <TouchableOpacity style={[styles.applyButton, { backgroundColor: theme.colors.primary }]} activeOpacity={0.8}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 48 : 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRightSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addCardBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  addCardText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
  },
  orderBox: {
    borderRadius: 16,
    padding: 16,
    alignItems: "flex-end",
  },
  orderHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  orderImage: {
    width: 40,
    height: 30,
    borderRadius: 6,
    marginRight: 12,
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  orderProvider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  providerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 12,
    marginBottom: 2,
  },
  verifiedBadge: {
    backgroundColor: "#E6FFFA",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  verifiedText: {
    color: "#38A169",
    fontSize: 8,
    fontWeight: "bold",
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  iconBox: {
    width: 36,
    height: 28,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  visaText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  paymentSub: {
    fontSize: 11,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  paymentDetailsTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  receiptLabel: {
    fontSize: 12,
  },
  receiptValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "900",
  },
  payButton: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#6B21A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  badgeCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  badgeTitle: {
    fontSize: 8,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  badgeSub: {
    fontSize: 10,
    fontWeight: "bold",
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  promoInput: {
    flex: 1,
    fontSize: 14,
    height: "100%",
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PaymentSummary;
