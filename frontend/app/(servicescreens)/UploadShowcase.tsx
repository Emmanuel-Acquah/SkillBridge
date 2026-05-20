import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Video,
  ImagePlus,
  X,
  Send,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import UploadDropZone from "../shared/Uploaddropzone";
import ChipSelect from "../shared/ChipSelect";
import FloatingLabelInput from "../shared/FloatingLabelInput";
import ToggleSwitch from "../shared/ToogleSwitcher";
import Button from "../shared/Button";

const SERVICE_CATEGORIES = [
  "CV Writing",
  "UI/UX Design",
  "Coding Help",
  "Graphic Design",
  "Tutoring",
  "Thesis Formatting",
  "Presentation Design",
];

interface ThumbnailItem {
  id: string;
  uri: string;
  label?: string;
}

const UploadShowcase = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["CV Writing", "UI/UX Design"]);
  const [videoTitle, setVideoTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [availableForHire, setAvailableForHire] = useState(true);

  const [thumbnails, setThumbnails] = useState<ThumbnailItem[]>([
    { id: "1", uri: "https://picsum.photos/120/160?random=1", label: "Custom Cover" },
    { id: "2", uri: "https://picsum.photos/120/160?random=2" },
    { id: "3", uri: "https://picsum.photos/120/160?random=3" },
  ]);
  const [selectedThumbnail, setSelectedThumbnail] = useState("1");

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleVideoUpload = () => {
    // TODO: expo-image-picker / expo-document-picker
    setVideoUri("selected");
  };

  const handleRemoveThumbnail = (id: string) => {
    setThumbnails((prev) => prev.filter((t) => t.id !== id));
    if (selectedThumbnail === id && thumbnails.length > 1) {
      setSelectedThumbnail(thumbnails[0].id);
    }
  };

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
          style={[styles.headerBtn, { backgroundColor: theme.colors.surfaceSecondary }]}
        >
          <ArrowLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
          Upload Showcase Video
        </Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Video Upload Zone */}
        <UploadDropZone
          onPress={handleVideoUpload}
          title="Drag & Drop Video"
          hint="Select vertical video (30-60s) · MP4, MOV"
          acceptText="Choose File"
        />

        {/* Thumbnail Cover */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]}>
            Thumbnail Cover
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailRow}
          >
            {thumbnails.map((thumb) => {
              const isSelected = selectedThumbnail === thumb.id;
              return (
                <TouchableOpacity
                  key={thumb.id}
                  onPress={() => setSelectedThumbnail(thumb.id)}
                  activeOpacity={0.8}
                  style={[
                    styles.thumbnailCard,
                    {
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      borderWidth: isSelected ? 2.5 : 1,
                    },
                  ]}
                >
                  <Image source={{ uri: thumb.uri }} style={styles.thumbnailImage} />
                  {thumb.label && (
                    <View
                      style={[
                        styles.thumbnailLabel,
                        { backgroundColor: theme.colors.surfaceSecondary },
                      ]}
                    >
                      <ImagePlus size={10} color={theme.colors.textSecondary} strokeWidth={2} />
                      <Text
                        style={[
                          styles.thumbnailLabelText,
                          { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium },
                        ]}
                      >
                        {thumb.label}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Service Category */}
        <View style={styles.section}>
          <ChipSelect
            label="Service Category"
            options={SERVICE_CATEGORIES}
            selectedOptions={selectedCategories}
            onToggle={handleCategoryToggle}
          />
        </View>

        {/* Video Title */}
        <FloatingLabelInput
          label="Video Title"
          value={videoTitle}
          onChangeText={setVideoTitle}
          placeholder="e.g., How I redesigned this scholarship CV"
        />

        {/* Caption */}
        <FloatingLabelInput
          label="Caption"
          value={caption}
          onChangeText={setCaption}
          placeholder="Share the story behind this transformation..."
          multiline
        />

        {/* Available for Hire */}
        <ToggleSwitch
          label="Available for Hire"
          description="Allow users to request services directly from this reel"
          value={availableForHire}
          onToggle={setAvailableForHire}
        />

        {/* Publish Button */}
        <View style={styles.publishContainer}>
          <Button
            title="Publish to SkillReels Feed"
            onPress={() => {}}
            icon={<Send size={16} color={theme.colors.textOnPrimary} strokeWidth={2.5} />}
            iconPosition="right"
          />
        </View>

        {/* Save Draft */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.saveDraftBtn}
        >
          <Text
            style={[
              styles.saveDraftText,
              { color: theme.colors.primary, fontFamily: theme.fonts.semiBold },
            ]}
          >
            Save Draft
          </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
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
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  // Section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 12,
  },
  // Thumbnails
  thumbnailRow: {
    gap: 10,
  },
  thumbnailCard: {
    width: 90,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  thumbnailLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 5,
  },
  thumbnailLabelText: {
    fontSize: 9,
  },
  // Publish
  publishContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  saveDraftBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },
  saveDraftText: {
    fontSize: 15,
  },
});

export default UploadShowcase;
