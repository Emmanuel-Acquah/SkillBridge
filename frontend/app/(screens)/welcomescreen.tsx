import React, { useEffect } from "react";
import { useRouter, type RelativePathString } from "expo-router";

const WelcomeScreenRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect instantly to the unified, fluid swiper
    router.replace("/(screens)/onboardingscreen1" as RelativePathString);
  }, []);

  return null;
};

export default WelcomeScreenRedirect;
