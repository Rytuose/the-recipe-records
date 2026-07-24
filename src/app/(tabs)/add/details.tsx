import { NotificationContext } from "@/app/_layout";
import IngredientFormBuilder from "@/components/add-details/ingredient-form-builder";
import InstructionFormBuilder from "@/components/add-details/instruction-form-builder";
import ImageDisplay from "@/components/details/image-display";
import ButtonWrapper from "@/components/general/button-wrapper";
import Category from "@/components/general/category";
import { DETAIL_HORIZONTAL_MARGIN, INSTRUCTION_FORM_STARTING_HEIGHT, MAIN_STYLE } from "@/constants/styles";
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

export default function AddDetailScreen() {

  const website = "Website"
  const author = "Author"

  const textInputRef = useRef<TextInput>(null);
  const [title, setTitle] = useState<string>("Food Name?");
  const [titleEditable, setTitleEditable] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<IngredientPair[]>([{ingredient: new Ingredient(), key: 0}]);
  const [instructions, setInstructions] = useState<InstructionPair[]>([{instruction: "", key: 0, height: INSTRUCTION_FORM_STARTING_HEIGHT}]);
  const {width} = useWindowDimensions();
  const notificationUpdate = useContext(NotificationContext);

  const editTitle = () => {
    setTitleEditable(true);
    textInputRef.current?.focus();
  }

  const addRecipe = () => {
    const recipe = new Recipe();

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

    router.navigate("/add");

    
  }

  const cancelRecipe = () => {
    router.navigate("/add");
  }

  return (
    <>
      <Stack.Screen options={{
        
        headerTitle: () => {
          return <View style={{flexDirection:'row', gap: 5, width: width * .8}}>
            <TextInput
              ref={textInputRef}
              style={(titleEditable)? style.titleTextInputEnabled: style.titleTextInputDisabled}
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
            {(!titleEditable) && <ButtonWrapper width={40} onPress={editTitle} noBackground={true}>
                <Feather name={"edit"} size={24}/>
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
            <ButtonWrapper width={'40%'} onPress={cancelRecipe}>
              <Text style={{fontSize: 20}}>Cancel</Text>
              <Ionicons name="close" size={24}/>
            </ButtonWrapper>
            <ButtonWrapper width={'40%'} onPress={addRecipe}>
              <Text style={{fontSize: 20}}>Add Recipe</Text>
              <Ionicons name="add" size={24}/>
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
    fontSize: 25,
    width: '100%'
  },
  titleTextInputDisabled:{
    textAlign: 'center',
    fontSize: 25,
    width: '100%',
    borderWidth: 0,
    outlineStyle: 'none' as any
  },
  subtitle:{
    fontSize: 25
  },
  text:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    fontSize: 15
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
    fontSize: 15
  }
})
