const palette = {
  // Purple/Violet Brand Colors (shared across themes)
  purple50: "#F5F3FF",
  purple100: "#EDE9FE",
  purple200: "#DDD6FE",
  purple300: "#C4B5FD",
  purple400: "#A78BFA",
  purple500: "#8B5CF6",
  purple600: "#7C3AED",
  purple700: "#6D28D9",
  purple800: "#5B21B6",
  purple900: "#4C1D95",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Dark Mode Surfaces
  dark50: "#2D2A3E",
  dark100: "#252238",
  dark200: "#1E1B2E",
  dark300: "#171525",
  dark400: "#110F1D",
  dark500: "#0B0A14",

  // Status Colors
  green400: "#34D399",
  green500: "#10B981",
  green100: "#D1FAE5",
  green900: "#064E3B",

  yellow400: "#FBBF24",
  yellow500: "#F59E0B",
  yellow100: "#FEF3C7",
  yellow900: "#78350F",

  red400: "#F87171",
  red500: "#EF4444",
  red100: "#FEE2E2",
  red900: "#7F1D1D",

  blue400: "#60A5FA",
  blue500: "#3B82F6",
  blue100: "#DBEAFE",
  blue900: "#1E3A5F",
};

export const LightColors = {
  // Primary
  primary: palette.purple600,
  primaryLight: palette.purple400,
  primaryDark: palette.purple800,
  primaryFaded: palette.purple100,
  primarySurface: palette.purple50,

  // Backgrounds
  background: palette.white,
  backgroundSecondary: palette.gray50,
  surface: palette.white,
  surfaceSecondary: palette.gray100,

  // Text
  textPrimary: palette.gray800,
  textSecondary: palette.gray500,
  textLight: palette.gray400,
  textOnPrimary: palette.white,

  // Borders
  border: palette.gray200,
  borderLight: palette.gray100,
  borderFocus: palette.purple600,

  // Status
  success: palette.green500,
  successLight: palette.green100,
  warning: palette.yellow500,
  warningLight: palette.yellow100,
  error: palette.red500,
  errorLight: palette.red100,
  info: palette.blue500,
  infoLight: palette.blue100,

  // UI Specific
  walletBackground: palette.purple600,
  walletText: palette.white,
  walletSubtext: palette.purple200,
  tabBarBackground: palette.white,
  tabBarActive: palette.purple600,
  tabBarInactive: palette.gray400,
  starRating: palette.yellow500,
  badge: palette.red500,
  badgeText: palette.white,
  shadow: palette.black,
  overlay: "rgba(0, 0, 0, 0.5)",
  shimmer: palette.gray200,

  // Cards
  card: palette.white,
  cardBorder: palette.gray200,

  // Input
  inputBackground: palette.gray50,
  inputBorder: palette.gray200,
  inputText: palette.gray800,
  inputPlaceholder: palette.gray400,

  // Transactions
  transactionCredit: palette.green500,
  transactionDebit: palette.red500,
  transactionPending: palette.yellow500,

  // Category Icons
  categoryBackground: palette.purple100,
  categoryIcon: palette.purple600,
};

export const DarkColors = {
  // Primary
  primary: palette.purple500,
  primaryLight: palette.purple400,
  primaryDark: palette.purple700,
  primaryFaded: palette.dark50,
  primarySurface: palette.dark100,

  // Backgrounds
  background: palette.dark300,
  backgroundSecondary: palette.dark400,
  surface: palette.dark200,
  surfaceSecondary: palette.dark100,

  // Text
  textPrimary: palette.gray100,
  textSecondary: palette.gray400,
  textLight: palette.gray500,
  textOnPrimary: palette.white,

  // Borders
  border: palette.dark50,
  borderLight: palette.dark100,
  borderFocus: palette.purple500,

  // Status
  success: palette.green400,
  successLight: palette.green900,
  warning: palette.yellow400,
  warningLight: palette.yellow900,
  error: palette.red400,
  errorLight: palette.red900,
  info: palette.blue400,
  infoLight: palette.blue900,

  // UI Specific
  walletBackground: palette.purple800,
  walletText: palette.white,
  walletSubtext: palette.purple300,
  tabBarBackground: palette.dark200,
  tabBarActive: palette.purple400,
  tabBarInactive: palette.gray500,
  starRating: palette.yellow400,
  badge: palette.red400,
  badgeText: palette.white,
  shadow: palette.black,
  overlay: "rgba(0, 0, 0, 0.7)",
  shimmer: palette.dark50,

  // Cards
  card: palette.dark200,
  cardBorder: palette.dark50,

  // Input
  inputBackground: palette.dark100,
  inputBorder: palette.dark50,
  inputText: palette.gray100,
  inputPlaceholder: palette.gray500,

  // Transactions
  transactionCredit: palette.green400,
  transactionDebit: palette.red400,
  transactionPending: palette.yellow400,

  // Category Icons
  categoryBackground: palette.dark50,
  categoryIcon: palette.purple400,
};

export type ColorScheme = typeof LightColors;

export { palette };
