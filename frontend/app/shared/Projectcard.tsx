import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ProjectCardProps {
  imageUri: string;
  title: string;
  description: string;
  tags: string[];
  onPress?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUri,
  title,
  description,
  tags,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.cardBorder,
        },
        Platform.select({
          ios: {
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
          },
          android: {
            elevation: 3,
          },
        }),
      ]}
    >
      {/* Project Image */}
      <Image source={{ uri: imageUri }} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.regular,
            },
          ]}
          numberOfLines={2}
        >
          {description}
        </Text>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {tags.map((tag) => (
            <View
              key={tag}
              style={[
                styles.tag,
                {
                  backgroundColor: theme.colors.surfaceSecondary,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  {
                    color: theme.colors.textSecondary,
                    fontFamily: theme.fonts.medium,
                  },
                ]}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 160,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
  },
});

export default ProjectCard;
