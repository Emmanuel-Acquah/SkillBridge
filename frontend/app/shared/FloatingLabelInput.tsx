import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  type TextInputProps,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: object;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  value,
  onFocus,
  onBlur,
  multiline,
  placeholder,
  ...rest
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const isFloating = isFocused || !!value;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const borderColor = error
    ? theme.colors.error
    : isFocused
      ? theme.colors.primary
      : theme.colors.inputBorder;

  const labelColor = error
    ? theme.colors.error
    : isFocused
      ? theme.colors.primary
      : theme.colors.textLight;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity activeOpacity={1} onPress={() => inputRef.current?.focus()}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.inputBackground,
              borderColor,
            },
            multiline && styles.multilineContainer,
          ]}
        >
          {icon && <View style={styles.iconLeft}>{icon}</View>}

          {isFloating && (
            <View
              style={[
                styles.floatingLabelContainer,
                { left: icon ? 40 : 12, backgroundColor: theme.colors.inputBackground },
              ]}
            >
              <Text
                style={[
                  styles.floatingLabel,
                  { color: labelColor, fontFamily: theme.fonts.medium },
                ]}
              >
                {label}
              </Text>
            </View>
          )}

          <TextInput
            ref={inputRef}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline={multiline}
            placeholder={isFloating ? (placeholder ?? "") : (placeholder ?? label)}
            style={[
              styles.input,
              {
                color: theme.colors.inputText,
                fontFamily: theme.fonts.regular,
                paddingLeft: icon ? 44 : 16,
                paddingTop: isFloating ? 14 : 0,
              },
              multiline && styles.multilineInput,
            ]}
            placeholderTextColor={theme.colors.inputPlaceholder}
            selectionColor={theme.colors.primary}
            {...rest}
          />

          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconRight}
              activeOpacity={0.7}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {error && (
        <Text
          style={[
            styles.errorText,
            { color: theme.colors.error, fontFamily: theme.fonts.regular },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 14,
    height: 56,
    position: "relative",
  },
  multilineContainer: {
    height: 120,
    alignItems: "flex-start",
  },
  floatingLabelContainer: {
    position: "absolute",
    top: -10,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  floatingLabel: {
    fontSize: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingRight: 16,
    height: "100%",
  },
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: 20,
  },
  iconLeft: {
    position: "absolute",
    left: 14,
    zIndex: 2,
  },
  iconRight: {
    position: "absolute",
    right: 14,
    zIndex: 2,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default FloatingLabelInput;
