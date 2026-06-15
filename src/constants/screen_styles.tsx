import { StyleSheet } from "react-native";

export const MainStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
  },
  link: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: "blue"
  },
});