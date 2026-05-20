import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { X, FileText, ExternalLink } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface FileUploadCardProps {
  name: string;
  description?: string;
  previewUri?: string;
  linkUrl?: string;
  onRemove: () => void;
  onPress?: () => void;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  name,
  description,
  previewUri,
  linkUrl,
  onRemove,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primaryFaded,
          borderColor: theme.colors.primary,
        },
      ]}
    >
      {/* Preview / Icon */}
      {previewUri ? (
        <Image source={{ uri: previewUri }} style={styles.preview} />
      ) : (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <FileText
            size={18}
            color={theme.colors.textOnPrimary}
            strokeWidth={2}
          />
        </View>
      )}

      {/* Info */}
      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
          numberOfLines={1}
        >
          {name}
        </Text>
        {description && (
          <Text
            style={[
              styles.description,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
              },
            ]}
            numberOfLines={1}
          >
            {description}
          </Text>
        )}
        {linkUrl && (
          <View style={styles.linkRow}>
            <ExternalLink
              size={12}
              color={theme.colors.primary}
              strokeWidth={2}
            />
            <Text
              style={[
                styles.linkText,
                {
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.medium,
                },
              ]}
              numberOfLines={1}
            >
              {linkUrl}
            </Text>
          </View>
        )}
      </View>

      {/* Remove */}
      <TouchableOpacity
        onPress={onRemove}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={[
          styles.removeButton,
          { backgroundColor: theme.colors.errorLight },
        ]}
      >
        <X size={14} color={theme.colors.error} strokeWidth={2.5} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  preview: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    marginTop: 1,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  linkText: {
    fontSize: 11,
    flex: 1,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FileUploadCard;
