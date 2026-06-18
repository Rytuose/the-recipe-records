import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import RecipeSummary, { RECIPE_SUMMARY_WIDTH } from "./recipe-summary";

const GAP = 10;
const MARGIN = 15;

export default function RecipeScrollView(){

    const {width} = useWindowDimensions();
    
    const columnCount = Math.floor((width - 2*MARGIN + GAP)/(RECIPE_SUMMARY_WIDTH + GAP));

    const tempData = [1,2,3,4,5,6,7]

    return  <FlatList
            key={columnCount}
            style = {style.view}
            contentContainerStyle = {style.containerStyle}
            columnWrapperStyle = {(columnCount > 1)?style.wrapperStyle:undefined}
            numColumns={columnCount}
            data = {tempData}
            renderItem={({item}) => {     
                return <RecipeSummary/>
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
