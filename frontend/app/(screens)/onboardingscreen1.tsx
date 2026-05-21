import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter, type RelativePathString } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Lock,
  Check,
  Globe,
  Coins,
  CheckCircle2,
  TrendingUp,
} from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

const { width, height } = Dimensions.get("window");

const UnifiedOnboarding = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Load visual assets
  const networkVisual = require("../../assets/images/onboarding_network_visual.png");
  const stairsVisual = require("../../assets/images/onboarding_stairs_visual.png");
  const mobileVisual = require("../../assets/images/welcome_mobile_visual.png");

  // Haptic ticks helper
  // Haptics disabled to prevent vibration/shake on slide navigation
  const triggerHaptic = (_style?: Haptics.ImpactFeedbackStyle) => {};

  // Scroll Listener
  const handleScroll = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);
    if (index !== activeIndex && index >= 0 && index <= 2) {
      setActiveIndex(index);
      triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Scroll to index helper
  const scrollToSlide = (index: number) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: false });
    setActiveIndex(index);
  };

  // Action Buttons
  const handleBack = () => {
    if (activeIndex > 0) {
      scrollToSlide(activeIndex - 1);
    }
  };

  const handleContinue = () => {
    if (activeIndex < 2) {
      scrollToSlide(activeIndex + 1);
    }
  };

  const handleSkip = () => {
    scrollToSlide(2);
  };

  const handleRegister = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/(screens)/roleselection" as RelativePathString);
  };

  const handleLogin = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/(screens)/Login" as RelativePathString);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Top Fixed Header */}
      <View style={styles.header}>
        {activeIndex > 0 ? (
          <TouchableOpacity 
            style={styles.headerBtn} 
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerBtnSpacer} />
        )}

        <Text style={[styles.brandText, { color: theme.colors.primary, fontFamily: Platform.OS === "ios" ? "Georgia" : "serif" }]}>
          SkillBridge
        </Text>

        {activeIndex < 2 ? (
          <TouchableOpacity 
            style={styles.headerBtn}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={[styles.skipText, { color: theme.colors.textSecondary }]}>
              Skip
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerBtnSpacer} />
        )}
      </View>

      {/* Horizontal Paginated Swiper */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* SLIDE 1: DISCOVER PROFESSIONALS */}
        <View style={styles.slideWidth}>
          {/* Visual Container */}
          <View style={styles.visualWrapper}>
            <View style={[styles.visualCard, { backgroundColor: "#060A13" }, theme.shadows.lg]}>
              <Image
                source={networkVisual}
                style={styles.visualImage}
                contentFit="cover"
                transition={200}
              />
              <View style={[styles.badgeContainer, { backgroundColor: isDark ? theme.colors.surfaceSecondary : "#ECEBF6" }]}>
                <View style={[styles.badgeCheck, { backgroundColor: theme.colors.primary }]}>
                  <Check size={10} color="#FFFFFF" strokeWidth={3} />
                </View>
                <Text style={[styles.badgeText, { color: theme.colors.textPrimary }]}>
                  ELITE NETWORK
                </Text>
              </View>
            </View>
          </View>

          {/* Marketing Content */}
          <View style={styles.contentWrapper}>
            <Text style={[styles.headline, { color: theme.colors.textPrimary }]}>
              Discover <Text style={{ color: theme.colors.primary }}>exceptional</Text> skilled professionals
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Connect with the next generation of high-caliber talent. Reliable, vetted, and ready to deliver excellence.
            </Text>
            <View style={styles.featuresRow}>
              <View style={[styles.featureTag, { backgroundColor: isDark ? theme.colors.surfaceSecondary : "#F1EEFA" }]}>
                <ShieldCheck size={16} color={theme.colors.primary} />
                <Text style={[styles.featureText, { color: theme.colors.textPrimary }]}>Vetted</Text>
              </View>
              <View style={[styles.featureTag, { backgroundColor: isDark ? theme.colors.surfaceSecondary : "#F1EEFA" }]}>
                <Lock size={14} color={theme.colors.primary} />
                <Text style={[styles.featureText, { color: theme.colors.textPrimary }]}>Secure</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SLIDE 2: EARN FROM YOUR SKILLS */}
        <View style={styles.slideWidth}>
          {/* Visual Grid Mockup Container */}
          <View style={styles.visualWrapper}>
            <View style={styles.gridContainer}>
              <View style={styles.gridRow}>
                {/* Stairs Card */}
                <View style={[styles.stairsCard, { backgroundColor: "#060A13" }, theme.shadows.lg]}>
                  <Image
                    source={stairsVisual}
                    style={styles.stairsImage}
                    contentFit="cover"
                    transition={200}
                  />
                  <View style={[styles.revTag, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.revTagText}>📈 +24% REV</Text>
                  </View>
                </View>
                {/* Right Stack */}
                <View style={styles.gridCol}>
                  <View style={[styles.miniValueCard, { backgroundColor: isDark ? theme.colors.surface : "#F4F3F9" }]}>
                    <View style={[styles.miniIconBg, { backgroundColor: "#DDF7F6" }]}>
                      <Coins size={16} color="#00A896" />
                    </View>
                    <Text style={[styles.miniValueText, { color: theme.colors.textPrimary }]}>$10k+</Text>
                  </View>
                  <View style={[styles.miniVioletCard, { backgroundColor: theme.colors.primary }]}>
                    <Globe size={18} color="#FFFFFF" style={styles.miniVioletIcon} />
                    <Text style={styles.miniVioletText}>GLOBAL{"\n"}CLIENTS</Text>
                  </View>
                </View>
              </View>
              {/* Lower Wide Tracker Card */}
              <View style={[styles.wideSliderCard, { backgroundColor: isDark ? theme.colors.surface : "#FFFFFF" }, theme.shadows.md]}>
                <View style={styles.sliderHeader}>
                  <View>
                    <Text style={[styles.sliderLabel, { color: theme.colors.textLight }]}>SKILL MATURITY</Text>
                    <Text style={[styles.sliderValueText, { color: theme.colors.textPrimary }]}>Expert</Text>
                  </View>
                  <CheckCircle2 size={18} color="#10B981" fill="#D1FAE5" />
                </View>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderBar, { backgroundColor: "#10B981" }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Marketing Content */}
          <View style={styles.contentWrapper}>
            <Text style={[styles.headline, { color: theme.colors.textPrimary }]}>
              Earn money from <Text style={{ color: theme.colors.primary }}>your skills</Text>
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Join as a freelancer and offer your services to clients worldwide.
            </Text>
            <View style={styles.featuresRow}>
              <View style={[styles.featureTag, { backgroundColor: isDark ? theme.colors.surfaceSecondary : "#F1EEFA" }]}>
                <Globe size={14} color={theme.colors.primary} />
                <Text style={[styles.featureText, { color: theme.colors.textPrimary }]}>Worldwide</Text>
              </View>
              <View style={[styles.featureTag, { backgroundColor: isDark ? theme.colors.surfaceSecondary : "#F1EEFA" }]}>
                <Coins size={14} color={theme.colors.primary} />
                <Text style={[styles.featureText, { color: theme.colors.textPrimary }]}>Escrow Payments</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SLIDE 3: WELCOME TO SKILLBRIDGE */}
        <View style={styles.slideWidth}>
          {/* Smartphone visual */}
          <View style={styles.visualWrapper}>
            <View style={[styles.visualCard, { backgroundColor: "#060A13" }, theme.shadows.lg]}>
              <Image
                source={mobileVisual}
                style={styles.visualImage}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.growthBadge}>
                <TrendingUp size={12} color={theme.colors.primary} />
                <Text style={[styles.growthBadgeText, { color: theme.colors.textPrimary }]}>GROWTH <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>+124%</Text></Text>
              </View>
            </View>
          </View>

          {/* Content & Social Proof */}
          <View style={styles.contentWrapper}>
            <View style={[styles.marketplaceBadge, { backgroundColor: isDark ? theme.colors.surfaceSecondary : "#F1EEFA" }]}>
              <Text style={[styles.marketplaceBadgeText, { color: theme.colors.primary }]}>PREMIER MARKETPLACE</Text>
            </View>

            <Text style={[styles.headline, { color: theme.colors.textPrimary }]}>
              Welcome to SkillBridge
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              The premier marketplace for young professionals and clients. Scale your career or find elite talent.
            </Text>

            {/* Trusted By Row */}
            <View style={styles.trustedRow}>
              <View style={styles.avatarStack}>
                <View style={[styles.avatarCircle, { backgroundColor: "#E9D8FD", zIndex: 3 }]} />
                <View style={[styles.avatarCircle, { backgroundColor: "#FEEBC8", zIndex: 2, marginLeft: -8 }]} />
                <View style={[styles.avatarCircle, { backgroundColor: "#C6F6D5", zIndex: 1, marginLeft: -8 }]} />
              </View>
              <Text style={[styles.trustedText, { color: theme.colors.textSecondary }]}>
                Trusted by 2,000+ Enterprises
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Dynamic Slide Action Controls & Progress Indicators */}
      <View style={styles.footer}>
        {activeIndex < 2 ? (
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: theme.colors.primary }, theme.shadows.purple]}
            activeOpacity={0.9}
            onPress={handleContinue}
          >
            <Text style={styles.ctaText}>Continue</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        ) : (
          <View style={styles.welcomeButtonsContainer}>
            <TouchableOpacity
              style={[styles.ctaButtonPrimary, { backgroundColor: theme.colors.primary }, theme.shadows.purple]}
              activeOpacity={0.95}
              onPress={handleRegister}
            >
              <Text style={styles.ctaText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ctaButtonOutline, { borderColor: isDark ? theme.colors.inputBorder : "#ECE9F6", backgroundColor: isDark ? "#12131A" : "#FFFFFF" }]}
              activeOpacity={0.9}
              onPress={handleLogin}
            >
              <Text style={[styles.outlineBtnText, { color: theme.colors.primary }]}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Dynamic Dot Indicators */}
        <View style={styles.indicatorsRow}>
          <View style={[activeIndex === 0 ? styles.indicatorPill : styles.indicatorDot, { backgroundColor: activeIndex === 0 ? theme.colors.primary : (isDark ? theme.colors.inputBorder : "#ECE9F6") }]} />
          <View style={[activeIndex === 1 ? styles.indicatorPill : styles.indicatorDot, { backgroundColor: activeIndex === 1 ? theme.colors.primary : (isDark ? theme.colors.inputBorder : "#ECE9F6") }]} />
          <View style={[activeIndex === 2 ? styles.indicatorPill : styles.indicatorDot, { backgroundColor: activeIndex === 2 ? theme.colors.primary : (isDark ? theme.colors.inputBorder : "#ECE9F6") }]} />
        </View>
      </View>

      {/* Unified Bottom Progress Track */}
      <View style={[styles.progressTrack, { backgroundColor: isDark ? theme.colors.surfaceSecondary : "#ECE9F6" }]}>
        <View 
          style={[
            styles.progressBar, 
            { 
              backgroundColor: theme.colors.primary,
              width: activeIndex === 0 ? "33.3%" : activeIndex === 1 ? "66.6%" : "100%" 
            }
          ]} 
        />
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
    height: Platform.OS === "android" ? 80 : 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 44 : 20,
  },
  headerBtn: {
    width: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerBtnSpacer: {
    width: 50,
  },
  brandText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
    width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
  },
  slideWidth: {
    width: width,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  visualWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  visualCard: {
    width: "100%",
    height: "100%",
    maxHeight: 330,
    borderRadius: 36,
    overflow: "visible",
    position: "relative",
  },
  visualImage: {
    width: "100%",
    height: "100%",
    borderRadius: 36,
  },
  badgeContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  badgeCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  contentWrapper: {
    width: "100%",
    paddingHorizontal: 32,
    alignItems: "center",
    paddingBottom: 16,
  },
  headline: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 18,
    paddingHorizontal: 6,
  },
  featuresRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  featureTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    gap: 6,
  },
  featureText: {
    fontSize: 13,
    fontWeight: "600",
  },
  gridContainer: {
    width: "100%",
    height: "100%",
    maxHeight: 330,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  gridRow: {
    width: "100%",
    flexDirection: "row",
    height: 210,
    gap: 16,
  },
  stairsCard: {
    flex: 1.1,
    height: "100%",
    borderRadius: 28,
    position: "relative",
    overflow: "hidden",
  },
  stairsImage: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
  },
  revTag: {
    position: "absolute",
    bottom: 14,
    left: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  revTagText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  gridCol: {
    flex: 0.9,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
  },
  miniValueCard: {
    flex: 1,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  miniIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  miniValueText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  miniVioletCard: {
    flex: 1.1,
    borderRadius: 24,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 16,
  },
  miniVioletIcon: {
    marginBottom: 8,
  },
  miniVioletText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    lineHeight: 14,
  },
  wideSliderCard: {
    width: "100%",
    height: 84,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sliderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  sliderValueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderTrack: {
    width: "100%",
    height: 5,
    borderRadius: 100,
    backgroundColor: "#E2E8F0",
  },
  sliderBar: {
    width: "82%",
    height: "100%",
    borderRadius: 100,
  },
  marketplaceBadge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginBottom: 10,
  },
  marketplaceBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  growthBadge: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 100,
    backgroundColor: "#F1EEFA",
    gap: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  growthBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  trustedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  trustedText: {
    fontSize: 12,
    fontWeight: "500",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  welcomeButtonsContainer: {
    width: "100%",
    gap: 12,
    marginBottom: 20,
  },
  ctaButtonPrimary: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonOutline: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  indicatorsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  indicatorPill: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    position: "relative",
  },
  progressBar: {
    height: "100%",
  },
});

export default UnifiedOnboarding;
