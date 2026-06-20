import IngredientFormBuilder from "@/components/add-details/ingredient-form-builder";
import InstructionFormBuilder from "@/components/add-details/instruction-form-builder";
import ImageDisplay from "@/components/details/image-display";
import ButtonWrapper from "@/components/general/button-wrapper";
import Category from "@/components/general/category";
import { DETAIL_HORIZONTAL_MARGIN, MAIN_STYLE } from "@/constants/styles";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function AddDetailScreen() {

  const {width} = useWindowDimensions();

  const editTitle = () => {

  }

  const addRecipe = () => {

  }

  const cancelRecipe = () => {

  }

  return (
    <>
      <Stack.Screen options={{
        headerTitle: () => {
          return <View style={{flexDirection:'row', gap: 5}}>
            <Text style={style.title}>Food Name?</Text>
            <ButtonWrapper width={40} onPress={editTitle} noBackground={true}>
              <Feather name="edit" size={24}/>
            </ButtonWrapper>
          </View>
        },
        headerTitleAlign:'center', 
        headerTitleStyle: style.title,
      }}/>
      <View style={MAIN_STYLE.scrollContainer}>
        <ScrollView 
        style = {{width: width}}
        contentContainerStyle={style.scrollView}>
          <Text style={style.text}>{"From: Website\nBy: Author"}</Text>
          <Text style={[style.subtitle, {marginHorizontal: DETAIL_HORIZONTAL_MARGIN}]}>Categories</Text>
          <View style={[style.row,{flexWrap: 'wrap'}]}>
            <Category editable={true}/>
            <Category editable={true}/>
            <Category categoryAdd={true}/>
          </View>
          <ImageDisplay/>
          <View style={style.section}>
            <Text style={style.subtitle}>Ingredients (1x)</Text>
            <IngredientFormBuilder/>
          </View>
          <View style={style.section}>
            <Text style={style.subtitle}>Instructions</Text>
            <InstructionFormBuilder/>
          </View>
          <View style={[style.buttonRow]}>
            <ButtonWrapper width={'40%'} onPress={cancelRecipe}>
              <Text style={{fontSize: 20}}>Cancel</Text>
              <Ionicons name="close" size={24}/>
            </ButtonWrapper>
            <ButtonWrapper width={'40%'} onPress={addRecipe}>
              <Text style={{fontSize: 20}}>Add Recipe</Text>
              <Ionicons name="add" size={24}/>
            </ButtonWrapper>
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
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    fontSize: 15
  },
  scrollView:{
    marginVertical: 10,
    gap: 15
  },
  section:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    gap: 15
  },
  row:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    flexDirection: 'row',
    gap: 10
  },
  buttonRow:{
    marginHorizontal: DETAIL_HORIZONTAL_MARGIN,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '10%'
  },
  buttonText:{
    fontSize: 15
  }
})
