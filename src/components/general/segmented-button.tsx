import { getColorScheme } from "@/constants/color-scheme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


const BORDER_WIDTH = 3;
const BORDER_RADIUS = 25;
const PADDING = 10;

type Props = {
    options: string[]
}

export default function SegmentedButton({options}: Props){

    const [selectedIndex, setSelectedIndex] = useState<number>(1);

    const colorScheme = getColorScheme();

    const changeSelection = (index:number) => {
        if (selectedIndex !== index){
            setSelectedIndex(index);
        }
    }

    return <View style = {style.row}>
        {options.map((value, index) => 
            {
                const start = index === 0;
                const end = index === options.length-1;

                return <Pressable key={index} onPress={() => {changeSelection(index)}} style={[style.node, {
                    borderRightWidth: (end)?BORDER_WIDTH:0,
                    borderTopLeftRadius: (start)?BORDER_RADIUS:0,
                    borderBottomLeftRadius: (start)?BORDER_RADIUS:0,
                    borderTopRightRadius: (end)?BORDER_RADIUS:0,
                    borderBottomRightRadius: (end)?BORDER_RADIUS:0,
                    paddingHorizontal: (start || end)? PADDING: 0,
                    backgroundColor: (index === selectedIndex)?colorScheme.secondary:undefined
                }]}>
                    <Text style={[style.text,{color:(index === selectedIndex)?colorScheme.onSecondary:'black'}]}>{value}</Text>
                </Pressable>
            })}
    </View>
}

export const style = StyleSheet.create({
    row:{
        flexDirection: 'row',
    },
    node:{
        minWidth: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderTopWidth: BORDER_WIDTH,
        borderBottomWidth: BORDER_WIDTH,
        borderLeftWidth: BORDER_WIDTH,
    },
    text:{
        fontSize: 17
    }
})