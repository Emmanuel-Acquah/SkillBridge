import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ToggleSwitchProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

const TRACK_WIDTH = 50;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const TRACK_PADDING = 3;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  description,
  value,
  onToggle,
}) => {
  const { theme } = useTheme();

  const thumbTranslateX = value ? TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2 : 0;

  return (
    <TouchableOpacity
      onPress={() => onToggle(!value)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.medium,
            },
          ]}
        >
          {label}
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
          >
            {description}
          </Text>
        )}
      </View>

      <View
        style={[
          styles.track,
          { backgroundColor: value ? theme.colors.primary : theme.colors.border },
        ]}
      >
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: theme.colors.background,
              transform: [{ translateX: thumbTranslateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 4,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 15,
  },
  description: {
    fontSize: 12,
    marginTop: 2,
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    padding: TRACK_PADDING,
    justifyContent: "center",
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ToggleSwitch;
