import { getColorScheme } from "@/constants/color-scheme";
import { RecipeSearchCriteria } from "@/recipe/recipe";
import { BottomSheet } from '@expo/ui';
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ButtonWrapper from "../general/button-wrapper";
import RecipeFilter from "./recipe-filter";

const ICON_DIMENSION = 36;
const ICON_SIZE = 24;

type Props = {
  setCriteria: (recipes: RecipeSearchCriteria) => void
}

export default function SearchBar({setCriteria} : Props){

    const [searchVal, setSearchVal] = useState<string>("")
    const [isPresented, setIsPresented] = useState<boolean>(false)
    const colorScheme = getColorScheme();

    const filterPress = () => {
      console.log("Filter press");
      setIsPresented(true);
      //Bottom Sheet
    };

    const searchPress = async () => {
      console.log("Search press " + searchVal);
      setCriteria({name: searchVal});
    }

    return <View style = {[style.view, {backgroundColor:colorScheme.surfaceContainerHigh}]}>
      <BottomSheet isPresented={isPresented} onDismiss={() => {setIsPresented(false)}}>
        <RecipeFilter/>
      </BottomSheet>
      <ButtonWrapper width={ICON_DIMENSION} height={ICON_DIMENSION} noBorder={true} onPress={filterPress}>
        <Feather name="filter" size={ICON_SIZE}/>
      </ButtonWrapper>
      <TextInput
          style={style.textInput}
          defaultValue={searchVal}
          onChangeText={setSearchVal}
          placeholder="Recipe Name Here"
          onSubmitEditing={searchPress}
      />
      <ButtonWrapper width={ICON_DIMENSION} height={ICON_SIZE} noBorder={true} onPress={searchPress}>
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
    flexDirection: 'row',

  },
  textInput:{
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 3,
    borderWidth: 0,
    outlineStyle: 'none' as any,
    fontFamily: "Body"
  }
})
