
import { IngredientPair } from "@/app/(tabs)/add/details";
import { Ingredient } from "@/recipe/ingredient";
import { Measurement } from "@/recipe/measurement";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import IngredientForm from "./ingredient-form";

type Props = {
    ingredients: IngredientPair[]
    setIngredients: (ingredient:IngredientPair[]) => void
}

export default function IngredientFromBuilder(props: Props){

    const {ingredients, setIngredients} = props;

    const keyCounter = useRef(0);
    

    const updateIngredient = (position: number, quantity: string, measurement: Measurement, ingredientName: string) => {
        

        const ingredient = ingredients[position].ingredient;
        const quantityInteger = parseFloat(quantity);
        
        if (ingredient.quantity === quantityInteger && ingredient.measurement === measurement && ingredient.name === ingredientName){
            return;
        }

        let newIngredients = ingredients.map((val, index) => {
            if(index === position){
                return {...val, ingredient: {
                    ...val.ingredient, 
                    quantity: quantityInteger, 
                    measurement: measurement,
                    name: ingredientName 
                }}
            }
            return val;
        })

        // Since newIngredients is not a state variable, we can modify it freely
        if (position === ingredients.length - 1){
            keyCounter.current++;
            newIngredients.push({ingredient: new Ingredient(), key: keyCounter.current});
        }
        if (quantityInteger === -1 && measurement === "" && ingredientName === ""){
            newIngredients = newIngredients.filter((val, index) => { return index !== position })
        }

        setIngredients(newIngredients);

    }

    return <View style={style.view}>
        {
            ingredients.map((value, index) => {  
                return <View key={value.key} style = {style.step}>
                    <IngredientForm 
                        position={index} 
                        initialQuantity={value.ingredient.quantity.toString()} 
                        initialMeasurement={value.ingredient.measurement} 
                        initialIngredient={value.ingredient.name}
                        update={updateIngredient}/>
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