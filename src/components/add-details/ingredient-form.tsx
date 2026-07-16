import { getColorScheme } from "@/constants/color-scheme";
import { Measurement, MEASUREMENT_NAMES } from "@/recipe/measurement";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";


const HEIGHT = 30

type Props = {
    position: number
    initialQuantity: string
    initialMeasurement: Measurement
    initialIngredient: string
    update: (position: number, quantity: string, measurement: Measurement, ingredient: string) => void
}

export default function IngredientForm({position, initialQuantity, initialMeasurement, initialIngredient, update}: Props){
    
    const [quantity, setQuantity] = useState<string>(initialQuantity);

    const measurement = useRef<Measurement>(initialMeasurement);
    const [measurementText, setMeasurementText] = useState<string>(initialMeasurement);

    const [ingredient, setIngredient] = useState<string>(initialIngredient);

    const colorScheme = getColorScheme();

    return <View style={style.view}>
        <TextInput 
            style={[style.number, {backgroundColor:colorScheme.surfaceContainerHigh}]}
            keyboardType="numeric"
            placeholder="Quantity"
            value = {(quantity === '-1')? "" : quantity}
            onChangeText={(text) => {
                const number = text.replaceAll(/[^0-9.]/g,"")
                const decimalSplit = number.split('.')
                setQuantity((decimalSplit.length > 1)?decimalSplit[0] + '.' + decimalSplit[1]:decimalSplit[0]);
            }}
            onBlur={() => {
                let val = (quantity.length === 0)? -1: parseFloat(quantity);
                val = (val === 0)? -1: val;
                setQuantity(val.toString());
                update(position, val.toString(), measurement.current, ingredient);
            }}
        />
        {/*TODO: Change to a search bar + dropdown hybrid with additional mappings*/}
        <TextInput 
            style={[style.measurement,{backgroundColor:colorScheme.surfaceContainerHigh}]}
            placeholder="Measurement"
            value={measurementText}
            onChangeText={setMeasurementText}
            onBlur={() => {
                const text = measurementText.trim().toLowerCase();
                let valid = false;
                MEASUREMENT_NAMES.forEach((value) => {
                    if(value.toLowerCase() === text){
                        valid = true;
                        setMeasurementText(value);
                        measurement.current = value;
                    }
                })
                if( !valid ){
                    setMeasurementText(measurement.current);
                }
                else{
                    // Has accurate information since measurement.current is not a state variable and
                    // therefore does not have a delay before updating
                    update(position, quantity, measurement.current, ingredient);
                }
            }}

        />
        <TextInput 
            style={[style.ingredient, {backgroundColor:colorScheme.surfaceContainerHigh}]}
            placeholder="Ingredient"
            value = {ingredient}
            onChangeText={setIngredient}
            onBlur={() => {
                update(position, quantity, measurement.current, ingredient);
            }}
        />
    </View>
}

export const style = StyleSheet.create({
    view:{
        width: '100%',
        flexDirection: 'row',
        gap: 10
    },
    number:{
        width: '15%',
        borderWidth: 2,
        height: HEIGHT,
        padding: 5,
    },
    measurement: {
        width: '25%',
        borderWidth: 2,
        height: HEIGHT,
        padding: 5,
    },
    ingredient:{
        borderWidth: 2,
        height: HEIGHT,
        padding: 5,
        flex: 1
    }
})