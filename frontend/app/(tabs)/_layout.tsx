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
      <Tabs.Screen name="ClientDashboard" />
      <Tabs.Screen name="Explore" />
      <Tabs.Screen name="Messages" />
      <Tabs.Screen name="Reels" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
};

export default TabLayout;
