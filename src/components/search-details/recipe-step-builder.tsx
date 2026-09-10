import { StyleSheet, View } from "react-native";
import RecipeStep from "./recipe-step";


type Props = {
    recipeSteps:string[]
}

export default function RecipeStepBuilder({recipeSteps}:Props){

    return <View style={style.view}>
        {recipeSteps.map((value, index) => {return <RecipeStep key={index} text={value}/>})}
    </View>

}

export const style = StyleSheet.create({
    view:{
        gap: 10,
    }
})