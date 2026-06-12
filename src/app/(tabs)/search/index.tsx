import { MainStyle } from "@/constants/screen_styles";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SearchScreen() {
  return (
    <View style={MainStyle.container}>
      <Text>Search for an exisiting recipe.</Text>
      <Link href="/search/details" style={MainStyle.link} >
        <Text>Go to recipe details</Text>
      </Link>
    </View>
  );
}