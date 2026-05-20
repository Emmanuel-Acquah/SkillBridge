import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Upload } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface UploadDropZoneProps {
  onPress: () => void;
  title?: string;
  hint?: string;
  acceptText?: string;
}

const UploadDropZone: React.FC<UploadDropZoneProps> = ({
  onPress,
  title = "Drag and drop your work",
  hint = "Support for high-resolution images, PDF, videos, and links to live portfolios. Max 50MB per file.",
  acceptText = "Browse Files",
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: theme.colors.primaryFaded },
        ]}
      >
        <Upload size={24} color={theme.colors.primary} strokeWidth={1.8} />
      </View>

      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.semiBold,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.hint,
          {
            color: theme.colors.textLight,
            fontFamily: theme.fonts.regular,
          },
        ]}
      >
        {hint}
      </Text>

      <View
        style={[
          styles.browseButton,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.browseText,
            {
              color: theme.colors.textOnPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          {acceptText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    marginBottom: 20,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
  },
  hint: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 18,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  browseText: {
    fontSize: 14,
  },
});

export default UploadDropZone;
