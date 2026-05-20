import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, DollarSign } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import StepIndicator from "../shared/StepIndicator";
import PricingTabSelector from "../shared/PricingTabselector";
import FloatingLabelInput from "../shared/FloatingLabelInput";
import CounterInput from "../shared/Counterinput";
import ToggleSwitch from "../shared/ToogleSwitcher";
import InfoCard from "../shared/Infocard";
import Button from "../shared/Button";

type PricingTier = "Basic" | "Standard" | "Premium";

interface TierPricing {
  price: string;
  revisions: number;
  deliveryDays: number;
  sourceFile: boolean;
  commercial: boolean;
}

const DEFAULT_TIER: TierPricing = {
  price: "",
  revisions: 2,
  deliveryDays: 3,
  sourceFile: false,
  commercial: false,
};

const SetPricing = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [activeTier, setActiveTier] = useState<PricingTier>("Basic");
  const [pricing, setPricing] = useState<Record<PricingTier, TierPricing>>({
    Basic: { ...DEFAULT_TIER },
    Standard: { ...DEFAULT_TIER, revisions: 4, deliveryDays: 5 },
    Premium: { ...DEFAULT_TIER, revisions: 6, deliveryDays: 7, sourceFile: true, commercial: true },
  });

  const currentTier = pricing[activeTier];

  const updateTier = (field: keyof TierPricing, value: any) => {
    setPricing((prev) => ({
      ...prev,
      [activeTier]: { ...prev[activeTier], [field]: value },
    }));
  };

  const handleNext = () => {
    navigation.navigate("UploadPortfolio");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 10 },
        ]}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={[styles.backButton, { backgroundColor: theme.colors.surfaceSecondary }]}
          >
            <ArrowLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
            Skill<Text style={{ color: theme.colors.primary }}>Bridge</Text>
          </Text>
          <View style={styles.backButton} />
        </View>

        <StepIndicator currentStep={3} totalSteps={4} />

        <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold }]}>
          Set Your Pricing
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
          Configure your packages for your services. High-quality pricing structures help clients choose the right tier.
        </Text>

        <PricingTabSelector
          tabs={["Basic", "Standard", "Premium"]}
          activeTab={activeTier}
          onTabChange={(tab) => setActiveTier(tab as PricingTier)}
        />

        <FloatingLabelInput
          label="Price"
          value={currentTier.price}
          onChangeText={(val) => updateTier("price", val)}
          keyboardType="numeric"
          placeholder="0.00"
          icon={<DollarSign size={18} color={theme.colors.textLight} strokeWidth={2} />}
        />

        <CounterInput
          label="Revisions"
          value={currentTier.revisions}
          min={0}
          max={20}
          onIncrement={() => updateTier("revisions", currentTier.revisions + 1)}
          onDecrement={() => updateTier("revisions", currentTier.revisions - 1)}
        />

        <CounterInput
          label="Delivery Days"
          value={currentTier.deliveryDays}
          min={1}
          max={60}
          suffix="days"
          onIncrement={() => updateTier("deliveryDays", currentTier.deliveryDays + 1)}
          onDecrement={() => updateTier("deliveryDays", currentTier.deliveryDays - 1)}
        />

        <ToggleSwitch
          label="Source File"
          description="Include editable source files with delivery"
          value={currentTier.sourceFile}
          onToggle={(val) => updateTier("sourceFile", val)}
        />

        <ToggleSwitch
          label="Commercial Use"
          description="Allow client to use work commercially"
          value={currentTier.commercial}
          onToggle={(val) => updateTier("commercial", val)}
        />

        <InfoCard
          title="Pro Tip: Strategic Pricing"
          description="Freelancers who offer three tiers earn up to 40% more revenue. Price your Basic package as your minimum viable service, your Standard package as the most popular option, and your Premium as the full-service option."
          variant="tip"
        />

        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNext} />
        </View>
      </KeyboardAwareScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
});

export default SetPricing;
