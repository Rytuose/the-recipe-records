import { Text, TextInput } from "@expo/ui";
import { StyleSheet, View } from "react-native";



export default function RecipeFilter(){
    return <View style={style.view}>
        <Text textStyle={style.title}>Recipe Filter</Text>
        <View style={style.horizontalPair}>
            <Text textStyle={style.section}>Cooking Time</Text>
            <TextInput textStyle={style.textInput}/>
        </View>
        <Text textStyle={style.section}>Starred</Text>
    </View>
}

export const style = StyleSheet.create({
    view:{
        gap: 10
    },
    horizontalPair:{
        flexDirection: 'row',
        gap: 15
    },
    textInput:{
        width: '100%',
        fontSize: 20,
        color: 'white',
        fontFamily: "Body"
    },
    title:{
        fontFamily: "Title",
        fontSize: 30
    },
    section:{
        fontFamily: "Subtitle",
        fontSize: 20,
        width: 200,
    }
})