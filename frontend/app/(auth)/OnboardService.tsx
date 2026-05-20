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
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

// UI Components
import StepIndicator from "../shared/StepIndicator";
import ImagePickerButton from "../shared/Imagepickerbutton";
import FloatingLabelInput from "../shared/FloatingLabelInput";
import ChipSelect from "../shared/ChipSelect";
import SegmentedControl from "../shared/SegmentedControl";
import ToggleSwitch from "../shared/ToogleSwitcher";
import Checkbox from "../shared/Checkbox";
import Button from "../shared/Button";

const SKILL_OPTIONS = [
  "Interaction Design",
  "Typography",
  "UI Research",
  "Logo Design",
  "Branding",
  "Illustration",
  "Prototyping",
  "Motion Design",
];

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Expert"];

const OnboardService = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("Intermediate");
  const [isAvailable, setIsAvailable] = useState(true);
  const [identityVerified, setIdentityVerified] = useState(false);
  const [expertSupport, setExpertSupport] = useState(false);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleImagePick = () => {
    setProfileImage(undefined);
    console.log("Pick image");
  };

  const handleNext = () => {
    navigation.navigate("AddServices" as never);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: Platform.OS === "ios" ? insets.top : insets.top + 10 },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={20}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={[
            styles.backButton,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <ArrowLeft size={20} color={theme.colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold },
          ]}
        >
          Skill<Text style={{ color: theme.colors.primary }}>Bridge</Text>
        </Text>

        <View style={styles.backButton} />
      </View>

      <StepIndicator currentStep={1} totalSteps={4} />

      <View>
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.bold },
          ]}
        >
          Complete Your Profile
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular },
          ]}
        >
          Help clients understand your expertise and professional background.
        </Text>
      </View>

      <ImagePickerButton imageUri={profileImage} onPress={handleImagePick} />

      <FloatingLabelInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
      />

      <FloatingLabelInput
        label="Username"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />

      <FloatingLabelInput
        label="Professional Title"
        value={professionalTitle}
        onChangeText={setProfessionalTitle}
      />

      <FloatingLabelInput
        label="About Me"
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
      />

      <ChipSelect
        label="Skills"
        options={SKILL_OPTIONS}
        selectedOptions={selectedSkills}
        onToggle={handleSkillToggle}
      />

      <SegmentedControl
        label="Experience Level"
        options={EXPERIENCE_LEVELS}
        selectedOption={experienceLevel}
        onSelect={setExperienceLevel}
      />

      <ToggleSwitch
        label="Availability Status"
        description="Turn this on to indicate you're available for freelance work, consulting, or taking on new projects."
        value={isAvailable}
        onToggle={setIsAvailable}
      />

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <View>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold },
          ]}
        >
          Identity Verified
        </Text>
        <Checkbox
          label="Verify my identity"
          description="This will allow you to verify your freelancer status via credentials, increasing visibility & trust."
          checked={identityVerified}
          onToggle={setIdentityVerified}
        />
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <View style={styles.expertSection}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.semiBold },
          ]}
        >
          Expert Support
        </Text>
        <Text
          style={[
            styles.expertDescription,
            { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular },
          ]}
        >
          I'm interested in letting Skill/Bridge specialists assist in escalating
          and resolving issues for your projects?
        </Text>
        <Checkbox
          label="Accept, give me useful automations."
          checked={expertSupport}
          onToggle={setExpertSupport}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
      </View>
    </KeyboardAwareScrollView>
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
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    marginVertical: 20,
  },
  expertSection: {
    marginBottom: 8,
  },
  expertDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
});

export default OnboardService;
