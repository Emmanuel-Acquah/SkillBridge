import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Settings,
  Star,
  MapPin,
  Briefcase,
  Clock,
  Plus,
  Image as ImageIcon,
  FileText,
  Video,
  Shield,
  Calendar,
  Quote,
} from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  startingPrice: string;
}

interface PortfolioItem {
  id: string;
  imageUri: string;
  title?: string;
}

const Profile = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [activePortfolioTab, setActivePortfolioTab] = useState<
    "portfolio" | "files" | "video"
  >("portfolio");

  const skills = ["UI/UX Design", "Product Strategy"];

  const services: Service[] = [
    {
      id: "1",
      icon: (
        <Briefcase size={18} color={theme.colors.primary} strokeWidth={2} />
      ),
      title: "Mobile App Design",
      description:
        "Complete UI/UX for mobile products with wireframes and prototypes",
      startingPrice: "$450",
    },
    {
      id: "2",
      icon: <Star size={18} color={theme.colors.primary} strokeWidth={2} />,
      title: "Brand Identity",
      description: "Professional branding packages and ideas",
      startingPrice: "$800",
    },
    {
      id: "3",
      icon: <FileText size={18} color={theme.colors.primary} strokeWidth={2} />,
      title: "Web Development",
      description: "Responsive landing pages and web apps",
      startingPrice: "$600",
    },
  ];

  const portfolioItems: PortfolioItem[] = [
    { id: "1", imageUri: "https://picsum.photos/200/200?random=1" },
    { id: "2", imageUri: "https://picsum.photos/200/200?random=2" },
    { id: "3", imageUri: "https://picsum.photos/200/200?random=3" },
    { id: "4", imageUri: "https://picsum.photos/200/200?random=4" },
  ];

  const portfolioTabs = [
    { key: "portfolio" as const, label: "Portfolio", icon: ImageIcon },
    { key: "files" as const, label: "Files", icon: FileText },
    { key: "video" as const, label: "Video", icon: Video },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop:
              Platform.OS === "ios" ? insets.top + 4 : insets.top + 10,
            backgroundColor: theme.colors.background,
            borderBottomColor: theme.colors.borderLight,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold },
          ]}
        >
          Skill<Text style={{ color: theme.colors.primary }}>Bridge</Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.settingsBtn,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
          onPress={() =>
            navigation.navigate("(servicescreens)", { screen: "Settings" })
          }
        >
          <Settings
            size={20}
            color={theme.colors.textSecondary}
            strokeWidth={1.8}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar + Name */}
        <View style={styles.profileSection}>
          <View
            style={[styles.avatarRing, { borderColor: theme.colors.primary }]}
          >
            <View
              style={[
                styles.avatar,
                { backgroundColor: theme.colors.primaryFaded },
              ]}
            >
              <Text
                style={[
                  styles.avatarText,
                  { color: theme.colors.primary, fontFamily: theme.fonts.bold },
                ]}
              >
                JD
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.name,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold },
            ]}
          >
            John Doe
          </Text>
          <Text
            style={[
              styles.titleText,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            Senior UI/UX Designer · Brand Strategist
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Star
              size={14}
              color={theme.colors.starRating}
              fill={theme.colors.starRating}
            />
            <Text
              style={[
                styles.ratingText,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              4.8
            </Text>
            <Text
              style={[
                styles.ratingCount,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              (128 Reviews)
            </Text>
          </View>
        </View>

        {/* About Me */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            About Me
          </Text>
          <Text
            style={[
              styles.aboutText,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            Passionate designer with over 8 years of experience crafting
            intuitive digital experiences for startups and Fortune 500
            companies. I specialize in mobile-first design, design systems, and
            mobile ecosystem design for Fintech and SaaS.
          </Text>

          {/* Skills */}
          <View style={styles.skillsRow}>
            {skills.map((skill) => (
              <View
                key={skill}
                style={[
                  styles.skillChip,
                  { backgroundColor: theme.colors.primaryFaded },
                ]}
              >
                <Text
                  style={[
                    styles.skillText,
                    {
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.medium,
                    },
                  ]}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              },
            ]}
          >
            <Briefcase size={16} color={theme.colors.primary} strokeWidth={2} />
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              Experience
            </Text>
            <Text
              style={[
                styles.statValue,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              6+ Years
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              },
            ]}
          >
            <FileText size={16} color={theme.colors.primary} strokeWidth={2} />
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              Completed
            </Text>
            <Text
              style={[
                styles.statValue,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              84 Projects
            </Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.semiBold,
                  marginBottom: 0,
                },
              ]}
            >
              Services I Offer
            </Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.addRow}>
              <Plus size={14} color={theme.colors.primary} strokeWidth={2.5} />
              <Text
                style={[
                  styles.addText,
                  {
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.semiBold,
                  },
                ]}
              >
                Add New Service
              </Text>
            </TouchableOpacity>
          </View>

          {services.map((service) => (
            <View
              key={service.id}
              style={[
                styles.serviceCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.cardBorder,
                  ...Platform.select({
                    ios: {
                      shadowColor: theme.colors.shadow,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.04,
                      shadowRadius: 4,
                    },
                    android: { elevation: 1 },
                  }),
                },
              ]}
            >
              <View
                style={[
                  styles.serviceIcon,
                  { backgroundColor: theme.colors.primaryFaded },
                ]}
              >
                {service.icon}
              </View>
              <View style={styles.serviceContent}>
                <Text
                  style={[
                    styles.serviceName,
                    {
                      color: theme.colors.textPrimary,
                      fontFamily: theme.fonts.semiBold,
                    },
                  ]}
                >
                  {service.title}
                </Text>
                <Text
                  style={[
                    styles.serviceDesc,
                    {
                      color: theme.colors.textLight,
                      fontFamily: theme.fonts.regular,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {service.description}
                </Text>
              </View>
              <View style={styles.servicePrice}>
                <Text
                  style={[
                    styles.priceLabel,
                    {
                      color: theme.colors.textLight,
                      fontFamily: theme.fonts.regular,
                    },
                  ]}
                >
                  Starting at
                </Text>
                <Text
                  style={[
                    styles.priceValue,
                    {
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.bold,
                    },
                  ]}
                >
                  {service.startingPrice}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Portfolio */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            Portfolio & Work
          </Text>

          {/* Tabs */}
          <View
            style={[
              styles.portfolioTabs,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderColor: theme.colors.border,
              },
            ]}
          >
            {portfolioTabs.map((tab) => {
              const isActive = activePortfolioTab === tab.key;
              const Icon = tab.icon;
              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActivePortfolioTab(tab.key)}
                  activeOpacity={0.7}
                  style={[
                    styles.portfolioTab,
                    isActive && { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Icon
                    size={14}
                    color={
                      isActive
                        ? theme.colors.textOnPrimary
                        : theme.colors.textSecondary
                    }
                    strokeWidth={2}
                  />
                  <Text
                    style={[
                      styles.portfolioTabText,
                      {
                        color: isActive
                          ? theme.colors.textOnPrimary
                          : theme.colors.textSecondary,
                        fontFamily: isActive
                          ? theme.fonts.semiBold
                          : theme.fonts.medium,
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Grid */}
          <View style={styles.portfolioGrid}>
            {portfolioItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={styles.portfolioItem}
              >
                <Image
                  source={{ uri: item.imageUri }}
                  style={styles.portfolioImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Verification */}
        <View
          style={[
            styles.verificationCard,
            {
              backgroundColor: theme.colors.successLight,
              borderColor: theme.colors.success,
            },
          ]}
        >
          <View
            style={[
              styles.verificationIcon,
              { backgroundColor: theme.colors.success },
            ]}
          >
            <Shield size={18} color="#FFFFFF" strokeWidth={2} />
          </View>
          <View style={styles.verificationContent}>
            <Text
              style={[
                styles.verificationTitle,
                {
                  color: theme.colors.success,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              Verified
            </Text>
            <Text
              style={[
                styles.verificationDesc,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              Identity verified on May 2021
            </Text>
          </View>
        </View>

        {/* Availability */}
        <View
          style={[
            styles.availabilityCard,
            {
              backgroundColor: theme.colors.primaryFaded,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          <View
            style={[styles.availDot, { backgroundColor: theme.colors.success }]}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.availTitle,
                {
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              Request a Project
            </Text>
            <Text
              style={[
                styles.availDesc,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              Currently available. Usually responds quickly.
            </Text>
          </View>
        </View>

        {/* Request Project Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.requestProjectBtn,
            {
              backgroundColor: theme.colors.primary,
              ...Platform.select({
                ios: {
                  shadowColor: theme.colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                },
                android: { elevation: 6 },
              }),
            },
          ]}
        >
          <Text
            style={[
              styles.requestProjectText,
              {
                color: theme.colors.textOnPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            Request for Verification
          </Text>
        </TouchableOpacity>

        {/* Expert Feedback */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.semiBold,
              },
            ]}
          >
            Expert Feedback
          </Text>

          {/* Rating Big */}
          <View style={styles.feedbackRatingRow}>
            <Text
              style={[
                styles.feedbackScore,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              4.9
            </Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  color={theme.colors.starRating}
                  fill={i <= 4 ? theme.colors.starRating : "transparent"}
                  strokeWidth={2}
                />
              ))}
            </View>
          </View>

          {/* Review Quote */}
          <View
            style={[
              styles.reviewCard,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderLeftColor: theme.colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.reviewText,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              "John's attention to detail is remarkable. He transformed our
              mobile app's experience. We saw a 40% engagement increase and a
              25% reduction in churn. His UX strategy ensured a product that our
              users love."
            </Text>
            <Text
              style={[
                styles.reviewAuthor,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.medium,
                },
              ]}
            >
              — Sarah Jenkins, CEO of TechVentures
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const GRID_GAP = 8;
const GRID_COLS = 2;
const GRID_ITEM_WIDTH =
  (SCREEN_WIDTH - 32 - GRID_GAP * (GRID_COLS - 1)) / GRID_COLS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: 20,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  // Profile
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarRing: {
    width: 92,
    height: 92,
    borderRadius: 32,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 28,
  },
  name: {
    fontSize: 22,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 15,
  },
  ratingCount: {
    fontSize: 13,
  },
  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addText: {
    fontSize: 13,
  },
  // About
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    fontSize: 13,
  },
  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 15,
  },
  // Services
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    marginBottom: 2,
  },
  serviceDesc: {
    fontSize: 12,
  },
  servicePrice: {
    alignItems: "flex-end",
  },
  priceLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
  },
  // Portfolio
  portfolioTabs: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    marginBottom: 14,
  },
  portfolioTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 9,
    gap: 6,
  },
  portfolioTabText: {
    fontSize: 13,
  },
  portfolioGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
  },
  portfolioItem: {
    width: GRID_ITEM_WIDTH,
    height: GRID_ITEM_WIDTH,
    borderRadius: 14,
    overflow: "hidden",
  },
  portfolioImage: {
    width: "100%",
    height: "100%",
  },
  // Verification
  verificationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  verificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  verificationContent: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 14,
  },
  verificationDesc: {
    fontSize: 12,
    marginTop: 1,
  },
  // Availability
  availabilityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
    gap: 12,
  },
  availDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  availTitle: {
    fontSize: 14,
  },
  availDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  // Request Project Button
  requestProjectBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  requestProjectText: {
    fontSize: 16,
  },
  // Feedback
  feedbackRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  feedbackScore: {
    fontSize: 32,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
  },
  reviewCard: {
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 3,
  },
  reviewText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: "italic",
  },
  reviewAuthor: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default Profile;
