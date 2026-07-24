import { StyleSheet } from "react-native";

export const DETAIL_HORIZONTAL_MARGIN = 15;

export const BOTTOM_NAV_BAR_HEIGHT = 60;

export const INSTRUCTION_FORM_STARTING_HEIGHT = 34;

export const MAIN_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
  },
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 20,
  },
  link: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: "blue"
  },
});