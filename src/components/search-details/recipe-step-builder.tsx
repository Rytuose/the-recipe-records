import { StyleSheet, View } from "react-native";
import RecipeStep from "./recipe-step";



export default function RecipeStepBuilder(){
    const recipeSteps = [1,2,3,4,5,6,7,8,9];

    return <View style={style.view}>
        {recipeSteps.map(value => {return <RecipeStep key={value}/>})}
    </View>

}

export const style = StyleSheet.create({
    view:{
        gap: 10,
    }
})