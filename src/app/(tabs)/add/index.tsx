import WebsiteInput from "@/components/add/website-input";
import Button from "@/components/general/button";
import { MainStyle } from "@/constants/screen_styles";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AddScreen() {

  const router = useRouter();

  var buttonWidth = 175;

  const linkRecipe = () => {
    router.navigate("/add/details");
  }

  const writeRecipe = () => {
    router.navigate("/add/details");
  }

  return (
    <View style={MainStyle.container}>
      <Text style={style.title}>The Recipe Records</Text>
      <Text style={style.subtitle}>Submit a link</Text>
      <WebsiteInput/>
      <Button label={"Go!"} width={buttonWidth} iconNameFeather="send" onPress={linkRecipe}/>
      <Text style={style.title}>OR</Text>
      <Text style={style.subtitle}>Write a recipe</Text>
      <Button label={"New Recipe"} width={buttonWidth} iconNameFeather="pen-tool" onPress={writeRecipe}/>
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
