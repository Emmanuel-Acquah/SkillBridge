import { Stack } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

const ScreensLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="notification" />
      <Stack.Screen name="CreatePost" />
      <Stack.Screen name="Settings" />
    </Stack>
  );
};

export default ScreensLayout;
