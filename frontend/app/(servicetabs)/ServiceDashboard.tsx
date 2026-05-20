import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Plus,
  Send,
  ArrowDownToLine,
  MessageSquare,
  FileText,
  CreditCard,
  CheckCircle,
  UserPlus,
} from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";

// Shared Components
import Navbar from "../components/NavBar";
import EarningsCard from "../shared/Earningcard";
import QuickActions from "../shared/QuickActions";
import SectionHeader from "../shared/SectionHeader";
import ActiveJobCard from "../shared/ActiveJobCard";
import RequestCard from "../shared/RequestCard";
import ReputationCard from "../shared/ReputationCard";
import PerformanceMetrics from "../shared/PerformanceMetrics";
import ActivityItem from "../shared/ActivityItem";

const ServiceDashboard = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  // Quick action items
  const quickActions = [
    {
      icon: <Plus size={22} color={theme.colors.primary} strokeWidth={2} />,
      label: "Add\nService",
      onPress: () => {},
    },
    {
      icon: <Send size={22} color={theme.colors.primary} strokeWidth={2} />,
      label: "Submit\nWork",
      onPress: () => {},
    },
    {
      icon: (
        <ArrowDownToLine
          size={22}
          color={theme.colors.primary}
          strokeWidth={2}
        />
      ),
      label: "Withdraw",
      onPress: () => {},
    },
    {
      icon: <FileText size={22} color={theme.colors.primary} strokeWidth={2} />,
      label: "Requests",
      onPress: () => {},
    },
    {
      icon: (
        <MessageSquare size={22} color={theme.colors.primary} strokeWidth={2} />
      ),
      label: "Messages",
      onPress: () => {},
    },
  ];

  // Performance metrics data
  const metrics = [
    { label: "Completion", value: "96%", color: theme.colors.success },
    { label: "Response", value: "< 1hr", color: theme.colors.primary },
    { label: "Satisfaction", value: "98%", color: theme.colors.success },
    { label: "Repeat Rate", value: "15%", color: theme.colors.warning },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Navbar notificationCount={3} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome */}
        <View style={styles.welcomeRow}>
          <View>
            <Text
              style={[
                styles.welcomeText,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              Welcome back,
            </Text>
            <Text
              style={[
                styles.userName,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                },
              ]}
            >
              NuCkrifa 👋
            </Text>
          </View>
        </View>

        {/* Earnings Card */}
        <EarningsCard
          totalEarnings="GH₵4,500"
          availableBalance="GH₵2,250"
          pendingEscrow="GH₵1,500"
          onWithdraw={() => {}}
        />

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Active Jobs */}
        <SectionHeader
          title="Active Jobs"
          count={3}
          actionLabel="View All"
          onAction={() => {}}
        />

        <ActiveJobCard
          title="UI Design for Fintech"
          client="Amara Okafor"
          progress={65}
          status="In Progress"
          dueText="Due in 2 Days"
          onAction={() =>
            navigation.navigate("(servicescreens)", {
              screen: "ProjectControl",
            })
          }
        />

        <ActiveJobCard
          title="Mobile App Audit"
          client="TechCorp Inc."
          progress={30}
          status="In Progress"
          actionLabel="Resume"
          onAction={() => {}}
        />

        {/* New Requests */}
        <SectionHeader
          title="New Requests"
          count={5}
          actionLabel="View Requests"
          onAction={() => {}}
        />

        <RequestCard
          title="Brand Identity Refresh"
          clientName="Kojo Mensah"
          budget="GH₵1,200"
          service="Branding"
          deadline="1 week"
          isNew
          showActions
          onAccept={() => {}}
          onDecline={() => {}}
        />

        <RequestCard
          title="Social Media Content Strategy"
          clientName="Kojo Mensah"
          budget="GH₵1,200"
          service="Marketing"
          deadline="7 Days"
          timeAgo="6 hours ago"
          description="Looking for a comprehensive content calendar and strategy for our real estate..."
          onViewDetails={() =>
            navigation.navigate("(servicescreens)", {
              screen: "RequestDetails",
            })
          }
        />

        {/* Reputation */}
        <ReputationCard
          score={4.8}
          totalReviews={24}
          reviewQuote="NuCkrifa is exceptional. The UI design surpassed our expectations and the communication was top-tier."
          reviewAuthor="Sarah B., Fintech Global"
        />

        {/* Performance */}
        <PerformanceMetrics metrics={metrics} />

        {/* Recent Activity */}
        <SectionHeader title="Recent Activity" />

        <View
          style={[
            styles.activityContainer,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: {
                  shadowColor: theme.colors.shadow,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          <ActivityItem
            icon={
              <CreditCard
                size={18}
                color={theme.colors.success}
                strokeWidth={2}
              />
            }
            iconBgColor={theme.colors.successLight}
            title={`Payment released for ${" "}`}
            subtitle="Yesterday"
            timestamp=""
          />

          {/* Custom activity with bold text */}
          <View style={styles.activityCustom}>
            <View
              style={[
                styles.activityIcon,
                { backgroundColor: theme.colors.successLight },
              ]}
            >
              <CreditCard
                size={18}
                color={theme.colors.success}
                strokeWidth={2}
              />
            </View>
            <View style={styles.activityContent}>
              <Text
                style={[
                  styles.activityText,
                  {
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
              >
                Payment released for{" "}
                <Text style={{ fontFamily: theme.fonts.semiBold }}>
                  Mobile Landing Page
                </Text>
              </Text>
              <Text
                style={[
                  styles.activityTime,
                  {
                    color: theme.colors.textLight,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
              >
                Yesterday
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.activityDivider,
              { backgroundColor: theme.colors.borderLight },
            ]}
          />

          <View style={styles.activityCustom}>
            <View
              style={[
                styles.activityIcon,
                { backgroundColor: theme.colors.primaryFaded },
              ]}
            >
              <UserPlus
                size={18}
                color={theme.colors.primary}
                strokeWidth={2}
              />
            </View>
            <View style={styles.activityContent}>
              <Text
                style={[
                  styles.activityText,
                  {
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
              >
                New request received from{" "}
                <Text style={{ fontFamily: theme.fonts.semiBold }}>
                  Kojo Mensah
                </Text>
              </Text>
              <Text
                style={[
                  styles.activityTime,
                  {
                    color: theme.colors.textLight,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
              >
                3 hours ago
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.activityDivider,
              { backgroundColor: theme.colors.borderLight },
            ]}
          />

          <View style={styles.activityCustom}>
            <View
              style={[
                styles.activityIcon,
                { backgroundColor: theme.colors.successLight },
              ]}
            >
              <CheckCircle
                size={18}
                color={theme.colors.success}
                strokeWidth={2}
              />
            </View>
            <View style={styles.activityContent}>
              <Text
                style={[
                  styles.activityText,
                  {
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
              >
                Work approved for{" "}
                <Text style={{ fontFamily: theme.fonts.semiBold }}>
                  Amara Okafor
                </Text>
              </Text>
              <Text
                style={[
                  styles.activityTime,
                  {
                    color: theme.colors.textLight,
                    fontFamily: theme.fonts.regular,
                  },
                ]}
              >
                Yesterday
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
  },
  userName: {
    fontSize: 22,
    marginTop: 2,
  },
  // Activity section
  activityContainer: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  activityCustom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 13,
    lineHeight: 18,
  },
  activityTime: {
    fontSize: 11,
    marginTop: 2,
  },
  activityDivider: {
    height: 1,
    marginLeft: 52,
  },
});

export default ServiceDashboard;
