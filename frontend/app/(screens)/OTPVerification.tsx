import React, { useState, useRef, useEffect } from "react";
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
import { ArrowLeft } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../contexts/ThemeContext";

// Vector Mail-Check Icon for the top badge
const MailCheckIcon = ({ color }: { color: string }) => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    <Path strokeLinecap="round" strokeLinejoin="round" d="M16 14l2 2 4-4" />
  </Svg>
);

const OTPVerification = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  // OTP State (4 digits)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  
  // Resend Timer State
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Navigate back
  const handleBack = () => {
    router.replace("/(screens)/ForgotPassword" as RelativePathString);
  };

  // Handle OTP Input Change
  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent pasting multiple chars directly here for simplicity

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle KeyPress for backspace functionality
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Resend Code
  const handleResendCode = () => {
    if (canResend) {
      setCanResend(false);
      setTimeLeft(30);
      // Logic to resend OTP goes here
      alert("A new verification code has been sent.");
    }
  };

  // Verification request handler
  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length < 4) {
      alert("Please enter the 4-digit code.");
      return;
    }

    // Redirect to the Reset Password flow
    router.replace("/(screens)/ResetPassword" as RelativePathString);
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
            
            {/* Top Mail-Check Dynamic Badge Overlay */}
            <View style={styles.iconBadgeWrapper}>
              <View style={[styles.iconCircle, { backgroundColor: isDark ? "#1C1D26" : "#EBE3F8" }]}>
                <MailCheckIcon color={theme.colors.primary} />
              </View>
            </View>

            <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>
              Verification
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              {"We've sent a 4-digit code to your registered email."}
            </Text>

            {/* OTP Form Wrapper */}
            <View style={styles.formContainer}>
              
              {/* OTP Inputs Row */}
              <View style={styles.otpRow}>
                {[0, 1, 2, 3].map((index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.otpInputContainer,
                      {
                        backgroundColor: isDark ? "#1C1D26" : "#F8F5FC",
                      }
                    ]}
                  >
                    <TextInput
                      ref={(ref) => { inputRefs.current[index] = ref; }}
                      style={[styles.otpInput, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={otp[index]}
                      onChangeText={(value) => handleOtpChange(value, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      placeholder="•"
                      placeholderTextColor="#CBD5E0"
                      selectionColor={theme.colors.primary}
                    />
                  </View>
                ))}
              </View>

              {/* Main Submit Action */}
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.95}
                onPress={handleVerify}
              >
                <Text style={styles.submitText}>Verify Account</Text>
              </TouchableOpacity>

              {/* Resend Code Section */}
              <View style={styles.resendRow}>
                <Text style={[styles.resendLabel, { color: isDark ? "#A0AEC0" : "#718096" }]}>
                  {"Didn't receive the code? "}
                </Text>
                <TouchableOpacity 
                  onPress={handleResendCode} 
                  activeOpacity={canResend ? 0.7 : 1}
                  disabled={!canResend}
                >
                  <Text style={[
                    styles.resendActionText, 
                    { color: canResend ? theme.colors.primary : "#A0AEC0" }
                  ]}>
                    RESEND CODE {(!canResend && timeLeft > 0) ? `(${timeLeft}s)` : ""}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          {/* Security Protocols Footer (Outside the card) */}
          <View style={styles.securityFooter}>
            <Text style={[styles.securityText, { color: isDark ? "#718096" : "#A0AEC0" }]}>
              By continuing, you agree to our security protocols designed for enterprise-grade protection and premium user experience.
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
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 28,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    alignItems: "center",
  },
  iconBadgeWrapper: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
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
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  formContainer: {
    width: "100%",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  otpInputContainer: {
    width: 56,
    height: 64,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  otpInput: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
  submitButton: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
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
  resendRow: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  resendLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
  },
  resendActionText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  securityFooter: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    paddingHorizontal: 20,
  },
  securityText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default OTPVerification;
