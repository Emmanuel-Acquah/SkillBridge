import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Notification = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={{ color: theme.colors.textPrimary }}>Notification</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Notification;
