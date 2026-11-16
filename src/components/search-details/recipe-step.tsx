import { StyleSheet, Text, View } from "react-native";
import Checkbox from "./checkbox";

type Props = {
    text: string
}

export default function RecipeStep({text}:Props){
    
    return <View style={style.view}>
        <Checkbox checkboxSize={30}/>
        <Text style={[style.text]}>{text}</Text>
    </View>
}

export const style = StyleSheet.create({
    view:{
        gap: 7,
        flexDirection: 'row',
    },
    text:{
        fontSize: 20,
        marginTop: 1,
        fontFamily:"Body",
        flexShrink: 1,
        //@ts-ignore
        wordBreak: 'break-all'
    }
})