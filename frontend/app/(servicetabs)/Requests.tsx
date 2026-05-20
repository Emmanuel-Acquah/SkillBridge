import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Inbox } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import Navbar from "../components/NavBar";
import SearchBar from "../shared/SearchBar";
import FilterChips from "../shared/FilterChips";
import RequestCard from "../shared/RequestCard";

const FILTERS = [
  "New",
  "Pending",
  "Accepted",
  "Rejected",
  "High Budget",
  "Urgent",
];

interface Request {
  id: string;
  title: string;
  clientName: string;
  clientAvatar?: string;
  isVerified: boolean;
  service: string;
  budget: string;
  deadline: string;
  timeAgo: string;
  description: string;
  status: "new" | "pending" | "accepted" | "rejected";
  isUrgent: boolean;
  isHighBudget: boolean;
}

const MOCK_REQUESTS: Request[] = [
  {
    id: "1",
    title: "Logo Design + Brand Identity",
    clientName: "Amara Okafor",
    isVerified: true,
    service: "Graphic Design",
    budget: "GH₵500",
    deadline: "5 Days",
    timeAgo: "2 hours ago",
    description:
      "Need a clean and modern logo for a fintech startup that focuses on...",
    status: "new",
    isUrgent: false,
    isHighBudget: false,
  },
  {
    id: "2",
    title: "Social Media Content Strategy",
    clientName: "Kojo Mensah",
    isVerified: false,
    service: "Marketing",
    budget: "GH₵1,200",
    deadline: "7 Days",
    timeAgo: "6 hours ago",
    description:
      "Looking for a comprehensive content calendar and strategy for our real estate...",
    status: "new",
    isUrgent: false,
    isHighBudget: true,
  },
  {
    id: "3",
    title: "E-commerce Website Redesign",
    clientName: "Ama Serwah",
    isVerified: true,
    service: "UI/UX Design",
    budget: "GH₵2,500",
    deadline: "14 Days",
    timeAgo: "1 day ago",
    description:
      "Complete redesign of our online store. Need modern UI with improved checkout flow...",
    status: "pending",
    isUrgent: false,
    isHighBudget: true,
  },
  {
    id: "4",
    title: "Mobile App Onboarding Flow",
    clientName: "Daniel Asante",
    isVerified: true,
    service: "UI/UX Design",
    budget: "GH₵800",
    deadline: "3 Days",
    timeAgo: "4 hours ago",
    description:
      "Design onboarding screens for our health & fitness app. Must be engaging and intuitive...",
    status: "new",
    isUrgent: true,
    isHighBudget: false,
  },
  {
    id: "5",
    title: "Annual Report Design",
    clientName: "GreenTech Ltd",
    isVerified: true,
    service: "Graphic Design",
    budget: "GH₵1,800",
    deadline: "10 Days",
    timeAgo: "2 days ago",
    description:
      "Need a professional annual report layout with infographics and data visualization...",
    status: "accepted",
    isUrgent: false,
    isHighBudget: true,
  },
  {
    id: "6",
    title: "Portfolio Website",
    clientName: "Efua Mensah",
    isVerified: false,
    service: "Web Design",
    budget: "GH₵400",
    deadline: "7 Days",
    timeAgo: "3 days ago",
    description:
      "Simple portfolio website for a photographer. Minimal design with gallery focus...",
    status: "rejected",
    isUrgent: false,
    isHighBudget: false,
  },
];

const Requests = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("New");
  const [refreshing, setRefreshing] = useState(false);

  // Filter counts
  const counts = useMemo(() => {
    const newCount = MOCK_REQUESTS.filter((r) => r.status === "new").length;
    const pendingCount = MOCK_REQUESTS.filter(
      (r) => r.status === "pending",
    ).length;
    const acceptedCount = MOCK_REQUESTS.filter(
      (r) => r.status === "accepted",
    ).length;
    const waitingCount = pendingCount;
    return {
      new: newCount,
      pending: pendingCount,
      accepted: acceptedCount,
      waiting: waitingCount,
    };
  }, []);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    let filtered = MOCK_REQUESTS;

    // Filter by status/type
    switch (activeFilter) {
      case "New":
        filtered = filtered.filter((r) => r.status === "new");
        break;
      case "Pending":
        filtered = filtered.filter((r) => r.status === "pending");
        break;
      case "Accepted":
        filtered = filtered.filter((r) => r.status === "accepted");
        break;
      case "Rejected":
        filtered = filtered.filter((r) => r.status === "rejected");
        break;
      case "High Budget":
        filtered = filtered.filter((r) => r.isHighBudget);
        break;
      case "Urgent":
        filtered = filtered.filter((r) => r.isUrgent);
        break;
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.clientName.toLowerCase().includes(query) ||
          r.service.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Navbar notificationCount={2} />

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
        {/* Title */}
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.bold,
            },
          ]}
        >
          Requests
        </Text>

        {/* Stats Pills */}
        <View style={styles.statsRow}>
          <StatPill
            label="New Requests"
            count={counts.new}
            color={theme.colors.primary}
            theme={theme}
          />
          <StatPill
            label="Waiting"
            count={counts.waiting}
            color={theme.colors.warning}
            theme={theme}
          />
        </View>

        <View style={styles.statsRow}>
          <StatPill
            label="Accepted"
            count={counts.accepted}
            color={theme.colors.success}
            theme={theme}
          />
        </View>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search requests, clients, or projects..."
          showFilter
          onFilterPress={() => {}}
        />

        {/* Filters */}
        <View style={styles.filterContainer}>
          <FilterChips
            filters={FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </View>

        {/* Request Cards */}
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              title={request.title}
              clientName={request.clientName}
              clientAvatar={request.clientAvatar}
              isVerified={request.isVerified}
              service={request.service}
              budget={request.budget}
              deadline={request.deadline}
              timeAgo={request.timeAgo}
              description={request.description}
              isNew={request.status === "new"}
              showActions={request.status === "new"}
              onAccept={() => {}}
              onDecline={() => {}}
              onViewDetails={() =>
                navigation.navigate("(servicescreens)", {
                  screen: "RequestDetails",
                  params: { requestId: request.id },
                })
              }
            />
          ))
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
              No requests found
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
              {searchQuery
                ? "Try adjusting your search or filters"
                : `No ${activeFilter.toLowerCase()} requests at the moment`}
            </Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

// Stat Pill sub-component
const StatPill = ({
  label,
  count,
  color,
  theme,
}: {
  label: string;
  count: number;
  color: string;
  theme: any;
}) => (
  <View
    style={[
      statStyles.container,
      {
        backgroundColor: `${color}10`,
        borderColor: `${color}30`,
      },
    ]}
  >
    <View style={[statStyles.dot, { backgroundColor: color }]} />
    <Text style={[statStyles.count, { color, fontFamily: theme.fonts.bold }]}>
      {count}
    </Text>
    <Text
      style={[
        statStyles.label,
        {
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.medium,
        },
      ]}
    >
      {label}
    </Text>
  </View>
);

const statStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  count: {
    fontSize: 15,
  },
  label: {
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    marginTop: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  filterContainer: {
    marginBottom: 16,
  },
  // Empty state
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

export default Requests;
