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
import { ArrowLeft, Mail, ArrowRight, ShieldCheck, Lock } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../contexts/ThemeContext";

// Vector Lock-Refresh Icon (similar to circular back-lock in mockup)
const ForgotLockIcon = ({ color }: { color: string }) => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-3-3 3-3m-3 3h8M4 12a8 8 0 0113.657-5.657L20 9m-1.657 9.657L16 15m4-3a8 8 0 01-8 8" />
  </Svg>
);

const ForgotPassword = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  // Input states
  const [emailAddress, setEmailAddress] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Haptic trigger
  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  // Back to login page
  const handleBackToLogin = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(screens)/Login" as RelativePathString);
  };

  // Verification request handler
  const handleSendVerification = () => {
    if (!emailAddress) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      }
      alert("Please enter your email address.");
      return;
    }

    // Success haptic
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }

    alert(`A verification code has been sent to ${emailAddress}`);
    
    // Redirect to OTP Verification flow
    router.replace("/(screens)/OTPVerification" as RelativePathString);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0A0B10" : "#F4F0FA" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackToLogin}
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
            
            {/* Top Back-Lock Dynamic Badge Overlay */}
            <View style={styles.iconBadgeWrapper}>
              <View style={[styles.iconCircle, { backgroundColor: isDark ? "#1C1D26" : "#F5F3FF" }]}>
                <ForgotLockIcon color={theme.colors.primary} />
              </View>
            </View>

            <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}>
              Forgot Password?
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              {"Enter your email address and we'll send you a verification code."}
            </Text>

            {/* Email Form Wrapper */}
            <View style={styles.formContainer}>
              
              {/* EMAIL ADDRESS */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>EMAIL ADDRESS</Text>
                <View 
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: isDark ? "#1C1D26" : "#F5F3FF",
                      borderColor: isFocused ? theme.colors.primary : "transparent",
                      borderWidth: isFocused ? 1.5 : 0,
                    }
                  ]}
                >
                  <Mail size={16} color="#A0AEC0" style={styles.leftIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="name@company.com"
                    placeholderTextColor="#CBD5E0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
              </View>

              {/* Main Submit Action */}
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.95}
                onPress={handleSendVerification}
              >
                <Text style={styles.submitText}>Send Verification Code</Text>
                <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} style={styles.buttonArrow} />
              </TouchableOpacity>

              {/* Back to Login Switcher */}
              <View style={styles.backToLoginRow}>
                <Text style={[styles.backToLoginLabel, { color: isDark ? "#A0AEC0" : "#718096" }]}>
                  Remembered your password?
                </Text>
                <TouchableOpacity onPress={handleBackToLogin} activeOpacity={0.7} style={styles.backToLoginLink}>
                  <Text style={[styles.backActionText, { color: theme.colors.primary }]}>Back to Login &gt;</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          {/* Secured Banner Footer (Outside the card) */}
          <View style={styles.encryptionFooter}>
            <View style={styles.encryptionBadges}>
              <Lock size={14} color={isDark ? "#718096" : "#A0AEC0"} />
              <ShieldCheck size={14} color={isDark ? "#718096" : "#A0AEC0"} style={{ marginLeft: 6 }} />
            </View>
            <Text style={[styles.encryptionText, { color: isDark ? "#718096" : "#A0AEC0" }]}>
              SECURED BY ENTERPRISE-GRADE ENCRYPTION
            </Text>
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
    paddingTop: 36,
    paddingBottom: 40,
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 36,
    paddingTop: 28,
    paddingBottom: 36,
    paddingHorizontal: 28,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    alignItems: "center",
  },
  iconBadgeWrapper: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  formContainer: {
    width: "100%",
  },
  fieldWrapper: {
    width: "100%",
    marginBottom: 24,
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
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    height: "100%",
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
  buttonArrow: {
    marginLeft: 8,
  },
  backToLoginRow: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  backToLoginLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  backToLoginLink: {
    paddingVertical: 2,
  },
  backActionText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  encryptionFooter: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  encryptionBadges: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  encryptionText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    textAlign: "center",
  },
});

export default ForgotPassword;
