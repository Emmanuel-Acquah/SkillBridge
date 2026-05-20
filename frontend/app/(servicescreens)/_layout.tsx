import { Stack } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

const ServiceScreensLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="RequestDetails" />
      <Stack.Screen name="AcceptedRequests" />
      <Stack.Screen name="ProjectControl" />
      <Stack.Screen name="WidthdrawFunds"/>
      <Stack.Screen name="UploadShowcase"/>
    </Stack>
  );
};

export default ServiceScreensLayout;
