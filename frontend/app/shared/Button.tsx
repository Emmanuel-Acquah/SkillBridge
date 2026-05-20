import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = true,
  style,
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    switch (variant) {
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.primaryFaded;
      case "outline":
        return "transparent";
      case "ghost":
        return "transparent";
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textLight;
    switch (variant) {
      case "primary":
        return theme.colors.textOnPrimary;
      case "secondary":
        return theme.colors.primary;
      case "outline":
        return theme.colors.primary;
      case "ghost":
        return theme.colors.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.border;
    switch (variant) {
      case "outline":
        return theme.colors.primary;
      default:
        return "transparent";
    }
  };

  const getHeight = () => {
    switch (size) {
      case "sm":
        return 40;
      case "md":
        return 48;
      case "lg":
        return 56;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return 13;
      case "md":
        return 15;
      case "lg":
        return 16;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          height: getHeight(),
          width: fullWidth ? "100%" : undefined,
          paddingHorizontal: fullWidth ? 0 : 24,
        },
        variant === "primary" && !disabled && theme.shadows.purple,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontFamily: theme.fonts.semiBold,
                fontSize: getFontSize(),
                marginLeft: icon && iconPosition === "left" ? 8 : 0,
                marginRight: icon && iconPosition === "right" ? 8 : 0,
              },
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1.5,
  },
  text: {
    letterSpacing: 0.3,
  },
});

export default Button;
