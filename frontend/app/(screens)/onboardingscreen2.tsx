import React, { useEffect } from "react";
import { useRouter, type RelativePathString } from "expo-router";

const OnboardingScreen2Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect instantly to the unified, fluid swiper
    router.replace("/(screens)/onboardingscreen1" as RelativePathString);
  }, []);

  return null;
};

export default OnboardingScreen2Redirect;
