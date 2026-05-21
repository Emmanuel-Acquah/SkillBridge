import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { CheckCircle2, TrendingUp, ShieldCheck, Lock, Headset } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Body2 = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const handleDone = () => {
    router.push("/(tabs)/Home" as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0A0B10" : "#F4F0FA" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + insets.bottom },
        ]}
      >
        
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={[styles.iconOuterCircle, { backgroundColor: isDark ? "#1C1D26" : "#FFFFFF" }]}>
            <CheckCircle2 size={40} color={theme.colors.primary} />
          </View>
        </View>

        {/* Title and Subtitle */}
        <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}>
          Order Placed{"\n"}Successfully!
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#A0AEC0" : "#718096" }]}>
          Your request has been sent to <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>Alex Sterling</Text>. You'll be notified as soon as they accept the project.
        </Text>

        {/* Next Steps Header */}
        <View style={styles.nextStepsHeader}>
          <TrendingUp size={18} color={theme.colors.primary} style={{ marginRight: 8 }} />
          <Text style={[styles.nextStepsTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Next Steps</Text>
        </View>

        {/* Step 1 */}
        <View style={[styles.stepCard, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Freelancer Reviews Request</Text>
            <Text style={[styles.stepDesc, { color: isDark ? "#A0AEC0" : "#718096" }]}>Alex will review your requirements and project assets within 24 hours.</Text>
          </View>
          <View style={[styles.stepNumberContainer, { backgroundColor: isDark ? "#1C1D26" : "#F5F3FF" }]}>
            <Text style={[styles.stepNumber, { color: isDark ? "#4A5568" : "#A0AEC0" }]}>1</Text>
          </View>
        </View>

        {/* Step 2 */}
        <View style={[styles.stepCard, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Project Kick-off</Text>
            <Text style={[styles.stepDesc, { color: isDark ? "#A0AEC0" : "#718096" }]}>Once accepted, the workspace opens and Alex begins the discovery phase.</Text>
          </View>
          <View style={[styles.stepNumberContainer, { backgroundColor: isDark ? "#1C1D26" : "#F5F3FF" }]}>
            <Text style={[styles.stepNumber, { color: isDark ? "#4A5568" : "#A0AEC0" }]}>2</Text>
          </View>
        </View>

        {/* Step 3 */}
        <View style={[styles.stepCard, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Escrow Release</Text>
            <Text style={[styles.stepDesc, { color: isDark ? "#A0AEC0" : "#718096" }]}>Funds are released only after you approve the final dashboard designs.</Text>
          </View>
          <View style={[styles.stepNumberContainer, { backgroundColor: isDark ? "#1C1D26" : "#F5F3FF" }]}>
            <Text style={[styles.stepNumber, { color: isDark ? "#4A5568" : "#A0AEC0" }]}>3</Text>
          </View>
        </View>

        {/* Footer features */}
        <View style={styles.footerFeaturesRow}>
          <View style={styles.featureItem}>
            <ShieldCheck size={12} color={isDark ? "#A0AEC0" : "#718096"} />
            <Text style={[styles.featureText, { color: isDark ? "#A0AEC0" : "#718096" }]}>Secure Payment</Text>
          </View>
          <View style={styles.featureItem}>
            <Lock size={12} color={isDark ? "#A0AEC0" : "#718096"} />
            <Text style={[styles.featureText, { color: isDark ? "#A0AEC0" : "#718096" }]}>Escrow Protected</Text>
          </View>
          <View style={styles.featureItem}>
            <Headset size={12} color={isDark ? "#A0AEC0" : "#718096"} />
            <Text style={[styles.featureText, { color: isDark ? "#A0AEC0" : "#718096" }]}>24/7 Support</Text>
          </View>
        </View>

        {/* Done Button */}
        <TouchableOpacity style={[styles.doneButton, { backgroundColor: theme.colors.primary }]} activeOpacity={0.9} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
  },
  successIconContainer: {
    marginBottom: 24,
  },
  iconOuterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  nextStepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stepCard: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
  },
  stepContent: {
    flex: 1,
    paddingRight: 16,
    zIndex: 2,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  stepNumberContainer: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    right: 36,
    top: 36,
  },
  footerFeaturesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    marginBottom: 60,
    paddingHorizontal: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    fontSize: 9,
    marginLeft: 4,
    fontWeight: "500",
  },
  doneButton: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B21A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 24,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Body2;
