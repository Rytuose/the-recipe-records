
import { StyleSheet, View } from "react-native"
import IngredientForm from "./ingredient-form"

export default function IngredientFromBuilder(){

const ingredients = [1,2,3,4,5,6,7]

    return <View style={style.view}>
        {
            ingredients.map((value, index) => {
                return <View key={index} style = {style.step}>
                    <IngredientForm/>
                </View>
            })
        }
    </View>

}

export const style = StyleSheet.create({
    view:{
        gap: 5,
    },
    step:{
        flexDirection: 'row',
        gap: 10
    }
})