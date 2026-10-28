import RecipeInput from "@/components/add/recipe-input";
import ButtonWrapper from "@/components/general/button-wrapper";
import { getColorScheme } from "@/constants/color-scheme";
import { MAIN_STYLE } from "@/constants/styles";
import { parseRecipe } from "@/recipe/recipe_parser";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

const BUTTON_WIDTH = 175;
const BUTTON_FONT_SIZE = 20;

export default function AddScreen() {

  const colorScheme = getColorScheme();
  const router = useRouter();
  const {width} = useWindowDimensions();

  const [data, setData] = useState<string>("");

  const linkRecipe = async () => {
    //router.navigate("/add/details");
    //console.log("Attempting to link to " + websiteURL);

    let recipe = await parseRecipe(data);
    
    //TODO: Get a better way to pass this so it isn't in the path/search bar
    //TODO: Notification for each thing that parser was unable to parse

    router.navigate({pathname: "/add/details", params:{recipe: JSON.stringify(recipe)}})
  }

  const writeRecipe = () => {
    router.navigate("/add/details");
  }

  return (
      <View style={MAIN_STYLE.title}>
        <ScrollView
        style = {{width: width}}
        contentContainerStyle={[MAIN_STYLE.container, {marginBottom: 750}]}>
          <Text style={style.title}>{"The\nRecipe\nRecords"}</Text>
          <Text style={style.subtitle}>Paste a recipe</Text>
          <RecipeInput data={data} setData={setData}/>
          <ButtonWrapper width={BUTTON_WIDTH} onPress={linkRecipe} backgroundColor={colorScheme.primary}>
            <Feather name={"send"} size={20} color={colorScheme.onPrimary}/>
            <Text style={[style.buttonText, {color: colorScheme.onPrimary}]}>Go!</Text>
          </ButtonWrapper>
          <ButtonWrapper width={BUTTON_WIDTH} onPress={writeRecipe} backgroundColor={colorScheme.primary}>
            <Feather name={"pen-tool"} size={20} color={colorScheme.onPrimary}/>
            <Text style={[style.buttonText, {color: colorScheme.onPrimary}]}>New Recipe</Text>
          </ButtonWrapper>
        </ScrollView>
      </View>
  );
}

export const style = StyleSheet.create({
  title:{
    fontSize: 90,
    lineHeight: 115,
    textAlign: "center",
    fontFamily: "Title"
  },
  subtitle:{
    fontSize: 45,
    fontFamily: "Subtitle"
  },
  buttonText:{
    fontSize: BUTTON_FONT_SIZE,
    fontFamily: "Body"
  }
})
