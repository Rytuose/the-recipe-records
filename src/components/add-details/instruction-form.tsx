import { getColorScheme } from "@/constants/color-scheme";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = PropsWithChildren<{
    position: number
    initialText: string
    placeholder: string
    update: (position: number, value: string) => void
}>

export default function InstructionForm({position, initialText, placeholder, update}: Props){

    // When changing the font size/type, update initial height of text input
    const [inputHeight, setInputHeight] = useState(29);
    const [text, setText] = useState<string>(initialText);

    const colorScheme = getColorScheme();

    let prevHeight = inputHeight;

    return <TextInput
        style={[style.textInput,{height: inputHeight, backgroundColor:colorScheme.surfaceContainerHigh}]}
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
            update(position, text);
        }}
        />
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
        fontFamily:"Body"
    }
})