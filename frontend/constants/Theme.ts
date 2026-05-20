import { LightColors, DarkColors, type ColorScheme } from "./Colors";

const BaseTheme = {
  // Typography
  fonts: {
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
    bold: "Inter-Bold",
    extraBold: "Inter-ExtraBold",
  },

  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 28,
    display: 34,
  },

  lineHeight: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 22,
    xl: 26,
    xxl: 30,
    xxxl: 36,
    display: 42,
  },

  // Spacing (4px base grid)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40,
    section: 48,
  },

  // Border Radius
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
  },

  // Common Layout Sizes
  layout: {
    screenPadding: 16,
    cardPadding: 16,
    sectionGap: 24,
    inputHeight: 50,
    buttonHeight: 50,
    tabBarHeight: 65,
    headerHeight: 56,
    avatarSm: 32,
    avatarMd: 44,
    avatarLg: 56,
    avatarXl: 80,
    iconSm: 18,
    iconMd: 22,
    iconLg: 28,
    categoryIconSize: 48,
  },

  // Component Specific
  wallet: {
    height: 140,
    borderRadius: 20,
  },

  serviceCard: {
    width: 260,
    imageHeight: 130,
    borderRadius: 16,
  },

  bookingCard: {
    height: 80,
    borderRadius: 12,
  },
};

// Light theme shadows
const LightShadows = {
  sm: {
    shadowColor: LightColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: LightColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: LightColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  purple: {
    shadowColor: LightColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Dark theme shadows (subtler, no purple glow)
const DarkShadows = {
  sm: {
    shadowColor: DarkColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: DarkColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: DarkColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  purple: {
    shadowColor: DarkColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
};

export type ThemeType = typeof BaseTheme & {
  colors: ColorScheme;
  shadows: typeof LightShadows;
  dark: boolean;
};

export const LightTheme: ThemeType = {
  ...BaseTheme,
  colors: LightColors,
  shadows: LightShadows,
  dark: false,
};

export const DarkTheme: ThemeType = {
  ...BaseTheme,
  colors: DarkColors,
  shadows: DarkShadows,
  dark: true,
};

export const C = {
  white: '#FFFFFF',
  bg: '#F5F5F8',
  dark: '#1A1A2E',
  grey: '#9B9BB0',
  med: '#4A4A6A',
  purple: '#6B5CE7',
  border: '#E5E5F0',
  greenBg: '#ECFDF5',
  green: '#22C55E',
  orange: '#F59E0B', 
  redBg: '#FEF2F2',
  red: '#EF4444'
};

export const shadow = {
  sm: { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 3, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  md: { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
};
