import WebsiteInput from "@/components/add/website-input";
import ButtonWrapper from "@/components/general/button-wrapper";
import { getColorScheme } from "@/constants/color-scheme";
import { MAIN_STYLE } from "@/constants/styles";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const BUTTON_WIDTH = 175;
const BUTTON_FONT_SIZE = 20;

export default function AddScreen() {

  const colorScheme = getColorScheme();
  const router = useRouter();

  

  const linkRecipe = () => {
    router.navigate("/add/details");
  }

  const writeRecipe = () => {
    router.navigate("/add/details");
  }

  return (
    <View style={MAIN_STYLE.container}>
      <Text style={style.title}>The Recipe Records</Text>
      <Text style={style.subtitle}>Submit a link</Text>
      <WebsiteInput/>
      <ButtonWrapper width={BUTTON_WIDTH} onPress={linkRecipe} backgroundColor={colorScheme.primary}>
        <Feather name={"send"} size={20} color={colorScheme.onPrimary}/>
        <Text style={{fontSize: BUTTON_FONT_SIZE, color: colorScheme.onPrimary}}>Go!</Text>
      </ButtonWrapper>
      <Text style={style.title}>OR</Text>
      <Text style={style.subtitle}>Write a recipe</Text>
      <ButtonWrapper width={BUTTON_WIDTH} onPress={writeRecipe} backgroundColor={colorScheme.primary}>
        <Feather name={"pen-tool"} size={20} color={colorScheme.onPrimary}/>
        <Text style={{fontSize: BUTTON_FONT_SIZE, color: colorScheme.onPrimary}}>New Recipe</Text>
      </ButtonWrapper>
    </View>
  );
}

export const style = StyleSheet.create({
  title:{
    fontSize: 100,
    textAlign: "center",
    //color: ThemeColors.coreColors.primary
  },
  subtitle:{
    fontSize: 40
  }
})
