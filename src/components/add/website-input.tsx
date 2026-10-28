import { getColorScheme } from "@/constants/color-scheme";
import { StyleSheet, TextInput } from "react-native";

type Props = {
  data: string,
  setData: (data:string) => void
}

export default function WebsiteInput({data, setData}: Props){
  const colorScheme = getColorScheme();

  return <TextInput
    style={[style.textInput, {backgroundColor:colorScheme.surfaceContainerHigh}]}
    value={data}
    onChangeText={(value) => {setData(value)}}
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
    padding: 20,
    fontFamily: "Body"
  }
})
