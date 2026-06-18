import { MainStyle } from "@/constants/styles";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={MainStyle.container}>
      <Text>Page Not Found</Text>
      <Link href="/" style={styles.link}>
        Return To Main Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});