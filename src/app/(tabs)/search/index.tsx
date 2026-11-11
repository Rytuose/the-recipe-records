
import { RefreshContext } from "@/app/_layout";
import RecipeScrollView from "@/components/search/recipe-scroll-view";
import RecipeSearchBar from "@/components/search/recipe-search-bar";
import { MAIN_STYLE } from "@/constants/styles";
import { queryRecipes } from "@/db/recipe-db";
import { RecipeSearchCriteria, RecipeSummaryDetail } from "@/recipe/recipe";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
  const refreshCount = useRef<number>(0);
  const loading = useRef<boolean>(false);
  const [recipes, setRecipes] = useState<RecipeSummaryDetail[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<RecipeSearchCriteria>(
    { name: "", 
      starredValid: false, 
      starred: false, 
      time: 0, 
      timeComparator: "", 
      timeDisplayUnit: "minutes"
    }
  );
  const refresh = useContext(RefreshContext)
  

  useEffect(
    useCallback(() => {
      const getData = async () => {
        const queriedRecipes = await queryRecipes(searchCriteria);
        setRecipes(queriedRecipes);
      };

      loading.current = true;
      getData();
      loading.current = false;

      refreshCount.current ++;

      console.log("Updating Recipes");

      return () => {};
    }, [searchCriteria])
  ,[searchCriteria, refresh[0]]);


  return (
    <View style={[MAIN_STYLE.container,{paddingTop: 10, gap: 10}]}>
      <Text style={style.title}>Search Recipes</Text>
      <RecipeSearchBar criteria={searchCriteria} setCriteria={setSearchCriteria}/>
      {!loading.current && <RecipeScrollView recipes={recipes} refresh={refreshCount.current}/>}
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