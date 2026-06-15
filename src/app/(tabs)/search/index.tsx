
import RecipeScrollView from "@/components/search/recipe-scroll-view";
import RecipeSearchBar from "@/components/search/recipe-search-bar";
import { MainStyle } from "@/constants/screen_styles";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
  return (
    <View style={MainStyle.container}>
      <Text style={style.title}>Search Recipes</Text>
      <RecipeSearchBar/>
      {/* <Link href="/search/details" style={MainStyle.link} >
        <Text>Go to recipe details</Text>
      </Link> */}
      <RecipeScrollView/>
    </View>
  );
}

export const style = StyleSheet.create({
  title:{
    fontSize: 50,
    textAlign: "center"
  }
})