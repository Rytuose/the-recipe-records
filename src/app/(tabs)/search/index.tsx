
import RecipeScrollView from "@/components/search/recipe-scroll-view";
import RecipeSearchBar from "@/components/search/recipe-search-bar";
import { MAIN_STYLE } from "@/constants/styles";
import { getRecipes } from "@/db/recipe-db";
import { RecipeSummaryDetail } from "@/recipe/recipe";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {

  
  const [recipes, setRecipes] = useState<RecipeSummaryDetail[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const queriedRecipes = await getRecipes();
        setRecipes(queriedRecipes);
      };

      getData();

      console.log("Focused");
      

      return () => {};
    }, [])
  );

  return (
    <View style={[MAIN_STYLE.container,{paddingTop: 10, gap: 10}]}>
      <Text style={style.title}>Search Recipes</Text>
      <RecipeSearchBar/>
      <RecipeScrollView recipes={recipes}/>
    </View>
  );
}

export const style = StyleSheet.create({
  title:{
    fontSize: 50,
    textAlign: "center",
    fontFamily: "Title"
  }
})