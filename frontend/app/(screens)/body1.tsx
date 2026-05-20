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
  Image,
} from "react-native";
import { useRouter, type RelativePathString } from "expo-router";
import * as Haptics from "expo-haptics";
import { ArrowLeft, Bell, MessageSquare, CloudUpload, Calendar, Send } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

const Body1 = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  // Form states
  const [projectDetails, setProjectDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Focus states
  const [activeInput, setActiveInput] = useState<"details" | "budget" | "deadline" | "notes" | null>(null);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleBack = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleSendRequest = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(screens)/paymentsummary" as RelativePathString);
  };

  const getInputStyle = (fieldName: "details" | "budget" | "deadline" | "notes") => {
    const isFocused = activeInput === fieldName;
    return [
      styles.inputContainer,
      fieldName === "details" || fieldName === "notes" ? styles.textAreaContainer : null,
      {
        backgroundColor: isDark ? "#1C1D26" : "#F5F3FF",
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
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={theme.colors.primary} />
          </TouchableOpacity>

          <Text style={[styles.brandText, { color: theme.colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>
            SkillBridge
          </Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Bell size={20} color={isDark ? "#FFFFFF" : "#1A202C"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <MessageSquare size={20} color={isDark ? "#FFFFFF" : "#1A202C"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://i.pravatar.cc/100?img=11" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Title Area */}
          <View style={styles.titleArea}>
            <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}>
              Request Service
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Connect with elite talent. Define your project requirements and budget to receive tailored proposals from our verified experts.
            </Text>
          </View>

          {/* Central Rounded White Form Card */}
          <View style={[styles.card, { backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}>
            
            <View style={styles.formContainer}>
              
              {/* PROJECT DETAILS */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>PROJECT DETAILS</Text>
                <View style={getInputStyle("details")}>
                  <TextInput
                    style={[styles.input, styles.textArea, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="Describe what you need in detail. Include objectives, target audience, and specific deliverables..."
                    placeholderTextColor="#A0AEC0"
                    multiline
                    numberOfLines={4}
                    value={projectDetails}
                    onChangeText={setProjectDetails}
                    onFocus={() => setActiveInput("details")}
                    onBlur={() => setActiveInput(null)}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* ATTACH FILES/BRIEFS */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>ATTACH FILES/BRIEFS</Text>
                <TouchableOpacity 
                  style={[
                    styles.uploadArea, 
                    { 
                      borderColor: isDark ? "#4A5568" : "#CBD5E0",
                      backgroundColor: isDark ? "#1A202C" : "#F8FAFC"
                    }
                  ]}
                  activeOpacity={0.7}
                  onPress={() => triggerHaptic(Haptics.ImpactFeedbackStyle.Light)}
                >
                  <CloudUpload size={28} color={theme.colors.primary} style={{ marginBottom: 8 }} />
                  <Text style={[styles.uploadTextBold, { color: isDark ? "#E2E8F0" : "#1A202C" }]}>
                    Click to upload or drag and drop
                  </Text>
                  <Text style={[styles.uploadTextSub, { color: isDark ? "#A0AEC0" : "#718096" }]}>
                    PDF, DOCX, JPG or PNG
                  </Text>
                  <Text style={[styles.uploadTextSub, { color: isDark ? "#A0AEC0" : "#718096" }]}>
                    (max. 20MB)
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ESTIMATED BUDGET */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>ESTIMATED BUDGET</Text>
                <View style={getInputStyle("budget")}>
                  <Text style={[styles.prefix, { color: isDark ? "#FFFFFF" : "#1A202C" }]}>$</Text>
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="0.00"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="numeric"
                    value={budget}
                    onChangeText={setBudget}
                    onFocus={() => setActiveInput("budget")}
                    onBlur={() => setActiveInput(null)}
                  />
                </View>
              </View>

              {/* TARGET DEADLINE */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>TARGET DEADLINE</Text>
                <View style={getInputStyle("deadline")}>
                  <Calendar size={18} color={isDark ? "#A0AEC0" : "#6B7280"} style={styles.leftIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="mm/dd/yyyy"
                    placeholderTextColor="#A0AEC0"
                    value={deadline}
                    onChangeText={setDeadline}
                    onFocus={() => setActiveInput("deadline")}
                    onBlur={() => setActiveInput(null)}
                  />
                </View>
              </View>

              {/* ADDITIONAL NOTES */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.label, { color: isDark ? "#A0AEC0" : "#6B7280" }]}>ADDITIONAL NOTES (OPTIONAL)</Text>
                <View style={getInputStyle("notes")}>
                  <TextInput
                    style={[styles.input, styles.textArea, { color: isDark ? "#FFFFFF" : "#1A202C" }]}
                    placeholder="Any other details we should know?"
                    placeholderTextColor="#A0AEC0"
                    multiline
                    numberOfLines={3}
                    value={additionalNotes}
                    onChangeText={setAdditionalNotes}
                    onFocus={() => setActiveInput("notes")}
                    onBlur={() => setActiveInput(null)}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Secure Text */}
              <Text style={[styles.secureText, { color: isDark ? "#A0AEC0" : "#4A5568" }]}>
                SkillBridge Secure Payment Protection applies to all requests.
              </Text>

              {/* Send Button */}
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.95}
                onPress={handleSendRequest}
              >
                <Text style={styles.submitText}>Send Request</Text>
                <Send size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </TouchableOpacity>

            </View>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 48 : 20,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 12,
  },
  brandText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconBtn: {
    marginLeft: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
  titleArea: {
    width: "100%",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    width: "100%",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
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
    textTransform: "uppercase",
  },
  inputContainer: {
    width: "100%",
    minHeight: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textAreaContainer: {
    alignItems: "flex-start",
    paddingTop: 16,
    paddingBottom: 16,
  },
  prefix: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  textArea: {
    minHeight: 80,
  },
  uploadArea: {
    width: "100%",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTextBold: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  uploadTextSub: {
    fontSize: 12,
  },
  secureText: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
    lineHeight: 18,
  },
  submitButton: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
});

export default Body1;
