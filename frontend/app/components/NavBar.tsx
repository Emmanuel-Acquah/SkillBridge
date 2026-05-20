import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bell, Plus } from "lucide-react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface NavbarProps {
  avatarUrl?: string;
  notificationCount?: number;
  messageCount?: number;
  onNotificationPress?: () => void;
  onCreatePress?: () => void;
  onAvatarPress?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  avatarUrl,
  notificationCount = 0,
  onNotificationPress,
  onCreatePress,
  onAvatarPress,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      navigation.navigate("(screens)", { screen: "Notification" });
    }
  };

  const handleCreatePress = () => {
    if (onCreatePress) {
      onCreatePress();
    } else {
      navigation.navigate("(screens)", { screen: "CreatePost" });
    }
  };

  const handleAvatarPress = () => {
    if (onAvatarPress) {
      onAvatarPress();
    } else {
      navigation.navigate("(screens)", { screen: "Settings" });
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "ios" ? insets.top + 4 : insets.top + 10,
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.borderLight,
        },
      ]}
    >
      <View style={styles.inner}>
        {/* App Name */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Text
            style={[
              styles.appName,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.bold,
              },
            ]}
          >
            Skill
            <Text style={{ color: theme.colors.primary }}>Bridge</Text>
          </Text>
        </Animated.View>

        {/* Right Actions */}
        <View style={styles.actions}>
          {/* Notification Bell */}
          <AnimatedTouchable
            entering={FadeInRight.duration(400).delay(200)}
            onPress={handleNotificationPress}
            activeOpacity={0.7}
            style={[
              styles.iconButton,
              {
                backgroundColor: theme.colors.surfaceSecondary,
              },
            ]}
          >
            <Bell
              size={20}
              color={theme.colors.textSecondary}
              strokeWidth={1.8}
            />
            {notificationCount > 0 && (
              <View
                style={[styles.badge, { backgroundColor: theme.colors.badge }]}
              >
                <Text
                  style={[styles.badgeText, { color: theme.colors.badgeText }]}
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Text>
              </View>
            )}
          </AnimatedTouchable>

          {/* Create / Upload */}
          <AnimatedTouchable
            entering={FadeInRight.duration(400).delay(300)}
            onPress={handleCreatePress}
            activeOpacity={0.7}
            style={[
              styles.createButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Plus
              size={20}
              color={theme.colors.textOnPrimary}
              strokeWidth={2.5}
            />
          </AnimatedTouchable>

          {/* Avatar */}
          <AnimatedTouchable
            entering={FadeInRight.duration(400).delay(400)}
            onPress={handleAvatarPress}
            activeOpacity={0.7}
            style={styles.avatarButton}
          >
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View
                style={[
                  styles.avatarFallback,
                  { backgroundColor: theme.colors.primaryFaded },
                ]}
              >
                <Text
                  style={[
                    styles.avatarFallbackText,
                    {
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.semiBold,
                    },
                  ]}
                >
                  SB
                </Text>
              </View>
            )}

            {/* Online indicator */}
            <View
              style={[
                styles.onlineIndicator,
                {
                  backgroundColor: theme.colors.success,
                  borderColor: theme.colors.background,
                },
              ]}
            />
          </AnimatedTouchable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appName: {
    fontSize: 22,
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  avatarButton: {
    position: "relative",
    marginLeft: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 14,
  },
  avatarFallback: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarFallbackText: {
    fontSize: 13,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navbar;
