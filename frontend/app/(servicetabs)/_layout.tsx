import { Tabs } from "expo-router";
import AnimatedTabBar from "../components/AnimatedToolbar";

const ServiceTabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="ServiceDashboard" />
      <Tabs.Screen name="Requests" />
      <Tabs.Screen name="Messages" />
      <Tabs.Screen name="Earnings" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
};

export default ServiceTabLayout;
