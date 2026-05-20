import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Share2,
  MoreHorizontal,
  BadgeCheck,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import StatCard from "../shared/StatCard";
import ClientTrustCard from "../shared/ClientTrustCard";
import AttachmentCard from "../shared/Attachement";
import Button from "../shared/Button";

const RequestDetails = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const handleAccept = () => {
    Alert.alert(
      "Accept Request",
      "Are you sure you want to accept this request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const handleReject = () => {
    Alert.alert(
      "Reject Request",
      "Are you sure you want to reject this request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 10,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={[
            styles.headerButton,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <ArrowLeft
            size={20}
            color={theme.colors.textPrimary}
            strokeWidth={2}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.semiBold,
            },
          ]}
        >
          Request Details
        </Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.headerButton,
              { backgroundColor: theme.colors.surfaceSecondary },
            ]}
          >
            <Share2
              size={18}
              color={theme.colors.textSecondary}
              strokeWidth={2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.headerButton,
              { backgroundColor: theme.colors.surfaceSecondary },
            ]}
          >
            <MoreHorizontal
              size={18}
              color={theme.colors.textSecondary}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Client Info */}
        <View style={styles.clientSection}>
          <View
            style={[
              styles.clientAvatar,
              { backgroundColor: theme.colors.primaryFaded },
            ]}
          >
            <Text
              style={[
                styles.clientAvatarText,
                {
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              AO
            </Text>
          </View>
          <View style={styles.clientInfo}>
            <Text
              style={[
                styles.clientName,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              Amara Okafor
            </Text>
            <View style={styles.verifiedRow}>
              <BadgeCheck
                size={14}
                color={theme.colors.primary}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.verifiedText,
                  {
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.medium,
                  },
                ]}
              >
                VERIFIED CLIENT
              </Text>
            </View>
          </View>
        </View>

        {/* Brief Section */}
        <View style={styles.section}>
          <View style={styles.briefHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              Full Client Brief
            </Text>
            <Text
              style={[
                styles.receivedDate,
                {
                  color: theme.colors.textLight,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              RECEIVED 2H AGO
            </Text>
          </View>

          <Text
            style={[
              styles.briefText,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
              },
            ]}
          >
            Detailed project description regarding the design of a modern
            fintech app for a Pan-African digital banking startup. The client's
            needs to reflect "Trust", "Speed", and "Innovation".
          </Text>

          <Text
            style={[
              styles.briefText,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.regular,
                marginTop: 12,
              },
            ]}
          >
            Project goals include a primary logo, secondary marks, and a brand
            style guide. Also targeting young entrepreneurs in the sub-Saharan
            region. Deliverables must include vector AI/EPS and web-ready
            assets.
          </Text>
        </View>

        {/* Attachments */}
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
            Attachments
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.attachmentsScroll}
          >
            <AttachmentCard name="Brand_V1.pdf" type="pdf" onPress={() => {}} />
            <AttachmentCard
              name="Inspiration.jpg"
              type="image"
              previewUri="https://picsum.photos/200/140"
              onPress={() => {}}
            />
            <AttachmentCard
              name="Project_Scope.doc"
              type="doc"
              onPress={() => {}}
            />
          </ScrollView>
        </View>

        {/* At a Glance */}
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
            At a Glance
          </Text>

          {/* Budget highlight */}
          <View
            style={[
              styles.budgetCard,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.budgetLabel,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.medium,
                },
              ]}
            >
              Budget
            </Text>
            <Text
              style={[
                styles.budgetAmount,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              GH₵500
            </Text>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              label="Active Jobs"
              value="02"
              icon={
                <Briefcase
                  size={16}
                  color={theme.colors.textSecondary}
                  strokeWidth={2}
                />
              }
            />
            <StatCard
              label="Pending Fees"
              value="01"
              icon={
                <Clock size={16} color={theme.colors.textSecondary} strokeWidth={2} />
              }
            />
          </View>

          <View style={styles.statsGrid}>
            <StatCard
              label="Total Revenue Pool"
              value="$4,850"
              icon={
                <DollarSign
                  size={16}
                  color={theme.colors.textSecondary}
                  strokeWidth={2}
                />
              }
            />
          </View>
        </View>

        {/* Upcoming Deadlines */}
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
            Upcoming Deadlines
          </Text>

          <DeadlineItem
            icon={
              <Calendar
                size={16}
                color={theme.colors.primary}
                strokeWidth={2}
              />
            }
            title="SaaS Strategy"
            subtitle="3-day deadline"
            tags={["Premium", "Active"]}
            theme={theme}
          />
          <DeadlineItem
            icon={
              <Calendar
                size={16}
                color={theme.colors.warning}
                strokeWidth={2}
              />
            }
            title="IKLM Mobile"
            subtitle="5-day deadline"
            tags={["Standard"]}
            theme={theme}
          />
        </View>

        {/* Client Trust */}
        <ClientTrustCard
          rating={4}
          jobsCompleted={12}
          paymentReliability="100%"
          flags={[
            { label: "Tight Deadline", type: "warning" },
            { label: "First-Time Client", type: "info" },
            { label: "Mutual Payment Secured $50,000+", type: "success" },
          ]}
        />

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            onPress={handleReject}
            activeOpacity={0.7}
            style={[
              styles.rejectButton,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Text
              style={[
                styles.rejectText,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              Reject Request
            </Text>
          </TouchableOpacity>

          <Button
            title="Accept Request"
            onPress={handleAccept}
            style={{ flex: 1 }}
            fullWidth={false}
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

// Deadline sub-component
const DeadlineItem = ({
  icon,
  title,
  subtitle,
  tags,
  theme,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tags: string[];
  theme: any;
}) => (
  <View
    style={[
      deadlineStyles.container,
      {
        backgroundColor: theme.colors.surfaceSecondary,
        borderColor: theme.colors.border,
      },
    ]}
  >
    <View
      style={[
        deadlineStyles.iconBox,
        { backgroundColor: theme.colors.primaryFaded },
      ]}
    >
      {icon}
    </View>
    <View style={deadlineStyles.content}>
      <Text
        style={[
          deadlineStyles.title,
          {
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.semiBold,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          deadlineStyles.subtitle,
          {
            color: theme.colors.textLight,
            fontFamily: theme.fonts.regular,
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
    <View style={deadlineStyles.tagsRow}>
      {tags.map((tag) => (
        <View
          key={tag}
          style={[
            deadlineStyles.tag,
            {
              backgroundColor: theme.colors.primaryFaded,
            },
          ]}
        >
          <Text
            style={[
              deadlineStyles.tagText,
              {
                color: theme.colors.primary,
                fontFamily: theme.fonts.medium,
              },
            ]}
          >
            {tag}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

const deadlineStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
  },
});

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
    paddingVertical: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  // Client
  clientSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 14,
  },
  clientAvatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  clientAvatarText: {
    fontSize: 18,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    marginBottom: 4,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  briefHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  receivedDate: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
  briefText: {
    fontSize: 14,
    lineHeight: 22,
  },
  // Attachments
  attachmentsScroll: {
    marginTop: 4,
  },
  // Budget
  budgetCard: {
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  budgetLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  budgetAmount: {
    fontSize: 32,
  },
  // Stats
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  // Actions
  actionSection: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  rejectButton: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectText: {
    fontSize: 15,
  },
});

export default RequestDetails;
