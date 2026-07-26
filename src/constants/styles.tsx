import { StyleSheet } from "react-native";

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
  rearrange: {
    width: 60,
    backgroundColor: '#123456'
  }
});