import React, { useEffect } from "react";
import { StyleSheet, View, Text, Platform, StatusBar } from "react-native";
import { useRouter, type RelativePathString } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const SplashScreen = () => {
  const router = useRouter();

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85);
  const glowScale = useSharedValue(0.4);
  const glowOpacity = useSharedValue(0);
  const contentFadeOut = useSharedValue(1);

  // Haptics disabled to avoid vibration/shake on startup
  const triggerHaptic = () => {};

  // Navigate to the onboarding flow
  const navigateToNext = () => {
    router.replace("/(screens)/onboardingscreen1" as RelativePathString);
  };

  useEffect(() => {
    // 1. Fade in and scale the ambient glow
    glowOpacity.value = withTiming(0.45, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    glowScale.value = withTiming(1.3, {
      duration: 1500,
      easing: Easing.out(Easing.ease),
    });

    // 2. Fade in and scale the logo text (slight delay)
    logoOpacity.value = withDelay(
      300,
      withTiming(1, {
        duration: 900,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      })
    );

    logoScale.value = withDelay(
      300,
      withTiming(
        1,
        {
          duration: 1000,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }
      )
    );

    // 3. Smooth exit transition
    contentFadeOut.value = withDelay(
      2200,
      withTiming(
        0,
        {
          duration: 600,
          easing: Easing.bezier(0.33, 1, 0.68, 1),
        },
        () => {
          // Transition to the onboarding flow
          runOnJS(navigateToNext)();
        }
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animated styles
  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
      transform: [{ scale: glowScale.value }],
    };
  });

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });

  const mainContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: contentFadeOut.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9FC" />

      <Animated.View style={[styles.mainWrapper, mainContainerStyle]}>
        {/* Soft Ambient Background Glow */}
        <Animated.View style={[styles.ambientGlow, animatedGlowStyle]} />

        {/* Elegant Serif Logo */}
        <Animated.View style={animatedLogoStyle}>
          <Text style={styles.logoText}>SkillBridge</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FC", // Soft violet/off-white background matching the brand mockup
    alignItems: "center",
    justifyContent: "center",
  },
  mainWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  ambientGlow: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#7C3AED", // Royal purple glow
    opacity: 0,
    filter: Platform.OS === "web" ? "blur(80px)" : undefined, // Web blur filter
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4C00A4", // Deep rich purple violet matching your exact logo color
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif", // Renders premium, high-end serif styling on both mobile platforms
    letterSpacing: -0.5,
  },
});

export default SplashScreen;
