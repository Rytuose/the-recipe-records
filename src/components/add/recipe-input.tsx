import { getColorScheme } from "@/constants/color-scheme";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  data: string,
  setData: (data:string) => void
}

export default function RecipeInput({data, setData}: Props){
  const colorScheme = getColorScheme();

  return <View style={{width: '75%', height: 150}}>
      <TextInput
        style={[style.textInput, {backgroundColor:colorScheme.surfaceContainerHigh}]}
        value={data}
        multiline
        onChangeText={(value) => {setData(value)}}
        placeholder="Place your recipe here"
      />
  </View>
}

export const style = StyleSheet.create({
  textInput:{
    width: '100%',
    height: '100%',
    borderRadius: 25,
    borderColor: "#000000",
    borderWidth: 3,
    fontSize: 20,
    padding: 15,
    fontFamily: "Body",
    textAlign:'left'
  }
})
