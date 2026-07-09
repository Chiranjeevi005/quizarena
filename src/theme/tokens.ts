import { ThemeTokens } from "@/types";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { radius } from "./radius";
import { shadow } from "./shadow";
import { breakpoints } from "./breakpoints";
import { zIndex } from "./zIndex";
import { animations } from "./animations";

export const tokens: ThemeTokens = {
  colors,
  spacing,
  typography,
  radius,
  shadow,
};

export const extendedTokens = {
  ...tokens,
  breakpoints,
  zIndex,
  animations,
};
