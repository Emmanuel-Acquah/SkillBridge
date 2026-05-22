import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter, type RelativePathString } from "expo-router";
import {
  ArrowLeft,
  Briefcase,
  UserCog,
  Check,
} from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

const { width } = Dimensions.get("window");

const RoleSelectionScreen = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  
  // Selection state ('client' is default active in mockup screenshot)
  const [selectedRole, setSelectedRole] = useState<"client" | "provider">("client");

  // Load custom role mockups
  const clientVisual = require("../../assets/images/role_client_visual.png");
  const providerVisual = require("../../assets/images/role_provider_visual.png");

  // Select role handler
  const handleSelectRole = (role: "client" | "provider") => {
    if (selectedRole !== role) {
      setSelectedRole(role);
    }
  };

  // Back to welcome screen
  const handleBack = () => {
    router.replace("/(screens)/welcomescreen" as RelativePathString);
  };

  // Continue to Registration Screen
  const handleContinue = () => {
    router.replace("/(screens)/Register" as RelativePathString);
  };

  // Horizontal Swipe Gesture Detection
  const touchStartX = useRef(0);
  const handleTouchStart = (e: any) => {
    touchStartX.current = e.nativeEvent.pageX;
  };
  const handleTouchEnd = (e: any) => {
    const touchEndX = e.nativeEvent.pageX;
    const dx = touchEndX - touchStartX.current;
    if (dx > 60) {
      // Swiped Right -> Back to welcomescreen
      handleBack();
    }
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Top Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.brandText, { color: theme.colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>
          SkillBridge
        </Text>
        
        {/* Balanced Spacer */}
        <View style={styles.spacer} />
      </View>

      {/* Title Header */}
      <View style={styles.titleContainer}>
        <Text style={[styles.headline, { color: theme.colors.textPrimary }]}>
          Choose your role
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Select how you want to experience the SkillBridge ecosystem.
        </Text>
      </View>

      {/* Role Selection Cards Container */}
      <View style={styles.cardsWrapper}>
        
        {/* ROLE A: CLIENT */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            { 
              backgroundColor: isDark ? theme.colors.surface : "#FFFFFF",
              borderColor: selectedRole === "client" ? "#10B981" : (isDark ? theme.colors.inputBorder : "#ECE9F6"),
              borderWidth: selectedRole === "client" ? 2 : 1,
            },
            theme.shadows.md,
          ]}
          activeOpacity={0.9}
          onPress={() => handleSelectRole("client")}
        >
          {/* Green Check Badge Overlay if selected */}
          {selectedRole === "client" && (
            <View style={styles.checkBadge}>
              <Check size={10} color="#FFFFFF" strokeWidth={3} />
            </View>
          )}

          {/* Mint Circular Briefcase Icon */}
          <View style={[styles.iconCircle, { backgroundColor: "#E6FFFA" }]}>
            <Briefcase size={20} color="#10B981" />
          </View>

          <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>
            Client
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
            I want to hire top-tier talent
          </Text>

          {/* Client visual indoor workspace command center */}
          <View style={styles.imageContainer}>
            <Image
              source={clientVisual}
              style={styles.cardImage}
              contentFit="cover"
              transition={200}
            />
          </View>
        </TouchableOpacity>

        {/* ROLE B: SERVICE PROVIDER */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            { 
              backgroundColor: isDark ? theme.colors.surface : "#FFFFFF",
              borderColor: selectedRole === "provider" ? "#10B981" : (isDark ? theme.colors.inputBorder : "#ECE9F6"),
              borderWidth: selectedRole === "provider" ? 2 : 1,
            },
            theme.shadows.md,
          ]}
          activeOpacity={0.9}
          onPress={() => handleSelectRole("provider")}
        >
          {/* Green Check Badge Overlay if selected */}
          {selectedRole === "provider" && (
            <View style={styles.checkBadge}>
              <Check size={10} color="#FFFFFF" strokeWidth={3} />
            </View>
          )}

          {/* Purple Circular UserCog Icon */}
          <View style={[styles.iconCircle, { backgroundColor: "#FAF5FF" }]}>
            <UserCog size={20} color={theme.colors.primary} />
          </View>

          <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>
            Service Provider
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
            I want to offer my expertise
          </Text>

          {/* Service Provider visual laptop mockup */}
          <View style={styles.imageContainer}>
            <Image
              source={providerVisual}
              style={styles.cardImage}
              contentFit="cover"
              transition={200}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: theme.colors.primary }, theme.shadows.purple]}
          activeOpacity={0.95}
          onPress={handleContinue}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </TouchableOpacity>

        <Text style={[styles.finePrint, { color: theme.colors.textSecondary }]}>
          Settings can be adjusted later in your profile.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 48 : 20,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  spacer: {
    width: 40,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 32,
    alignItems: "center",
    paddingTop: 8,
  },
  headline: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  cardsWrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 16,
    paddingVertical: 12,
  },
  roleCard: {
    width: "100%",
    height: width * 0.52,
    borderRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  checkBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 12,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 32,
    alignItems: "center",
    paddingBottom: 24,
  },
  ctaButton: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  finePrint: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default RoleSelectionScreen;
