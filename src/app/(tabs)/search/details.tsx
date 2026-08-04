import { NotificationContext } from "@/app/_layout";
import ImageDisplay from "@/components/details/image-display";
import ButtonWrapper from "@/components/general/button-wrapper";
import Category from "@/components/general/category";
import SegmentedButton from "@/components/general/segmented-button";
import RecipeStepBuilder from "@/components/search-details/recipe-step-builder";
import { getColorScheme } from "@/constants/color-scheme";
import { DETAIL_HORIZONTAL_MARGIN } from "@/constants/constants";
import { MAIN_STYLE } from "@/constants/styles";
import { deleteRecipeDatabase, getRecipeById } from "@/db/recipe-db";
import { Recipe } from "@/recipe/recipe";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";



export default function DetailScreen() {

  const notificationUpdate = useContext(NotificationContext);
  const {width} = useWindowDimensions();
  const recipeId = useLocalSearchParams().id;
  const [recipe, setRecipe] = useState<Recipe|null>(null);
  const [selectedServingIndex, setSelectedServingIndex] = useState<number>(1);
  const [multipliers, setMultipliers] = useState<number[]>([.5,1,2,1]);
  const servingOptions = useRef(["0.5x", "1x", "2x", "Custom"]);

  const colorScheme = getColorScheme();

  if(recipeId === undefined || !(typeof(recipeId) === "string")){
    useEffect(() => {notificationUpdate("Couldn't find recipe")}, [])
    return <></>
  }

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const queriedRecipe = await getRecipeById( Number.parseInt(recipeId));
        if(queriedRecipe === null){
          notificationUpdate("Couldn't find recipe");
          return;
        }
        setRecipe(queriedRecipe);
      }
      getData();
    }, [])
  )

  if(recipe === null){
    return <Text>Loading Recipe</Text>
  }

  const onEdit = () => {

  }

  const onDelete = async () => {
    console.log("On Delete");
    try{
      await deleteRecipeDatabase(Number.parseInt(recipeId));
      router.navigate("/search");
      //throw("Test Error");
    }
    catch(e){
      notificationUpdate("Error: " + e);
    }
    
  }

  const onCustomChange = (value:number)=>{
    let newMulitpliers = multipliers.map((val, index) => {
      if(index === multipliers.length - 1){
        return value;
      }
      return val;
    })
    setMultipliers(newMulitpliers);
  }

  let portion = multipliers[selectedServingIndex];

  return (
    <>
      <Stack.Screen options={{
        title: recipe.name, 
        headerTitleAlign:'center', 
        headerTitleStyle: style.title,
        headerTintColor: colorScheme.onPrimary,
        headerStyle:{
          backgroundColor: colorScheme.primary,
        }
      }}/>
      <View style={MAIN_STYLE.scrollContainer}>
        <ScrollView 
        style = {{width: width}}
        contentContainerStyle={style.scrollView}>
          <Text style={style.text}>{`From: ${recipe.website}\nBy: ${recipe.author}`}</Text>
          <View style={[style.row,{flexWrap: 'wrap'}]}>
            <Category/>
            <Category editable={true}/>
            <Category categoryAdd={true}/>
          </View>
          <ImageDisplay/>
          <View style={style.row}>
            <ButtonWrapper width={100} height={37} onPress={onEdit} backgroundColor={colorScheme.primary}>
              <Feather name='edit' size={20} color={colorScheme.onPrimary}/>
              <Text style={[style.buttonText,{color: colorScheme.onPrimary}]}>Edit</Text>
            </ButtonWrapper>
            <ButtonWrapper width={100} height = {37} onPress={onDelete} backgroundColor={colorScheme.tertiary}>
              <Ionicons name='trash-outline' size={22} color={colorScheme.onTertiary}/>
              <Text style={[style.buttonText,{color: colorScheme.onTertiary}]}>Delete</Text>
            </ButtonWrapper>
          </View>
          <View style={{marginHorizontal: DETAIL_HORIZONTAL_MARGIN}}>
            <SegmentedButton
              options={servingOptions.current} 
              selectedIndex={selectedServingIndex} 
              lastCustom={true}
              fallbackIndex={1}
              onIndexChange={setSelectedServingIndex}
              onCustomChange={onCustomChange}
            />
          </View>
          <View style={style.section}>
            <Text style={style.subtitle}>Ingredients</Text>
            <RecipeStepBuilder recipeSteps={recipe.ingredients.map(val => val.toString(portion))}/>
          </View>
          <View style={style.section}>
            <Text style={style.subtitle}>Instructions</Text>
            <RecipeStepBuilder recipeSteps={recipe.instructions}/>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export const style = StyleSheet.create({
  title: {
    fontSize: 27,
    fontFamily: "Title"
  },
  subtitle:{
    fontSize: 32,
    fontFamily:"Subtitle"
  },
  text:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    fontSize: 15,
    fontFamily:"Body"
  },
  scrollView:{
    marginVertical: 10,
    gap: 15
  },
  section:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    gap: 15
  },
  row:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    flexDirection: 'row',
    gap: 10
  },
  buttonText:{
    fontSize: 15,
    fontFamily:"Body"
  }

})
