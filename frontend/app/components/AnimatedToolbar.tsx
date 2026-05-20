import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import {
  Home,
  Compass,
  Search,
  ClipboardList,
  Clapperboard,
  MessageCircle,
  User,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TAB_COUNT = 5;
const TAB_BAR_HORIZONTAL_PADDING = 14;
const TAB_WIDTH = (SCREEN_WIDTH - TAB_BAR_HORIZONTAL_PADDING * 2) / TAB_COUNT;

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
};

interface TabItemProps {
  label: string;
  icon: React.ElementType;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  index: number;
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  icon: Icon,
  isFocused,
  onPress,
  onLongPress,
}) => {
  const { theme } = useTheme();
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSpring(isFocused ? 1 : 0, SPRING_CONFIG);
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [0, 1],
      [0, -2],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      animatedValue.value,
      [0, 1],
      [1, 1.15],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  // Removed animatedLabelStyle as text labels are hidden to match Instagram navigation tabs

  const animatedDotStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedValue.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      animatedValue.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      style={styles.tabItem}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
    >
      <Animated.View style={animatedIconStyle}>
        <Icon
          size={24}
          color={
            isFocused ? theme.colors.tabBarActive : theme.colors.tabBarInactive
          }
          strokeWidth={isFocused ? 2.2 : 1.8}
        />
      </Animated.View>

      {/* Label hidden to match Instagram styling */}

      <Animated.View
        style={[
          styles.activeDot,
          { backgroundColor: theme.colors.tabBarActive },
          animatedDotStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

const TABS = [
  { name: "Home", label: "Home", icon: Home },
  { name: "Explore", label: "Search", icon: Search },
  { name: "Order", label: "Orders", icon: ClipboardList },
  { name: "Reels", label: "Reels", icon: Clapperboard },
  { name: "Profile", label: "Profile", icon: User },
];

const AnimatedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Animated sliding indicator
  const indicatorPosition = useSharedValue(0);

  const activeRouteName = state.routes[state.index]?.name;
  const activeTabIndex = TABS.findIndex((t) => t.name === activeRouteName);

  useEffect(() => {
    if (activeTabIndex !== -1) {
      indicatorPosition.value = withSpring(
        activeTabIndex * TAB_WIDTH,
        SPRING_CONFIG,
      );
    }
  }, [activeTabIndex]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.tabBarBackground,
          borderTopColor: theme.colors.border,
          // Guarantee a safe, comfortable bottom spacing on Android to prevent system bar interference
          paddingBottom: Platform.OS === "ios" ? (insets.bottom || 12) : Math.max(insets.bottom, 22),
        },
        theme.dark ? styles.containerDarkShadow : styles.containerLightShadow,
      ]}
    >
      {/* Sliding top indicator */}
      <Animated.View
        style={[
          styles.indicator,
          { backgroundColor: theme.colors.tabBarActive },
          animatedIndicatorStyle,
        ]}
      />

      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null; // Safe-guard: ignore files in app/(tabs) that are not in TABS config
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              label={tab.label}
              icon={tab.icon}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              index={index}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    position: "relative",
  },
  containerLightShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  containerDarkShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: TAB_BAR_HORIZONTAL_PADDING,
    width: TAB_WIDTH,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: TAB_BAR_HORIZONTAL_PADDING,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
});

export default AnimatedTabBar;
