import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, View } from "react-native";
import ButtonWrapper from "../general/button-wrapper";

const ICON_DIMENSION = 36;
const ICON_SIZE = 24;

export default function SearchBar(){

    const filterPress = () => {

    };

    const searchPress = () => {

    }

    return <View style = {style.view}>
      <ButtonWrapper width={ICON_DIMENSION} height={ICON_DIMENSION} noBackground={true} onPress={filterPress}>
        <Feather name="filter" size={ICON_SIZE}/>
      </ButtonWrapper>
      <TextInput
          style={style.textInput}
          defaultValue=""
          placeholder="Recipe Name Here"
      />
      <ButtonWrapper width={ICON_DIMENSION} height={ICON_SIZE} noBackground={true} onPress={searchPress}>
        <Ionicons name="search-sharp" size={ICON_SIZE}/>
      </ButtonWrapper>
    </View>
    
}


export const style = StyleSheet.create({
  view:{
    width: '80%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 10,
    borderColor: "#000000",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  textInput:{
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 3,
    borderWidth: 0,
    outlineStyle: 'none' as any
  }
})
