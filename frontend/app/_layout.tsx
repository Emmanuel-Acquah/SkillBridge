import { Stack } from "expo-router";
import { ThemeProvider } from "./contexts/ThemeContext";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="index"
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(screens)" options={{ presentation: "card" }} />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(servicetabs)" />
        <Stack.Screen name="(servicescreens)" />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
