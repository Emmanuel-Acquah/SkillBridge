import { Tabs } from "expo-router";
import AnimatedTabBar from "../components/AnimatedToolbar";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Explore" />
      <Tabs.Screen name="Order" />
      <Tabs.Screen name="Reels" />
      <Tabs.Screen name="Profile" />
      {/* Messages is hidden from tab bar but accessible via router.push */}
      <Tabs.Screen name="Messages" options={{ tabBarButton: () => null }} />
    </Tabs>
  );
};

export default TabLayout;
