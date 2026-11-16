import { RECIPE_SUMMARY_WIDTH } from "@/constants/constants";
import { RecipeSummaryDetail } from "@/recipe/recipe";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import RecipeSummary from "./recipe-summary";

const GAP = 10;
const MARGIN = 15;

type Props = {
  recipes: RecipeSummaryDetail[]
  refresh: number
}

export default function RecipeScrollView({recipes, refresh}:Props){

    //const refresh = useContext(RefreshContext)
    const refreshCount = useRef<number>(-1);
    const flatList = useRef<FlatList>(null);
    const {width} = useWindowDimensions();
    
    const columnCount = Math.floor((width - 2*MARGIN + GAP)/(RECIPE_SUMMARY_WIDTH + GAP));

    useFocusEffect(
      useCallback(() => {
        if (refresh !== refreshCount.current){
          console.log("Update Refresh " + refreshCount.current);      

          flatList.current?.scrollToOffset({offset: 0, animated: false})
          refreshCount.current = refresh;
        }
      }
      ,[flatList, refresh])
    )

    return  <FlatList
            ref={flatList}
            key={columnCount}
            style = {style.view}
            contentContainerStyle = {style.containerStyle}
            columnWrapperStyle = {(columnCount > 1)?style.wrapperStyle:undefined}
            numColumns={columnCount}
            data = {recipes}
            renderItem={({item}) => {     
                return <RecipeSummary summary={item}/>
            }}
        />
}

export const style = StyleSheet.create({
  view:{
    width: '100%',
  },
  containerStyle:{
    margin: MARGIN,
    rowGap: GAP,
    alignSelf:'center',
  },
  wrapperStyle:{
    gap: GAP,
  }
})
