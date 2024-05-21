import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export const COLORS = {
  primary: "#65B741",
  lightRed: "#FFCAC3",
  lightGreen: "#A1FFA54F",
  green: "#99BC85",
  transparent: "transparent",
  gradientForm: "#A376F1",
  white: "#FFFFFF",
  dark: "#444",
  bgColor: "#F1E4C3",
  warning: "#f0d500",
  danger: "#FF0D0E",
  gray: "#666666",
  grayLight: "#ccc",
  black: "#0a0a0a",
  text: "#FFFFFF",
  desc: "#e6e6e6",
};

export const SIZES = {
  // Global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 8,
  padding2: 12,
  padding3: 16,

  // FONTS Sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // App Dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Sen Bold",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Sen Bold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Sen Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Sen Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Sen Bold", fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontFamily: "Sen Regular", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "Sen Regular", fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "Sen Regular", fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: "Sen Regular", fontSize: SIZES.body4, lineHeight: 20 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
