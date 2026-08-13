import { StyleSheet } from "react-native";
import { getColorScheme } from "./color-scheme";

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
  }
});