import { getColorScheme } from "@/constants/color-scheme";
import { useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { applyNumberRegex } from "../misc/number-regex";


const BORDER_WIDTH = 3;
const BORDER_RADIUS = 25;
const PADDING = 10;
const INPUT_PADDING = 14;

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
    const [textInputWidth, setTextInputWidth] = useState<number>(0);
    const [customFocused, setCustomFocused] = useState<boolean>(false);
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

    const onLayout = (event:LayoutChangeEvent) => {
        let width = event.nativeEvent.layout.width;
        console.log(width);
        setTextInputWidth(width);
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
                    //paddingHorizontal: (start || end)? PADDING: 0,
                    paddingLeft: (start || end)? PADDING: 0,
                    paddingRight: (start || (end && !customSelected) || (end && !customFocused) )? PADDING:0,
                    backgroundColor: (index === selectedIndex)?colorScheme.secondary:undefined
                }]}>
                    {!(index === options.length - 1 && customSelected) && 
                    <Text style={[style.text,{color:(index === selectedIndex)?colorScheme.onSecondary:'black'}]}>
                        {value}
                    </Text>}
                    {(index === options.length - 1 && customSelected) && 
                    <View>
                        <Text style={[style.text, {alignSelf:'flex-start', position:'absolute', color:"#00000000", pointerEvents: 'none'}]} 
                        selectable={false} 
                        onLayout={onLayout}>
                            {customValue}
                        </Text>
                        <TextInput
                            style={[style.textInput, 
                                {color: colorScheme.onSecondary,
                                width: (customFocused)?Math.max(73, textInputWidth + INPUT_PADDING):Math.max(63, textInputWidth), 
                                textAlign:(customFocused)?"left":"center" }]}
                            value={customValue}
                            onFocus={() => {
                                setCustomFocused(true);
                                setCustomValue(applyNumberRegex(customValue));
                            }}
                            onChangeText={(text) => {
                                setCustomValue(applyNumberRegex(text))
                            }}
                            onBlur={() => {
                                let customNumber = Number.parseFloat(customValue);
                                setCustomFocused(false);
                                if(Number.isNaN(customNumber)){
                                    //changeSelection(fallbackIndex);
                                    setCustomValue("1x")
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
        flexDirection: 'row'
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
        fontFamily:"Body",
    },
    textInput:{
        width: 63,
        flex: 1,
        fontSize: 17,
        fontFamily:"Body",
        borderWidth: 0,
        //textAlign:'left',
        outlineStyle: 'none' as any,
    }
})