import { getColorScheme } from "@/constants/color-scheme";
import { StyleSheet, TextInput } from "react-native";

export default function WebsiteInput(){
  const colorScheme = getColorScheme();

  return <TextInput
    style={[style.textInput, {backgroundColor:colorScheme.surfaceContainerHigh}]}
    defaultValue=""
    placeholder="Link Here"
  />
}

export const style = StyleSheet.create({
  textInput:{
    width: '50%',
    height: 50,
    borderRadius: 25,
    borderColor: "#000000",
    borderWidth: 3,
    fontSize: 20,
    padding: 20
  }
})
