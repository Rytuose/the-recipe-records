import { NotificationContext } from "@/app/_layout";
import { getColorScheme } from "@/constants/color-scheme";
import { INGREDIENT_HEIGHT } from "@/constants/constants";
import { MAIN_STYLE } from "@/constants/styles";
import { validMeasurement } from "@/recipe/measurement";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import ButtonWrapper from "../general/button-wrapper";
import { applyNumberRegex } from "../misc/number-regex";



type Props = {
    position: number
    initialQuantity: string
    initialMeasurement: string
    initialIngredient: string
    translateY: SharedValue<number[]>
    moveable: boolean
    select: (position: number) => void
    shift: (position: number, translateY: number) => void
    finalize: (position: number) => void
    update: (position: number, quantity: string, measurement: string, ingredient: string) => void
}

export default function IngredientForm({position, initialQuantity, initialMeasurement, initialIngredient, translateY, moveable,  select, shift, finalize, update}: Props){
    
    const [quantity, setQuantity] = useState<string>(initialQuantity);
    const [measurementText, setMeasurementText] = useState<string>(initialMeasurement);
    const [ingredient, setIngredient] = useState<string>(initialIngredient);
    const [measurementOpen, setMeasurementOpen] = useState<boolean>(false);
    const notificationUpdate = useContext(NotificationContext);

    const colorScheme = getColorScheme();

    const drag = Gesture.Pan().onChange((event) => {
            shift(position, event.changeY);
        }).onEnd(() => {
            finalize(position);
        }).onStart(() => {
            select(position);
        })

    const viewStyle = useAnimatedStyle(() => {  
        return {
            transform:[{
                translateY: translateY.value[position]
            }]
        }
    })

    const displayInvalid = () => {
        notificationUpdate("This is not a recognized measurement and will not be considered when filtering by an amount of an ingredient.")
    }

    return <Animated.View style={[style.view, viewStyle]}>
        <TextInput 
            style={[style.number, {backgroundColor:colorScheme.surfaceContainerHigh}]}
            keyboardType="numeric"
            placeholder="Quantity"
            value = {(quantity === '-1')? "" : quantity}
            onChangeText={(text) => {
                setQuantity(applyNumberRegex(text));
            }}
            onBlur={() => {
                let val = (quantity.length === 0)? -1: parseFloat(quantity);
                val = (val === 0)? -1: val;
                setQuantity(val.toString());
                update(position, val.toString(), measurementText, ingredient);
            }}
        />
        <View style={style.measurementContainer}>
            <TextInput
                style={[style.measurement,{backgroundColor:colorScheme.surfaceContainerHigh}]}
                placeholder="Measurement"
                value={measurementText}
                onChangeText={(value) => {
                    setMeasurementText(value);                    
                }}
                onFocus={() => {setMeasurementOpen(true);}}
                onBlur={() => {
                    setMeasurementOpen(false);
                    update(position, quantity, measurementText, ingredient);
                }}
            />
            {!measurementOpen && !validMeasurement(measurementText) &&
            <ButtonWrapper width={24} height={INGREDIENT_HEIGHT} noBorder={true} onPress={displayInvalid}>
                <AntDesign name="exclamation-circle" size={24} color="black" />
            </ButtonWrapper>}
        </View>
        <View style={style.ingredientContainer}>
            <TextInput
                style={[style.ingredient, {backgroundColor:colorScheme.surfaceContainerHigh}]}
                placeholder="Ingredient"
                value = {ingredient}
                onChangeText={setIngredient}
                onBlur={() => {
                    update(position, quantity, measurementText, ingredient);
                }}
            />
            {moveable && <GestureDetector gesture={(drag)}>
                <View style={[MAIN_STYLE.rearrange,{height: INGREDIENT_HEIGHT}]}>
                    <AntDesign name="holder" size={24} color={colorScheme.onPrimary}/>
                </View>
            </GestureDetector>}
        </View>
    </Animated.View>
}

export const style = StyleSheet.create({
    view:{
        width: '100%',
        flexDirection: 'row',
        gap: 10,
    },
    number:{
        width: '15%',
        borderWidth: 2,
        height: INGREDIENT_HEIGHT,
        padding: 5,
        fontFamily:"Body"
    },
    measurementContainer:{
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    measurement: {
        width: '100%',
        borderWidth: 2,
        height: INGREDIENT_HEIGHT,
        padding: 5,
        fontFamily:"Body",
    },
    ingredientContainer:{
        flexDirection: 'row', 
        flex: 1
    },
    ingredient:{
        borderWidth: 2,
        height: INGREDIENT_HEIGHT,
        padding: 5,
        fontFamily:"Body",
        flex: 1
    }
})