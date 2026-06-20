import { StyleSheet, TextInput, View } from "react-native";


const HEIGHT = 30

export default function IngredientForm(){
    
    return <View style={style.view}>
        {/*TODO: Check if quantity is a number on submit*/}
        <TextInput 
            style={style.number}
            keyboardType="numeric"
            placeholder="Quantity"
            //onChangeText={() => {}}
        />
        {/*TODO: Change to a search bar + dropdown hybrid*/}
        <TextInput 
            style={style.measurement}
            placeholder="Measurement"
        />
        <TextInput 
            style={style.ingredient}
            placeholder="Ingredient"
            //onChangeText={() => {}}
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