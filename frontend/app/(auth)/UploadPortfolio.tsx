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
import { ArrowLeft, X, Link, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

import StepIndicator from "../shared/StepIndicator";
import UploadDropZone from "../shared/Uploaddropzone";
import FileUploadCard from "../shared/Fileuploadcard";
import FloatingLabelInput from "../shared/FloatingLabelInput";
import ProjectCard from "../shared/Projectcard";
import Button from "../shared/Button";

interface UploadedFile {
  id: string;
  name: string;
  description?: string;
  previewUri?: string;
  linkUrl?: string;
}

interface FeaturedProject {
  imageUri: string;
  title: string;
  description: string;
  tags: string[];
}

const UploadPortfolio = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const router = useRouter();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: "1", name: "SkillBrideTM", description: "A UI presentation/media/link for this creative..." },
  ]);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([
    {
      imageUri: "https://picsum.photos/400/200",
      title: "Fintech Ecosystem Design",
      description: "A comprehensive redesign for a national banking platform focusing on accessibility and seamless transactions for over 2M users.",
      tags: ["UI Design", "Prototyping", "Research"],
    },
  ]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTags, setProjectTags] = useState("");

  const handleFilePick = () => {
    const mockFile: UploadedFile = {
      id: `file_${Date.now()}`,
      name: `Portfolio_${uploadedFiles.length + 1}.pdf`,
      description: "Uploaded file",
    };
    setUploadedFiles((prev) => [...prev, mockFile]);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAddLink = () => {
    if (!linkTitle.trim() || !linkUrl.trim()) return;
    const newFile: UploadedFile = {
      id: `link_${Date.now()}`,
      name: linkTitle.trim(),
      linkUrl: linkUrl.trim(),
    };
    setUploadedFiles((prev) => [...prev, newFile]);
    setLinkTitle("");
    setLinkUrl("");
    setShowLinkModal(false);
  };

  const handleAddProject = () => {
    if (!projectTitle.trim()) return;
    const newProject: FeaturedProject = {
      imageUri: "https://picsum.photos/400/200?random=" + Date.now(),
      title: projectTitle.trim(),
      description: projectDescription.trim(),
      tags: projectTags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    setFeaturedProjects((prev) => [...prev, newProject]);
    setProjectTitle("");
    setProjectDescription("");
    setProjectTags("");
    setShowProjectModal(false);
  };

  const handleDone = () => {
    router.replace("/(servicetabs)/ServiceDashboard");
  };

  const modalShadow = Platform.select({
    ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 20 },
    android: { elevation: 10 },
  });

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

        <StepIndicator currentStep={4} totalSteps={4} />

        <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
          Upload Your Portfolio
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
          Final step! Showcase your best work to attract clients and stand out. Quality portfolios lead to 4x higher booking rates.
        </Text>

        <UploadDropZone onPress={handleFilePick} />

        {uploadedFiles.map((file) => (
          <FileUploadCard
            key={file.id}
            name={file.name}
            description={file.description}
            previewUri={file.previewUri}
            linkUrl={file.linkUrl}
            onRemove={() => handleRemoveFile(file.id)}
          />
        ))}

        <TouchableOpacity
          onPress={() => setShowLinkModal(true)}
          activeOpacity={0.7}
          style={[styles.addLinkButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
        >
          <Link size={16} color={theme.colors.primary} strokeWidth={2} />
          <Text style={[styles.addLinkText, { color: theme.colors.primary, fontFamily: theme.fonts.semiBold }]}>
            Add Showcase Video
          </Text>
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]}>
            Featured Project
          </Text>
          <TouchableOpacity onPress={() => setShowProjectModal(true)} activeOpacity={0.7}>
            <Text style={[styles.changeText, { color: theme.colors.primary, fontFamily: theme.fonts.semiBold }]}>
              + Change Selection
            </Text>
          </TouchableOpacity>
        </View>

        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            imageUri={project.imageUri}
            title={project.title}
            description={project.description}
            tags={project.tags}
          />
        ))}

        <View style={styles.buttonContainer}>
          <Button title="Done" onPress={handleDone} />
        </View>
      </KeyboardAwareScrollView>

      {/* Add Link Modal */}
      <Modal
        visible={showLinkModal}
        transparent
        animationType={Platform.OS === "ios" ? "slide" : "fade"}
        statusBarTranslucent
        onRequestClose={() => setShowLinkModal(false)}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableOpacity
            style={[styles.modalOverlay, { backgroundColor: theme.colors.overlay }]}
            activeOpacity={1}
            onPress={() => setShowLinkModal(false)}
          >
            <View
              style={[styles.modalContent, { backgroundColor: theme.colors.background, ...modalShadow }]}
              onStartShouldSetResponder={() => true}
            >
              {Platform.OS === "ios" && (
                <View style={[styles.modalHandle, { backgroundColor: theme.colors.border }]} />
              )}
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
                  Add Link
                </Text>
                <TouchableOpacity
                  onPress={() => setShowLinkModal(false)}
                  activeOpacity={0.7}
                  style={[styles.modalClose, { backgroundColor: theme.colors.surfaceSecondary }]}
                >
                  <X size={18} color={theme.colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>
              <FloatingLabelInput label="Title" value={linkTitle} onChangeText={setLinkTitle} />
              <FloatingLabelInput
                label="URL"
                value={linkUrl}
                onChangeText={setLinkUrl}
                placeholder="https://"
                keyboardType="url"
                autoCapitalize="none"
              />
              <Button title="Add Link" onPress={handleAddLink} disabled={!linkTitle.trim() || !linkUrl.trim()} />
              <View style={{ height: Platform.OS === "ios" ? 20 : 10 }} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add Project Modal */}
      <Modal
        visible={showProjectModal}
        transparent
        animationType={Platform.OS === "ios" ? "slide" : "fade"}
        statusBarTranslucent
        onRequestClose={() => setShowProjectModal(false)}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableOpacity
            style={[styles.modalOverlay, { backgroundColor: theme.colors.overlay }]}
            activeOpacity={1}
            onPress={() => setShowProjectModal(false)}
          >
            <View
              style={[styles.modalContent, { backgroundColor: theme.colors.background, ...modalShadow }]}
              onStartShouldSetResponder={() => true}
            >
              {Platform.OS === "ios" && (
                <View style={[styles.modalHandle, { backgroundColor: theme.colors.border }]} />
              )}
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
                  Add Featured Project
                </Text>
                <TouchableOpacity
                  onPress={() => setShowProjectModal(false)}
                  activeOpacity={0.7}
                  style={[styles.modalClose, { backgroundColor: theme.colors.surfaceSecondary }]}
                >
                  <X size={18} color={theme.colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>
              <FloatingLabelInput label="Project Title" value={projectTitle} onChangeText={setProjectTitle} />
              <FloatingLabelInput label="Description" value={projectDescription} onChangeText={setProjectDescription} multiline />
              <FloatingLabelInput
                label="Tags (comma separated)"
                value={projectTags}
                onChangeText={setProjectTags}
                placeholder="UI Design, Prototyping, Research"
              />
              <Button title="Add Project" onPress={handleAddProject} disabled={!projectTitle.trim()} />
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
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  addLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: "dashed",
    marginTop: 4,
    gap: 8,
  },
  addLinkText: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
  },
  changeText: {
    fontSize: 13,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 20,
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

export default UploadPortfolio;
