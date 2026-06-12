import { StyleSheet, TextInput } from "react-native"

export default function WebsiteInput(){
  return <TextInput
    style={style.textInput}
    defaultValue=""
    placeholder="Link Here"
  />
}

export const style = StyleSheet.create({
  textInput:{
    width: 400,
    height: 50,
    borderRadius: 25,
    borderColor: "#000000",
    borderWidth: 3,
    fontSize: 20,
    padding: 20
  }
})
