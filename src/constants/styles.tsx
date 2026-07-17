import { StyleSheet } from "react-native";
import { getColorScheme } from "./color-scheme";

export const DETAIL_HORIZONTAL_MARGIN = 15;

export const BOTTOM_NAV_BAR_HEIGHT = 60;

export const MAIN_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 20,
    paddingTop: 30,
    backgroundColor: getColorScheme().background,
  },
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 20,
    backgroundColor: getColorScheme().background,
  },
  link: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: "blue"
  },
});