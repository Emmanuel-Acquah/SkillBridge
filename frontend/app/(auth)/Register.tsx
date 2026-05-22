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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../contexts/ThemeContext";

// Signature Vector Google Icon SVG
const GoogleIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" style={{ marginRight: 8 }}>
    <Path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1 0.84-2.46 2.77v2.3h4.01c2.35-2.17 3.7-5.36 3.7-8.92z"
    />
    <Path
      fill="#34A853"
      d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.88-3.02c-1.08.72-2.47 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.97H1.11v3.13C3.09 21.37 7.23 24 12 24z"
    />
    <Path
      fill="#FBBC05"
      d="M5.25 14.25c-.25-.72-.39-1.5-.39-2.3s.14-1.58.39-2.3V6.52H1.11c-.81 1.62-1.27 3.44-1.27 5.38s.46 3.76 1.27 5.38l4.14-3.03z"
    />
    <Path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.23 0 3.09 2.63 1.11 6.52l4.14 3.03c.95-2.85 3.61-4.97 6.75-4.97z"
    />
  </Svg>
);

// Apple vector logo SVG
const AppleIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill={color} style={{ marginRight: 8 }}>
    <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
  </Svg>
);

const Register = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  // Form Field States
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Focus Input States
  const [activeInput, setActiveInput] = useState<"name" | "email" | "pass" | "confirm" | null>(null);

  // Haptics helper
  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  // Back to role selection
  const handleBack = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(screens)/roleselection" as RelativePathString);
  };

  // Toggle round checkbox
  const handleToggleTerms = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setAgreeToTerms(!agreeToTerms);
  };

  // Handle successful registration & save completed state
  const handleRegister = () => {
    if (!fullName || !emailAddress || !password || !confirmPassword) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      }
      alert("Please fill in all details to get started.");
      return;
    }

    if (password !== confirmPassword) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      }
      alert("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      }
      alert("You must agree to the Terms and Privacy Policy to proceed.");
      return;
    }

    // Success Haptics
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }

    // Secure onboarding setting so splashscreen knows we logged in
    AsyncStorage.setItem("HAS_COMPLETED_ONBOARDING", "true").catch(() => {});

    // Redirect straight into Dashboard Tab Bar
    router.replace("/(tabs)/ClientDashboard" as RelativePathString);
  };

  const handleLoginRedirect = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(screens)/Login" as RelativePathString);
  };

  // Dynamic input styling
  const getInputStyle = (fieldName: "name" | "email" | "pass" | "confirm") => {
    const isFocused = activeInput === fieldName;
    return [
      styles.inputContainer,
      {
        backgroundColor: isDark ? "#1C1D26" : "#FFFFFF",
        borderColor: isFocused ? theme.colors.primary : (isDark ? theme.colors.inputBorder : "#ECE9F6"),
        borderWidth: isFocused ? 1.5 : 1,
      },
    ];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0A0B10" : "#F4F0FA" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header with back navigation & Brand */}
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
        
        {/* Spacer for balanced alignment */}
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
          {/* Main White/Surface Card Container */}
          <View style={[styles.card, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
            
            <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}>
              Create your account
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Enter your details to get started.
            </Text>

            {/* Inputs Block */}
            <View style={styles.formContainer}>
              
              {/* FULL NAME */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>FULL NAME</Text>
                <View style={getInputStyle("name")}>
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="John Doe"
                    placeholderTextColor="#CBD5E0"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setActiveInput("name")}
                    onBlur={() => setActiveInput(null)}
                  />
                </View>
              </View>

              {/* EMAIL ADDRESS */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>EMAIL ADDRESS</Text>
                <View style={getInputStyle("email")}>
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="name@company.com"
                    placeholderTextColor="#CBD5E0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    onFocus={() => setActiveInput("email")}
                    onBlur={() => setActiveInput(null)}
                  />
                </View>
              </View>

              {/* PASSWORD */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>PASSWORD</Text>
                <View style={getInputStyle("pass")}>
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="••••••••"
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
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>CONFIRM</Text>
                <View style={getInputStyle("confirm")}>
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="••••••••"
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

              {/* Round Checkbox (Terms & Privacy) */}
              <TouchableOpacity
                style={styles.termsWrapper}
                onPress={handleToggleTerms}
                activeOpacity={0.8}
              >
                <View 
                  style={[
                    styles.checkboxCircle, 
                    { 
                      borderColor: agreeToTerms ? theme.colors.primary : "#CBD5E0",
                      backgroundColor: agreeToTerms ? theme.colors.primary : "transparent"
                    }
                  ]}
                >
                  {agreeToTerms && (
                    <View style={styles.checkboxInner} />
                  )}
                </View>
                <Text style={[styles.termsText, { color: isDark ? "#CBD5E0" : "#4A5568" }]}>
                  I agree to the <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Terms</Text> and <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Privacy Policy</Text>.
                </Text>
              </TouchableOpacity>

              {/* Main Submit Action */}
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.95}
                onPress={handleRegister}
              >
                <Text style={styles.submitText}>Register Account</Text>
              </TouchableOpacity>

              {/* Social login divider */}
              <View style={styles.dividerRow}>
                <View style={[styles.dividerLine, { backgroundColor: isDark ? "#2D3748" : "#ECE9F6" }]} />
                <Text style={[styles.dividerText, { color: isDark ? "#A0AEC0" : "#718096" }]}>
                  OR REGISTER WITH
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: isDark ? "#2D3748" : "#ECE9F6" }]} />
              </View>

              {/* Social Login Buttons Stack */}
              <View style={styles.socialButtonsRow}>
                {/* Google Button */}
                <TouchableOpacity
                  style={[styles.socialButton, { borderColor: isDark ? "#2D3748" : "#ECE9F6" }]}
                  activeOpacity={0.85}
                  onPress={() => triggerHaptic(Haptics.ImpactFeedbackStyle.Light)}
                >
                  <GoogleIcon />
                  <Text style={[styles.socialText, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>Google</Text>
                </TouchableOpacity>

                {/* Apple / iOS Button */}
                <TouchableOpacity
                  style={[styles.socialButton, { borderColor: isDark ? "#2D3748" : "#ECE9F6" }]}
                  activeOpacity={0.85}
                  onPress={() => triggerHaptic(Haptics.ImpactFeedbackStyle.Light)}
                >
                  <AppleIcon color={isDark ? "#FFFFFF" : "#000000"} />
                  <Text style={[styles.socialText, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>iOS</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          {/* Login Switcher (Outside the Card, as positioned in screenshot) */}
          <View style={styles.loginRow}>
            <Text style={[styles.loginLabel, { color: isDark ? "#A0AEC0" : "#718096" }]}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleLoginRedirect} activeOpacity={0.7}>
              <Text style={[styles.loginActionText, { color: theme.colors.primary }]}>Log In</Text>
            </TouchableOpacity>
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
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 36,
    paddingVertical: 32,
    paddingHorizontal: 28,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 28,
  },
  formContainer: {
    width: "100%",
  },
  fieldWrapper: {
    width: "100%",
    marginBottom: 16,
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
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    fontWeight: "500",
    height: "100%",
  },
  termsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    paddingRight: 12,
  },
  checkboxCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  termsText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },
  submitButton: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
    marginHorizontal: 12,
  },
  socialButtonsRow: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  socialText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  loginLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  loginActionText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Register;
