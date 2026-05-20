import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ImagePickerButtonProps {
  imageUri?: string;
  onPress: () => void;
  label?: string;
  hint?: string;
}

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  imageUri,
  onPress,
  label = "Profile Image",
  hint = "Upload a professional photo. JPG, PNG or WEBP",
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.picker,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            borderColor: theme.colors.border,
          },
        ]}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: theme.colors.primaryFaded },
              ]}
            >
              <Camera
                size={28}
                color={theme.colors.primary}
                strokeWidth={1.8}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>

      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.semiBold,
          },
        ]}
      >
        {label}
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

      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text
          style={[
            styles.chooseText,
            {
              color: theme.colors.primary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          Choose file
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 24,
  },
  picker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: "dashed",
    overflow: "hidden",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },
  chooseText: {
    fontSize: 14,
  },
});

export default ImagePickerButton;
