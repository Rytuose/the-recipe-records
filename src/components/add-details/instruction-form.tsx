import { MAIN_STYLE } from "@/constants/styles";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

type Props = PropsWithChildren<{
    position: number
    initialText: string
    placeholder: string
    translateY: SharedValue<number[]>
    moveable: boolean
    select: (position: number) => void
    shift: (position: number, translateY: number) => void
    finalize: (position: number) => void
    update: (position: number, value: string, height:number) => void
}>

export default function InstructionForm({position, initialText, placeholder, translateY, moveable, select, shift, finalize, update}: Props){

    const [inputHeight, setInputHeight] = useState(0);
    const [text, setText] = useState<string>(initialText);

    let prevHeight = inputHeight;

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

    return <Animated.View style={[style.view, viewStyle, {height: inputHeight}]}>
        <TextInput
            style={[style.textInput,{height: inputHeight}]}
            placeholder={placeholder}
            value = {text}
            textAlignVertical="top"
            multiline
            onChangeText={setText}
            onContentSizeChange={(event) => {
                let newHeight = event.nativeEvent.contentSize.height;
                if (newHeight < prevHeight){
                    // Causes a re-trigger with the correct height
                    newHeight = 0;
                }
                setInputHeight(newHeight);
                prevHeight = newHeight;
            }}
            onBlur={() => {
                update(position, text, inputHeight);
            }}
            />
        {moveable && <GestureDetector gesture={drag}>
            <View style={[MAIN_STYLE.rearrange,{height: inputHeight}]}/>
        </GestureDetector>}
    </Animated.View>
}

export const style = StyleSheet.create({
    textInput:{
        flexDirection: 'row',
        flex: 1,
        height: 90,
        borderWidth: 2,
        padding: 5,
        paddingBottom: 10,
        overflow: 'hidden',
    },
    view:{
        flex: 1,
        flexDirection: 'row',
    }
})