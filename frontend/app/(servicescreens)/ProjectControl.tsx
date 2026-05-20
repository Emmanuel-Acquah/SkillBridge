import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  MoreHorizontal,
  Clock,
  Upload,
  CheckSquare,
  Square,
  AlertTriangle,
  FileText,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import WorkflowTimeline from "../shared/WorkflowTimeline";
import EarningsBreakdown from "../shared/EarningsBreakdown";
import Button from "../shared/Button";

interface Requirement {
  id: string;
  text: string;
  completed: boolean;
}

const ProjectControl = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      text: 'Please redesign my CV for a professional role in international consulting applications and optimize my LinkedIn profile for recruiters.',
      completed: true,
    },
    {
      id: "2",
      text: '"Client\'s Mary Whitman to design and format a professional..."',
      completed: false,
    },
    {
      id: "3",
      text: "Dx_start_20...",
      completed: false,
    },
    {
      id: "4",
      text: "LinkedIn_Ref...",
      completed: false,
    },
  ]);

  const toggleRequirement = (id: string) => {
    setRequirements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const timelineSteps = [
    {
      title: "Payment Secured",
      subtitle: "Completed",
      status: "completed" as const,
    },
    {
      title: "Order Accepted",
      subtitle: "25 May 2025 · 8:31 AM",
      status: "completed" as const,
    },
    {
      title: "Work In Progress",
      subtitle: "Current stage",
      status: "current" as const,
    },
    {
      title: "Final Submission",
      subtitle: "",
      status: "upcoming" as const,
    },
    {
      title: "Client Approval",
      subtitle: "",
      status: "upcoming" as const,
    },
  ];

  const earningsItems = [
    { label: "Project Total", value: "GH₵ 250.00" },
    { label: "SkillBridge Fee (15%)", value: "GH₵ 37.50", isDeduction: true },
    { label: "Net Earnings", value: "GH₵ 212.50", isBold: true },
  ];

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
            styles.headerBtn,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <ArrowLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold },
          ]}
        >
          Project Control Center
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.headerBtn,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <MoreHorizontal size={18} color={theme.colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== JOB HEADER CARD ===== */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          {/* ID + Badge */}
          <View style={styles.row}>
            <Text style={[styles.jobId, { color: theme.colors.textLight, fontFamily: theme.fonts.medium }]}>
              #SB-9031
            </Text>
            <View style={[styles.badge, { backgroundColor: `${theme.colors.primary}15`, borderColor: `${theme.colors.primary}40` }]}>
              <Text style={[styles.badgeText, { color: theme.colors.primary, fontFamily: theme.fonts.semiBold }]}>
                In Progress
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            style={[
              styles.jobTitle,
              { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold },
            ]}
          >
            CV Rewrite + LinkedIn Optimization
          </Text>

          {/* Client Row */}
          <View style={styles.clientRow}>
            <View
              style={[styles.clientAvatar, { backgroundColor: theme.colors.primaryFaded }]}
            >
              <Text style={[styles.clientInitial, { color: theme.colors.primary, fontFamily: theme.fonts.bold }]}>
                SJ
              </Text>
            </View>
            <View>
              <Text style={[styles.clientName, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]}>
                Sarah Jenkins
              </Text>
              <Text style={[styles.clientSub, { color: theme.colors.textLight, fontFamily: theme.fonts.regular }]}>
                Writing & Translation · Premium Package
              </Text>
            </View>
          </View>

          {/* Time Left */}
          <View style={styles.timeRow}>
            <View style={styles.timeItem}>
              <Clock size={14} color={theme.colors.textLight} strokeWidth={2} />
              <Text style={[styles.timeLabel, { color: theme.colors.textLight, fontFamily: theme.fonts.regular }]}>
                25 May 2025
              </Text>
            </View>
            <View
              style={[
                styles.timeLeftBadge,
                { backgroundColor: theme.colors.warningLight, borderColor: theme.colors.warning },
              ]}
            >
              <AlertTriangle size={12} color={theme.colors.warning} strokeWidth={2.5} />
              <Text style={[styles.timeLeftText, { color: theme.colors.warning, fontFamily: theme.fonts.semiBold }]}>
                2 Days Left
              </Text>
            </View>
          </View>
        </View>

        {/* ===== PROJECT SUMMARY ===== */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]}>
            Project Summary
          </Text>

          <SummaryRow label="Service" value="Writing & Translation Premium Package" theme={theme} />
          <SummaryRow label="Revisions" value="5 Revisions Left" theme={theme} />
          <SummaryRow label="Purchased At" value="Included in Premium" theme={theme} />
        </View>

        {/* ===== WORKFLOW TIMELINE ===== */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          <WorkflowTimeline steps={timelineSteps} />
        </View>

        {/* ===== CLIENT REQUIREMENTS ===== */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]}>
            Client Requirements
          </Text>

          {requirements.map((req) => (
            <TouchableOpacity
              key={req.id}
              onPress={() => toggleRequirement(req.id)}
              activeOpacity={0.7}
              style={styles.requirementRow}
            >
              {req.completed ? (
                <CheckSquare size={20} color={theme.colors.primary} strokeWidth={2} />
              ) : (
                <Square size={20} color={theme.colors.border} strokeWidth={2} />
              )}
              <Text
                style={[
                  styles.requirementText,
                  {
                    color: req.completed ? theme.colors.textLight : theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                    textDecorationLine: req.completed ? "line-through" : "none",
                  },
                ]}
                numberOfLines={2}
              >
                {req.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== DELIVERABLES ===== */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.cardBorder,
              ...Platform.select({
                ios: { shadowColor: theme.colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 },
              }),
            },
          ]}
        >
          <View style={styles.row}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold, marginBottom: 0 }]}>
              Deliverables
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[styles.uploadLink, { color: theme.colors.primary, fontFamily: theme.fonts.semiBold }]}>
                + Upload Work
              </Text>
            </TouchableOpacity>
          </View>

          {/* Empty Upload State */}
          <View
            style={[
              styles.uploadZone,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={[styles.uploadIcon, { backgroundColor: theme.colors.primaryFaded }]}>
              <Upload size={22} color={theme.colors.primary} strokeWidth={1.8} />
            </View>
            <Text style={[styles.uploadTitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.medium }]}>
              No files uploaded yet
            </Text>
            <Text style={[styles.uploadHint, { color: theme.colors.textLight, fontFamily: theme.fonts.regular }]}>
              Upload your completed work here
            </Text>
          </View>
        </View>

        {/* ===== EARNINGS BREAKDOWN ===== */}
        <EarningsBreakdown items={earningsItems} />

        {/* ===== BOTTOM ACTIONS ===== */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.uploadButton,
              {
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Upload size={16} color={theme.colors.primary} strokeWidth={2.5} />
            <Text
              style={[
                styles.uploadButtonText,
                { color: theme.colors.primary, fontFamily: theme.fonts.semiBold },
              ]}
            >
              Upload Work
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Button
              title="Submit Final"
              onPress={() => {}}
              icon={<FileText size={16} color={theme.colors.textOnPrimary} strokeWidth={2.5} />}
              fullWidth
            />
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

// Summary row sub-component
const SummaryRow = ({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: any;
}) => (
  <View style={summaryStyles.row}>
    <Text style={[summaryStyles.label, { color: theme.colors.textLight, fontFamily: theme.fonts.medium }]}>
      {label}
    </Text>
    <Text
      style={[summaryStyles.value, { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold }]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

const summaryStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 13,
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
  },
});

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
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  // Generic card
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  // Shared
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 14,
  },
  // Job header
  jobId: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
  },
  jobTitle: {
    fontSize: 20,
    marginBottom: 14,
    lineHeight: 26,
  },
  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  clientInitial: {
    fontSize: 15,
  },
  clientName: {
    fontSize: 14,
  },
  clientSub: {
    fontSize: 12,
    marginTop: 1,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeLabel: {
    fontSize: 13,
  },
  timeLeftBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeLeftText: {
    fontSize: 12,
  },
  // Requirements
  requirementRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
  },
  requirementText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  // Deliverables
  uploadLink: {
    fontSize: 13,
  },
  uploadZone: {
    alignItems: "center",
    paddingVertical: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: "dashed",
    marginTop: 12,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  uploadHint: {
    fontSize: 12,
  },
  // Bottom actions
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  uploadButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
  },
});

export default ProjectControl;
