import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { fontFamilies } from "../constants";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingTop: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    color: COLORS.text,
  },

  inputContainer: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: Platform.OS === "ios" ? 12 : 10,
    paddingVertical: 12,
  },

  section: {
    // marginTop: 60,
    marginBottom: 26,
    paddingHorizontal: 20,
  },

  tag: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === "ios" ? 6 : 4,
    borderRadius: 100,
    backgroundColor: COLORS.blue,
  },

  card: {
    borderRadius: 12,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});
