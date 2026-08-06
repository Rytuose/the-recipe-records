import { NotificationContext } from "@/app/_layout";
import ImageDisplay from "@/components/details/image-display";
import ButtonWrapper from "@/components/general/button-wrapper";
import Category from "@/components/general/category";
import IngredientFormBuilder from "@/components/recipe-edit/ingredient-form-builder";
import InstructionFormBuilder from "@/components/recipe-edit/instruction-form-builder";
import { getColorScheme } from "@/constants/color-scheme";
import { DETAIL_HORIZONTAL_MARGIN, INSTRUCTION_FORM_STARTING_HEIGHT } from "@/constants/constants";
import { MAIN_STYLE } from "@/constants/styles";
import { addRecipeDatabase } from "@/db/recipe-db";
import { Ingredient } from "@/recipe/ingredient";
import { Recipe } from "@/recipe/recipe";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { useContext, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";

export type IngredientPair = {
    ingredient: Ingredient
    key: number
}

export type InstructionPair = {
    instruction: string
    key: number
    height: number
}

export type Props = {
    recipe:Recipe;
}

export default function RecipeEditor({recipe}:Props) {

  const website = recipe.website;
  const author = recipe.author;
  const [title, setTitle] = useState<string>(recipe.name);
  const [ingredients, setIngredients] = useState<IngredientPair[]>([
    ...recipe.ingredients.map((value, index) => {
      return {ingredient: value, key: index};
    }), {ingredient: new Ingredient(), key: recipe.ingredients.length}]);
  const [instructions, setInstructions] = useState<InstructionPair[]>([
    ...recipe.instructions.map((value, index) => {
      return {instruction: value, key: index, height: INSTRUCTION_FORM_STARTING_HEIGHT};
    }),{instruction: "", key: recipe.instructions.length , height: INSTRUCTION_FORM_STARTING_HEIGHT}]);

  const textInputRef = useRef<TextInput>(null);
  const [titleEditable, setTitleEditable] = useState<boolean>(false);
  const {width} = useWindowDimensions();
  const notificationUpdate = useContext(NotificationContext);
  const colorScheme = getColorScheme();

  const editTitle = () => {
    setTitleEditable(true);
    textInputRef.current?.focus();
  }

  const addRecipe = () => {
    //const recipe = new Recipe();

    const ingredientStrings = new Array<Ingredient>(ingredients.length-1); 
    const instructionStrings = new Array<string>(instructions.length-1);

    ingredients.forEach((value, index) => {
      if(index < ingredientStrings.length){
        ingredientStrings[index] = value.ingredient
      }
    })
    instructions.forEach((value, index) => {
      if(index < instructionStrings.length){
        instructionStrings[index] = value.instruction
      }
    })

    recipe.name = title;
    recipe.website = website;
    recipe.author = author;
    recipe.ingredients = ingredientStrings;
    recipe.instructions = instructionStrings;

    try{
      addRecipeDatabase(recipe);
      notificationUpdate("Successfully saved recipe")
    }
    catch(e){
      notificationUpdate("Error saving changes: " + e)
    }

    //router.navigate("/add");
    router.back();

    
  }

  const cancelRecipe = () => {
    //router.navigate("/add");
    router.back();
  }

  return (
    <>
      <Stack.Screen options={{
        headerTintColor: colorScheme.onPrimary,
        headerStyle:{
          backgroundColor: colorScheme.primary
        },
        headerTitle: () => {
          return <View style={{flexDirection:'row', gap: 5, width: width * .8, alignItems:"center"}}>
            <TextInput
              ref={textInputRef}
              style={[(titleEditable)? [style.titleTextInputEnabled,{borderColor:colorScheme.onPrimary}]: style.titleTextInputDisabled,{color:colorScheme.onPrimary}]}
              value={title}
              editable = {titleEditable}
              focusable = {titleEditable}
              onChangeText={setTitle}
              onBlur={() => setTitleEditable(false)}
            />
          </View>
        },
        headerRight: () => {
          return <View style = {{paddingRight: 10}}>
            {(!titleEditable) && <ButtonWrapper width={40} onPress={editTitle} noBorder={true}>
                <Feather name={"edit"} size={24} color={colorScheme.onPrimary}/>
              </ButtonWrapper>}
            </View>
        },
        headerTitleAlign:'center'
      }}/>
      <View style={MAIN_STYLE.scrollContainer}>
        <ScrollView 
        style = {{width: width}}
        contentContainerStyle={style.scrollView}>
          <Text style={style.text}>{"From: " + website + "\nBy: " + author}</Text>
          <Text style={[style.subtitle, {marginHorizontal: DETAIL_HORIZONTAL_MARGIN}]}>Categories</Text>
          <View style={[style.row,{flexWrap: 'wrap'}]}>
            <Category editable={true}/>
            <Category editable={true}/>
            <Category categoryAdd={true}/>
          </View>
          <ImageDisplay/>
          <View style={style.section}>
            <Text style={style.subtitle}>Ingredients (1x)</Text>
            <IngredientFormBuilder ingredients={ingredients} setIngredients={setIngredients}/>
          </View>
          <View style={style.section}>
            <Text style={style.subtitle}>Instructions</Text>
            <InstructionFormBuilder instructions={instructions} setInstructions={setInstructions}/>
          </View>
          <View style={[style.buttonRow]}>
            <ButtonWrapper width={'40%'} onPress={cancelRecipe} backgroundColor={colorScheme.tertiary}>
              <Text style={[style.buttonText, {color:colorScheme.onTertiary}]}>Cancel</Text>
              <Ionicons name="close" size={24} color={colorScheme.onTertiary}/>
            </ButtonWrapper>
            <ButtonWrapper width={'40%'} onPress={addRecipe} backgroundColor={colorScheme.primary}>
              <Text style={[style.buttonText, {color:colorScheme.onPrimary}]}>Add Recipe</Text>
              <Ionicons name="add" size={24} color={colorScheme.onPrimary}/>
            </ButtonWrapper>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export const style = StyleSheet.create({
  header: {
    width: 500
  },
  titleTextInputEnabled: {
    textAlign: 'center',
    fontSize: 27,
    width: '100%',
    height: '80%',
    borderWidth: 3,
    outlineStyle: 'none' as any,
    fontFamily:"Title"
  },
  titleTextInputDisabled:{
    textAlign: 'center',
    fontSize: 27,
    width: '100%',
    height: '80%',
    borderWidth: 0,
    outlineStyle: 'none' as any,
    fontFamily:"Title"
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
  buttonRow:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '10%'
  },
  buttonText:{
    fontSize: 20,
    fontFamily: "Body"
  }
})
