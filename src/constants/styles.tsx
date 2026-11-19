import { StyleSheet } from "react-native";
import { getColorScheme } from "./color-scheme";
import { RECIPE_SUMMARY_BORDER_WIDTH, RECIPE_SUMMARY_HEIGHT, RECIPE_SUMMARY_PADDING, RECIPE_SUMMARY_WIDTH } from "./constants";

export const MAIN_STYLE = StyleSheet.create({
  title:{
    flex: 1, 
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: getColorScheme().background,
  },
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
  rearrange: {
    width: 35,
    backgroundColor: getColorScheme().secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recipeSummaryView:{
    width: RECIPE_SUMMARY_WIDTH,
    height: RECIPE_SUMMARY_HEIGHT,
    borderWidth: RECIPE_SUMMARY_BORDER_WIDTH,
    borderRadius: 20,
  },
  recipeSummaryButton:{
    flex: 1,
    paddingVertical: RECIPE_SUMMARY_PADDING,
    paddingHorizontal: RECIPE_SUMMARY_PADDING,
    justifyContent: 'center'
  }
});