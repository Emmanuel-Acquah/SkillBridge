import { Stack } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

const ScreensLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: "fade",
      }}
    >
      <Stack.Screen name="Notification" />
      <Stack.Screen name="CreatePost" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="ClientsDashbord" />
      <Stack.Screen name="splashscreen" />
      <Stack.Screen name="onboardingscreen1" />
      <Stack.Screen name="onboardingscreen2" />
      <Stack.Screen name="welcomescreen" />
      <Stack.Screen name="roleselection" />
    </Stack>
  );
};

export default ScreensLayout;
