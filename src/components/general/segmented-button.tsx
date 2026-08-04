import { getColorScheme } from "@/constants/color-scheme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { applyNumberRegex } from "../misc/number-regex";


const BORDER_WIDTH = 3;
const BORDER_RADIUS = 25;
const PADDING = 10;

type Props = {
    options: string[]
    selectedIndex: number,
    lastCustom: boolean,
    fallbackIndex: number
    onIndexChange: (index:number) => void
    onCustomChange?: (value:number) => void
}

export default function SegmentedButton({options, selectedIndex, lastCustom, fallbackIndex, onIndexChange, onCustomChange}: Props){

    const [customSelected, setCustomSelected] = useState<boolean>(false);
    const [customValue, setCustomValue] = useState<string>("");
    const colorScheme = getColorScheme();

    const changeSelection = (index:number) => {
        if (selectedIndex !== index){
            if(lastCustom && index === options.length - 1){
                console.log("Custom selected");
                setCustomSelected(true);
                setCustomValue("");
                onCustomChange!(1);
            }
            else if (customSelected){
                setCustomSelected(false);
            }
            onIndexChange(index);
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
                    {!(index === options.length - 1 && customSelected) && 
                    <Text style={[style.text,{color:(index === selectedIndex)?colorScheme.onSecondary:'black'}]}>
                        {value}
                    </Text>}
                    {(index === options.length - 1 && customSelected) && 
                    <View>
                        {/*TODO: See if text input can stretch horizontally with larger custom values; allow fractions*/}
                        <TextInput
                            style={[style.textInput, {color: colorScheme.onSecondary}]}
                            value={customValue}
                            onFocus={() => {
                                setCustomValue(applyNumberRegex(customValue));
                            }}
                            onChangeText={(text) => {
                                setCustomValue(applyNumberRegex(text))
                            }}
                            onBlur={() => {
                                let customNumber = Number.parseFloat(customValue);
                                if(Number.isNaN(customNumber)){
                                    changeSelection(fallbackIndex);
                                }
                                else{
                                    setCustomValue(customValue + "x")
                                }
                                onCustomChange!(customNumber);
                                
                            }}
                            keyboardType="numeric"
                            autoFocus
                        /> 
                    </View>
                    }
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
        fontSize: 17,
        fontFamily:"Body"
    },
    textInput:{
        width: 63,
        fontSize: 17,
        fontFamily:"Body",
        borderWidth: 0,
        textAlign:'center',
        outlineStyle: 'none' as any,
    }
})