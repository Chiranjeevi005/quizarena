export type ColorMode = "light" | "dark" | "system";

export interface ThemeColors {
  primary: { DEFAULT: string; foreground: string };
  secondary: { DEFAULT: string; foreground: string };
  background: string;
  surface: string;
  error: { DEFAULT: string; foreground: string };
  warning: { DEFAULT: string; foreground: string };
  success: { DEFAULT: string; foreground: string };
  info: { DEFAULT: string; foreground: string };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ThemeRadius {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadow {
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  none: string;
}

export interface ThemeTokens {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  radius: ThemeRadius;
  shadow: ThemeShadow;
}
