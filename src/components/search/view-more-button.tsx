import { getColorScheme } from "@/constants/color-scheme";
import { MAIN_STYLE } from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    viewMore: () => void
}

export default function ViewMoreButton({viewMore}:Props){

    const colorScheme = getColorScheme();
    console.log("Rendering view more?");
    

    return <View style={[MAIN_STYLE.recipeSummaryView, {backgroundColor: colorScheme.secondary}]}>
        <Pressable
        style={MAIN_STYLE.recipeSummaryButton}
        onPress={() => {viewMore()}}>
            <View style={style.horizontalView}>
                <Text style={[style.text, {color:colorScheme.onSecondary}]}>View More </Text>
                <Ionicons name="caret-down" color={colorScheme.onSecondary} size={50}/>
            </View>
        </Pressable>
    </View>
}

export const style = StyleSheet.create({
    horizontalView:{
        flexDirection:'row',
        alignSelf:'center'
    },
    text:{
        fontSize: 40,
        fontFamily:"Subtitle",
    }
})