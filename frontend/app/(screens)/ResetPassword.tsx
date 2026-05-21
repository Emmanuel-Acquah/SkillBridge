import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter, type RelativePathString } from "expo-router";
import * as Haptics from "expo-haptics";
import { ArrowLeft, Lock, ShieldCheck, Info, Key, Shield, Fingerprint } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../contexts/ThemeContext";

const LiveSyncIcon = ({ color }: { color: string }) => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m-4 6H4m0 0l4 4m-4-4l4-4" />
  </Svg>
);

const AesIcon = ({ color }: { color: string }) => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const ResetPassword = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  // Input states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeInput, setActiveInput] = useState<"pass" | "confirm" | null>(null);

  // Haptic trigger
  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  // Back to previous screen
  const handleBack = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(screens)/OTPVerification" as RelativePathString);
  };

  // Submission handler
  const handleUpdatePassword = () => {
    if (!password || !confirmPassword) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      }
      alert("Please fill in both password fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      }
      alert("Passwords do not match.");
      return;
    }

    // Success haptic
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }

    alert("Your password has been successfully updated.");
    
    // Redirect cleanly into Login
    router.replace("/(screens)/Login" as RelativePathString);
  };

  // Dynamic input styling
  const getInputStyle = (fieldName: "pass" | "confirm") => {
    const isFocused = activeInput === fieldName;
    return [
      styles.inputContainer,
      {
        backgroundColor: isDark ? "#1C1D26" : "#F8F5FC",
        borderColor: isFocused ? theme.colors.primary : "transparent",
        borderWidth: isFocused ? 1.5 : 0,
      },
    ];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0A0B10" : "#F4F0FA" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={isDark ? "#FFFFFF" : theme.colors.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.brandText, { color: theme.colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>
          SkillBridge
        </Text>
        
        {/* Spacer for layout symmetry */}
        <View style={styles.spacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Central Rounded White Form Card */}
          <View style={[styles.card, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
            
            {/* Top decorative gradient bar */}
            <View style={styles.topGradientBar} />

            <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>
              Reset Password
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Secure your account with a new, enterprise-grade password.
            </Text>

            {/* Form Wrapper */}
            <View style={styles.formContainer}>
              
              {/* NEW PASSWORD */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>NEW PASSWORD</Text>
                <View style={getInputStyle("pass")}>
                  <Lock size={16} color="#A0AEC0" style={styles.leftIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="••••••••••••"
                    placeholderTextColor="#CBD5E0"
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setActiveInput("pass")}
                    onBlur={() => setActiveInput(null)}
                  />
                </View>
              </View>

              {/* CONFIRM PASSWORD */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>CONFIRM PASSWORD</Text>
                <View style={getInputStyle("confirm")}>
                  <ShieldCheck size={16} color="#A0AEC0" style={styles.leftIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="••••••••••••"
                    placeholderTextColor="#CBD5E0"
                    secureTextEntry
                    autoCapitalize="none"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setActiveInput("confirm")}
                    onBlur={() => setActiveInput(null)}
                  />
                </View>
              </View>

              {/* Info Box */}
              <View style={[styles.infoBox, { backgroundColor: isDark ? "#1C1D26" : "#F8F5FC" }]}>
                <View style={[styles.infoIconWrapper, { backgroundColor: theme.colors.primary }]}>
                  <Info size={12} color="#FFFFFF" />
                </View>
                <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
                  {"Your new password will be automatically synced across all connected enterprise devices."}
                </Text>
              </View>

              {/* Main Submit Action */}
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.95}
                onPress={handleUpdatePassword}
              >
                <Text style={styles.submitText}>Update Password</Text>
              </TouchableOpacity>

              {/* Divider Inside Card */}
              <View style={[styles.divider, { backgroundColor: isDark ? "#2D3748" : "#F0F0F0" }]} />

              {/* Enterprise Protocol Section */}
              <View style={styles.protocolContainer}>
                <Text style={[styles.protocolTitle, { color: isDark ? "#A0AEC0" : "#A0AEC0" }]}>
                  ENTERPRISE PROTOCOL ACTIVE
                </Text>
                <View style={styles.protocolBadgesRow}>
                  <View style={styles.protocolBadge}>
                    <AesIcon color="#A0AEC0" />
                    <Text style={styles.protocolBadgeText}>AES-256</Text>
                  </View>
                  <View style={styles.protocolBadge}>
                    <LiveSyncIcon color="#A0AEC0" />
                    <Text style={styles.protocolBadgeText}>LIVE SYNC</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

          {/* Security Features Row (Outside Card) */}
          <View style={styles.featuresRow}>
            <View style={[styles.featureCard, { backgroundColor: isDark ? "#12131A" : "#F8F5FC" }]}>
              <View style={styles.featureIconContainer}>
                <Key size={14} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={[styles.featureTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Min 12 Chars</Text>
                <Text style={[styles.featureSubtitle, { color: theme.colors.textSecondary }]}>STANDARD</Text>
              </View>
            </View>

            <View style={[styles.featureCard, { backgroundColor: isDark ? "#12131A" : "#F8F5FC" }]}>
              <View style={styles.featureIconContainer}>
                <Fingerprint size={14} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={[styles.featureTitle, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Complexity</Text>
                <Text style={[styles.featureSubtitle, { color: theme.colors.textSecondary }]}>HIGH PRIORITY</Text>
              </View>
            </View>
          </View>

          {/* E2E Encrypted Badge Button */}
          <View style={styles.e2eBadge}>
            <Shield size={14} color="#10B981" style={{ marginRight: 8 }} />
            <Text style={styles.e2eText}>END-TO-END ENCRYPTED</Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 48 : 20,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  spacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 36,
    paddingTop: 0,
    paddingBottom: 32,
    paddingHorizontal: 28,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    overflow: "hidden",
  },
  topGradientBar: {
    height: 6,
    width: "100%",
    backgroundColor: "#6B21A8",
    marginBottom: 28,
    opacity: 0.8,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
    paddingRight: 10,
  },
  formContainer: {
    width: "100%",
  },
  fieldWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputContainer: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    height: "100%",
  },
  infoBox: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 28,
    alignItems: "flex-start",
  },
  infoIconWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  submitButton: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    shadowColor: "#6B21A8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 20,
  },
  protocolContainer: {
    alignItems: "center",
    width: "100%",
  },
  protocolTitle: {
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 12,
  },
  protocolBadgesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  protocolBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  protocolBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#A0AEC0",
    marginLeft: 6,
  },
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
    gap: 16,
  },
  featureCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  featureIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  e2eBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A202C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginTop: 28,
    alignSelf: "center",
  },
  e2eText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
});

export default ResetPassword;
