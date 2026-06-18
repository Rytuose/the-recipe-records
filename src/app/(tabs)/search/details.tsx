import ImageDisplay from "@/components/details/image-display";
import ButtonWrapper from "@/components/general/button-wrapper";
import Category from "@/components/general/category";
import SegmentedButton from "@/components/general/segmented-button";
import RecipeStepBuilder from "@/components/search-details/recipe-step-builder";
import { MainStyle } from "@/constants/styles";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

const HORIZONTAL_MARGIN = 15;

export default function DetailScreen() {

  const {width} = useWindowDimensions();

  const onEdit = () => {

  }

  const onDelete = () => {

  }

  return (
    <>
      <Stack.Screen options={{
        title: "Food Name?", 
        headerTitleAlign:'center', 
        headerTitleStyle: style.title,
      }}/>
      <View style={MainStyle.scrollContainer}>
        <ScrollView 
        style = {{width: width}}
        contentContainerStyle={style.scrollView}>
          <Text style={style.text}>{"From: Website\nBy: Author"}</Text>
          <View style={[style.row,{flexWrap: 'wrap'}]}>
            <Category editable={true}/>
            <Category/>
          </View>
          <ImageDisplay/>
          <View style={style.row}>
            <ButtonWrapper width={100} height={37} onPress={onEdit}>
              <Feather name='edit' size={20}/>
              <Text style={style.buttonText}>Edit</Text>
            </ButtonWrapper>
            <ButtonWrapper width={100} height = {37} onPress={onDelete}>
              <Ionicons name='trash-outline' size={22}/>
              <Text style={style.buttonText}>Delete</Text>
            </ButtonWrapper>
          </View>
          <View style={{marginHorizontal: HORIZONTAL_MARGIN}}>
            <SegmentedButton options={["0.5x", "1x", "2x", "Custom"]}/>
          </View>
          <View style={style.section}>
            <Text style={style.subtitle}>Ingredients</Text>
            <RecipeStepBuilder/>
          </View>
          <View style={style.section}>
            <Text style={style.subtitle}>Instructions</Text>
            <RecipeStepBuilder/>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export const style = StyleSheet.create({
  title: {
    fontSize: 30
  },
  subtitle:{
    fontSize: 25
  },
  text:{
    marginHorizontal: HORIZONTAL_MARGIN,
    fontSize: 15
  },
  scrollView:{
    marginVertical: 10,
    gap: 15
  },
  section:{
    marginHorizontal: HORIZONTAL_MARGIN,
    gap: 15
  },
  row:{
    marginHorizontal: HORIZONTAL_MARGIN,
    flexDirection: 'row',
    gap: 10
  },
  buttonText:{
    fontSize: 15
  }

})
