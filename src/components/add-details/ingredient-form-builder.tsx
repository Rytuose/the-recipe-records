
import { IngredientPair } from "@/app/(tabs)/add/details";
import { INGREDIENT_HEIGHT } from "@/constants/constants";
import { Ingredient } from "@/recipe/ingredient";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import IngredientForm from "./ingredient-form";

type Props = {
    ingredients: IngredientPair[]
    setIngredients: (ingredient:IngredientPair[]) => void
}

const INGREDIENT_GAP = 5;

export default function IngredientFromBuilder(props: Props){

    const {ingredients, setIngredients} = props;

    const keyCounter = useRef(0);

    const [selectedInstruction, setSelectedInstruction] = useState(-1);
    const translateY = useSharedValue(Array(ingredients.length).fill(0));
    const lowerBound = useSharedValue(0);
    const upperBound = useSharedValue(0);
    const shiftAmount = useSharedValue(0);
    
    const updateIngredient = (position: number, quantity: string, measurement: string, ingredientName: string) => {
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
            translateY.value = [...translateY.value, 0];
        }
        if (quantityInteger === -1 && measurement === "" && ingredientName === ""){
            newIngredients = newIngredients.filter((val, index) => { return index !== position })
            translateY.value = translateY.value.filter((val, index) => {return index !== position})
        }

        setIngredients(newIngredients);

    }

    const select = (position:number) => {
        if (selectedInstruction > 0){
            return;
        }
        
        setSelectedInstruction(position);
        shiftAmount.value = 0;

        let lower =  - position * (INGREDIENT_HEIGHT + INGREDIENT_GAP);
        let upper = (ingredients.length - 2 - position) * (INGREDIENT_HEIGHT + INGREDIENT_GAP)

        lowerBound.value = lower;
        upperBound.value = upper;
    }

    const onShift = (position: number, shift: number) => {

        let swapHeight = INGREDIENT_GAP + INGREDIENT_HEIGHT
        let firstPos = -1;
        let lastNeg = -1;
        let above = -1;
        let below = -1;
        let aboveHeight = 0;
        let belowHeight = 0;
        let height = 0;

        translateY.value.forEach((val, index) => {
            if(index === position){
                return;
            }

            if(val < 0){
                lastNeg = index;
            }
            else if(val > 0 && firstPos === -1){
                firstPos = index;
            }
        })
        
        if (firstPos !== -1){
            above = firstPos - 1;
            below = firstPos;
        }
        else if(lastNeg !== -1 ){
            above = lastNeg;
            below = lastNeg + 1;
        }
        else{
            above = position - 1;
            below = position + 1;
        }

        ingredients.forEach((val, index) => {
            if(index < position){
                height += swapHeight;
            }
            if(index < above){
                aboveHeight += swapHeight;
            }
            if(index < below){
                belowHeight += swapHeight;
            }
        })

        let newShift = translateY.value[position];

        newShift += shift;
        newShift = Math.min(newShift, upperBound.value);
        newShift = Math.max(newShift, lowerBound.value);

        if (above >= 0){
            let upperShiftThreshold = height - aboveHeight - translateY.value[above];
            if (-newShift >= upperShiftThreshold){
                translateY.value = translateY.value.map((val, index) => {
                    if(index === above){
                        return val + swapHeight;
                    }
                    return val;
                })
                shiftAmount.value -= 1;
            }  
        }
        if (below <= ingredients.length - 2){
            let lowerShiftThreshold = belowHeight + translateY.value[below] - height
            if(newShift >= lowerShiftThreshold){
                translateY.value = translateY.value.map((val, index) => {
                    if(index === below){                    
                        return val - swapHeight;
                    }
                    return val;
                })
                shiftAmount.value += 1;

            }
        }

        translateY.value = translateY.value.map((val, index) => {
            if(index === position){
               return newShift; 
            }  
            return val;
        })
    }

    const finalize = (position: number) => {
        if (selectedInstruction !== position){
            return;
        }
        
        translateY.value = translateY.value.map(() => {
            return 0;
        })
        
        let destination = position + shiftAmount.value;
        let leftBound = (shiftAmount.value < 0)?destination:position;
        let rightBound = (shiftAmount.value < 0)?position:destination;
        let direction = (shiftAmount.value < 0)?-1:1;

        let newInstructions = ingredients.map((val, index) => {
            if(index === destination){
                return ingredients[position]
            }
            if(index >= leftBound && index <= rightBound){     
                return ingredients[index + direction]
            }
            return val;
        })

        setIngredients(newInstructions)

        setSelectedInstruction(-1);
    }


    return <View style={style.view}>
        {
            ingredients.map((value, index) => {  
                return <View key={value.key} style={{zIndex: (selectedInstruction === index)?1:0}}>
                    <IngredientForm 
                        position={index} 
                        initialQuantity={value.ingredient.quantity.toString()} 
                        initialMeasurement={value.ingredient.measurement} 
                        initialIngredient={value.ingredient.name}
                        translateY={translateY}
                        moveable={index !== ingredients.length-1}
                        select={ select }
                        shift={ onShift }
                        finalize={ finalize }
                        update={updateIngredient}/>
                </View>
            })
        }
    </View>

}

export const style = StyleSheet.create({
    view:{
        gap: INGREDIENT_GAP,
    }
})