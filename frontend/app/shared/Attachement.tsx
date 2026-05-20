import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FileText, Image as ImageIcon } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface AttachmentCardProps {
  name: string;
  type?: "pdf" | "image" | "doc" | "other";
  previewUri?: string;
  onPress?: () => void;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({
  name,
  type = "other",
  previewUri,
  onPress,
}) => {
  const { theme } = useTheme();

  const getIconConfig = () => {
    switch (type) {
      case "pdf":
        return {
          icon: FileText,
          color: theme.colors.error,
          bg: theme.colors.errorLight,
        };
      case "image":
        return {
          icon: ImageIcon,
          color: theme.colors.info,
          bg: theme.colors.infoLight,
        };
      case "doc":
        return {
          icon: FileText,
          color: theme.colors.primary,
          bg: theme.colors.primaryFaded,
        };
      default:
        return {
          icon: FileText,
          color: theme.colors.textSecondary,
          bg: theme.colors.surfaceSecondary,
        };
    }
  };

  const config = getIconConfig();
  const Icon = config.icon;

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
      {previewUri ? (
        <Image source={{ uri: previewUri }} style={styles.preview} />
      ) : (
        <View style={[styles.iconBox, { backgroundColor: config.bg }]}>
          <Icon size={20} color={config.color} strokeWidth={1.8} />
        </View>
      )}
      <Text
        style={[
          styles.name,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.medium,
          },
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 10,
  },
  preview: {
    width: "100%",
    height: 70,
  },
  iconBox: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlign: "center",
  },
});

export default AttachmentCard;
