import WebsiteInput from "@/components/add/website-input";
import ButtonWrapper from "@/components/general/button-wrapper";
import { MAIN_STYLE } from "@/constants/styles";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const BUTTON_WIDTH = 175;
const BUTTON_FONT_SIZE = 20;

export default function AddScreen() {

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
      <ButtonWrapper width={BUTTON_WIDTH} onPress={linkRecipe}>
        <Feather name={"send"} size={20}/>
        <Text style={{fontSize: BUTTON_FONT_SIZE}}>Go!</Text>
      </ButtonWrapper>
      <Text style={style.title}>OR</Text>
      <Text style={style.subtitle}>Write a recipe</Text>
      <ButtonWrapper width={BUTTON_WIDTH} onPress={writeRecipe}>
        <Feather name={"pen-tool"} size={20}/>
        <Text style={{fontSize: BUTTON_FONT_SIZE}}>New Recipe</Text>
      </ButtonWrapper>
    </View>
  );
}

export const style = StyleSheet.create({
  title:{
    fontSize: 100,
    textAlign: "center"
  },
  subtitle:{
    fontSize: 40
  },
  textInput:{
    backgroundColor: '#41852d'
  }
})
