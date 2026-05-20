import { Redirect, type RelativePathString } from "expo-router";

const Index = () => {
  return <Redirect href={"/(tabs)/Home" as RelativePathString} />;
};

export default Index;
