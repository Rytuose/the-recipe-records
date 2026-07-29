
import RecipeScrollView from "@/components/search/recipe-scroll-view";
import RecipeSearchBar from "@/components/search/recipe-search-bar";
import { MAIN_STYLE } from "@/constants/styles";
import { getRecipies } from "@/db/recipe-db";
import { RecipeSummaryDetail } from "@/recipe/recipe";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {

  
  const [recipies, setRecipies] = useState<RecipeSummaryDetail[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const queriedRecipies = await getRecipies();
        setRecipies(queriedRecipies);
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
      <RecipeScrollView recipies={recipies}/>
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