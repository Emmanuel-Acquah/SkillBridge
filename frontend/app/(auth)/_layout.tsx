import { Stack } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

const AuthLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Register" />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="OnboardService" />
      <Stack.Screen name="CompleteProfile" />
      <Stack.Screen name="AddServices" />
      <Stack.Screen name="SetPricing" />
      <Stack.Screen name="UploadPortfolio" />
      <Stack.Screen name="RoleSelection" />
    </Stack>
  );
};

export default AuthLayout;
