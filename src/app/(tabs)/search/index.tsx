
import { RefreshContext } from "@/app/_layout";
import RecipeScrollView from "@/components/search/recipe-scroll-view";
import RecipeSearchBar from "@/components/search/recipe-search-bar";
import { MAIN_STYLE } from "@/constants/styles";
import { queryRecipes } from "@/db/recipe-db";
import { RecipeSearchCriteria, RecipeSummaryDetail } from "@/recipe/recipe";
import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {

  
  const [recipes, setRecipes] = useState<RecipeSummaryDetail[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<RecipeSearchCriteria>({name: ""});
  const refresh = useContext(RefreshContext)
  

  useEffect(
    useCallback(() => {
      const getData = async () => {
        const queriedRecipes = await queryRecipes(searchCriteria);
        setRecipes(queriedRecipes);
      };

      getData();

      console.log("Updating Recipes");
      

      return () => {};
    }, [searchCriteria])
  ,[searchCriteria, refresh[0]]);

  return (
    <View style={[MAIN_STYLE.container,{paddingTop: 10, gap: 10}]}>
      <Text style={style.title}>Search Recipes</Text>
      <RecipeSearchBar setCriteria={setSearchCriteria}/>
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