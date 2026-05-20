import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Plus, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import StepIndicator from "../shared/StepIndicator";
import ServiceCheckItem from "../shared/Servicecheckitem";
import FloatingLabelInput from "../shared/FloatingLabelInput";
import Button from "../shared/Button";

const DEFAULT_SERVICES = [
  { id: "cv", title: "CV Writing", description: "Professional resumes and cover letters" },
  { id: "graphic", title: "Graphic Design", description: "Logos, branding, and visual content" },
  { id: "uiux", title: "UI/UX Design", description: "Mobile and web interface design" },
  { id: "coding", title: "Coding Help", description: "Debugging, scripts, full-stack dev assistance" },
  { id: "tutoring", title: "Tutoring", description: "Academic guidance and mentoring sessions" },
  { id: "thesis", title: "Thesis Formatting", description: "Ensuring proper standards and styling" },
  { id: "presentation", title: "Presentation Design", description: "High-impact slides and visual delivery" },
  { id: "social", title: "Social Media Management", description: "Content strategy and community building" },
];

const AddServices = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customServices, setCustomServices] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");

  const allServices = [...DEFAULT_SERVICES, ...customServices];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleAddCustom = () => {
    if (!customTitle.trim()) return;
    const newService = {
      id: `custom_${Date.now()}`,
      title: customTitle.trim(),
      description: customDescription.trim() || "Custom service",
    };
    setCustomServices((prev) => [...prev, newService]);
    setSelectedServices((prev) => [...prev, newService.id]);
    setCustomTitle("");
    setCustomDescription("");
    setShowModal(false);
  };

  const handleNext = () => {
    navigation.navigate("SetPricing");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 10 },
        ]}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={[styles.backButton, { backgroundColor: theme.colors.surfaceSecondary }]}
          >
            <ArrowLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
            Skill<Text style={{ color: theme.colors.primary }}>Bridge</Text>
          </Text>
          <View style={styles.backButton} />
        </View>

        <StepIndicator currentStep={2} totalSteps={4} />

        <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
          Add Your Services
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
          Select the types of services you want to offer on SkillBridge. You can select multiple or add a custom service.
        </Text>

        {allServices.map((service) => (
          <ServiceCheckItem
            key={service.id}
            title={service.title}
            description={service.description}
            checked={selectedServices.includes(service.id)}
            onToggle={() => toggleService(service.id)}
          />
        ))}

        <TouchableOpacity
          onPress={() => setShowModal(true)}
          activeOpacity={0.7}
          style={[styles.addCustom, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
        >
          <View style={[styles.addIconCircle, { backgroundColor: theme.colors.primaryFaded }]}>
            <Plus size={20} color={theme.colors.primary} strokeWidth={2.5} />
          </View>
          <Text style={[styles.addCustomText, { color: theme.colors.primary, fontFamily: theme.fonts.semiBold }]}>
            Add Custom Service
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNext} disabled={selectedServices.length === 0} />
        </View>
      </KeyboardAwareScrollView>

      {/* Custom Service Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType={Platform.OS === "ios" ? "slide" : "fade"}
        statusBarTranslucent
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity
            style={[styles.modalOverlay, { backgroundColor: theme.colors.overlay }]}
            activeOpacity={1}
            onPress={() => setShowModal(false)}
          >
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: theme.colors.background,
                  ...Platform.select({
                    ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 20 },
                    android: { elevation: 10 },
                  }),
                },
              ]}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
                  Add Custom Service
                </Text>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  activeOpacity={0.7}
                  style={[styles.modalClose, { backgroundColor: theme.colors.surfaceSecondary }]}
                >
                  <X size={18} color={theme.colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {Platform.OS === "ios" && (
                <View style={[styles.modalHandle, { backgroundColor: theme.colors.border }]} />
              )}

              <FloatingLabelInput
                label="Service Name"
                value={customTitle}
                onChangeText={setCustomTitle}
              />
              <FloatingLabelInput
                label="Brief Description"
                value={customDescription}
                onChangeText={setCustomDescription}
                multiline
              />
              <Button title="Add Service" onPress={handleAddCustom} disabled={!customTitle.trim()} />
              <View style={{ height: Platform.OS === "ios" ? 20 : 10 }} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  addCustom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: "dashed",
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 16,
    gap: 10,
  },
  addIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addCustomText: {
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 16,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: -8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddServices;
