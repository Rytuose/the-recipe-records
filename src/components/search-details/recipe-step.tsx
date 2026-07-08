import { StyleSheet, Text, View } from "react-native";
import Checkbox from "./checkbox";

type Props = {
    text: string
}

export default function RecipeStep({text}:Props){
    return <View style={style.view}>
        <Checkbox checkboxSize={30}/>
        {/*TODO: Wrapping works with long string but not long words with no spaces to break*/}
        <Text style={style.text}>{text}</Text>
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
        
    }
})