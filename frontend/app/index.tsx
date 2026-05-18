import { Redirect, type RelativePathString } from "expo-router";

const Index = () => {
  return <Redirect href={"/(tabs)/ClientDashboard" as RelativePathString} />;
};

export default Index;
