import { RECIPE_SUMMARY_WIDTH } from "@/constants/constants";
import { RecipeSummaryDetail } from "@/recipe/recipe";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import RecipeSummary from "./recipe-summary";

const GAP = 10;
const MARGIN = 15;

type Props = {
  recipes: RecipeSummaryDetail[]
}

export default function RecipeScrollView({recipes}:Props){

    const {width} = useWindowDimensions();
    
    const columnCount = Math.floor((width - 2*MARGIN + GAP)/(RECIPE_SUMMARY_WIDTH + GAP));

    const tempData = [1,2,3,4,5,6,7]


    return  <FlatList
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
