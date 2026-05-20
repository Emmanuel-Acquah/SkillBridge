import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Inbox,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import FilterChips from "../shared/FilterChips";

interface AcceptedJob {
  id: string;
  requestId: string;
  title: string;
  clientName: string;
  startDate: string;
  deadline: string;
  status: "active" | "starting" | "review" | "completed";
}

const MOCK_JOBS: AcceptedJob[] = [
  {
    id: "1",
    requestId: "#SB-2039",
    title: "UI/UX Mobile App Design",
    clientName: "Kwame Boatman",
    startDate: "May 22",
    deadline: "June 10",
    status: "active",
  },
  {
    id: "2",
    requestId: "#SB-2038",
    title: "Content Strategy for SaaS",
    clientName: "Sarah Jenkins",
    startDate: "May 20",
    deadline: "May 28",
    status: "active",
  },
  {
    id: "3",
    requestId: "#SB-2035",
    title: "Brand Identity Package",
    clientName: "Kojo Mensah",
    startDate: "May 18",
    deadline: "May 30",
    status: "review",
  },
  {
    id: "4",
    requestId: "#SB-2031",
    title: "Landing Page Design",
    clientName: "Ama Serwah",
    startDate: "May 10",
    deadline: "May 20",
    status: "completed",
  },
];

const FILTERS = ["All", "Active", "Starting", "In Review", "Completed"];

const AcceptedRequests = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [activeFilter, setActiveFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const filteredJobs = MOCK_JOBS.filter((job) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return job.status === "active";
    if (activeFilter === "Starting") return job.status === "starting";
    if (activeFilter === "In Review") return job.status === "review";
    if (activeFilter === "Completed") return job.status === "completed";
    return true;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getStatusConfig = (status: AcceptedJob["status"]) => {
    switch (status) {
      case "active":
        return { label: "Active", color: theme.colors.success };
      case "starting":
        return { label: "Starting Soon", color: theme.colors.info };
      case "review":
        return { label: "In Review", color: theme.colors.warning };
      case "completed":
        return { label: "Completed", color: theme.colors.textLight };
    }
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
          Accepted Requests
        </Text>

        <View style={styles.headerButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Filters */}
        <View style={styles.filterContainer}>
          <FilterChips
            filters={FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </View>

        {/* Job Cards */}
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const statusConfig = getStatusConfig(job.status);

            return (
              <View
                key={job.id}
                style={[
                  styles.jobCard,
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
                {/* Top Row: ID + Status */}
                <View style={styles.jobTopRow}>
                  <Text
                    style={[
                      styles.requestId,
                      {
                        color: theme.colors.textLight,
                        fontFamily: theme.fonts.medium,
                      },
                    ]}
                  >
                    {job.requestId}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: `${statusConfig.color}15`,
                        borderColor: `${statusConfig.color}40`,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: statusConfig.color },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: statusConfig.color,
                          fontFamily: theme.fonts.medium,
                        },
                      ]}
                    >
                      {statusConfig.label}
                    </Text>
                  </View>
                </View>

                {/* Title */}
                <Text
                  style={[
                    styles.jobTitle,
                    {
                      color: theme.colors.textPrimary,
                      fontFamily: theme.fonts.semiBold,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {job.title}
                </Text>

                {/* Client */}
                <Text
                  style={[
                    styles.clientName,
                    {
                      color: theme.colors.textSecondary,
                      fontFamily: theme.fonts.regular,
                    },
                  ]}
                >
                  Client: {job.clientName}
                </Text>

                {/* Dates Row */}
                <View style={styles.datesRow}>
                  <View style={styles.dateItem}>
                    <Text
                      style={[
                        styles.dateLabel,
                        {
                          color: theme.colors.textLight,
                          fontFamily: theme.fonts.medium,
                        },
                      ]}
                    >
                      Start Date
                    </Text>
                    <View style={styles.dateValueRow}>
                      <Calendar
                        size={13}
                        color={theme.colors.textSecondary}
                        strokeWidth={2}
                      />
                      <Text
                        style={[
                          styles.dateValue,
                          {
                            color: theme.colors.textPrimary,
                            fontFamily: theme.fonts.semiBold,
                          },
                        ]}
                      >
                        {job.startDate}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateItem}>
                    <Text
                      style={[
                        styles.dateLabel,
                        {
                          color: theme.colors.textLight,
                          fontFamily: theme.fonts.medium,
                        },
                      ]}
                    >
                      Deadline
                    </Text>
                    <View style={styles.dateValueRow}>
                      <Calendar
                        size={13}
                        color={theme.colors.textSecondary}
                        strokeWidth={2}
                      />
                      <Text
                        style={[
                          styles.dateValue,
                          {
                            color: theme.colors.textPrimary,
                            fontFamily: theme.fonts.semiBold,
                          },
                        ]}
                      >
                        {job.deadline}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Open Job Button */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProjectControl", {
                      jobId: job.id,
                    })
                  }
                  activeOpacity={0.7}
                  style={[
                    styles.openJobButton,
                    {
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.openJobText,
                      {
                        color: theme.colors.textOnPrimary,
                        fontFamily: theme.fonts.semiBold,
                      },
                    ]}
                  >
                    Open Job
                  </Text>
                  <ExternalLink
                    size={14}
                    color={theme.colors.textOnPrimary}
                    strokeWidth={2.5}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: theme.colors.surfaceSecondary },
              ]}
            >
              <Inbox
                size={40}
                color={theme.colors.textLight}
                strokeWidth={1.5}
              />
            </View>
            <Text
              style={[
                styles.emptyTitle,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}
            >
              No jobs found
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}
            >
              No {activeFilter.toLowerCase()} jobs at the moment
            </Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  filterContainer: {
    marginBottom: 16,
  },
  // Job Card
  jobCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  jobTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  requestId: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
  },
  jobTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 13,
    marginBottom: 14,
  },
  datesRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 16,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  dateValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateValue: {
    fontSize: 14,
  },
  openJobButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  openJobText: {
    fontSize: 14,
  },
  // Empty
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default AcceptedRequests;
