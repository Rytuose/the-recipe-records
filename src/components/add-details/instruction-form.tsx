import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function InstructionForm(){

    // When changing the font size/type, update initial height of text input
    const [inputHeight, setInputHeight] = useState(29);

    let prevHeight = inputHeight;

    return <TextInput
        style={[style.textInput,{height: inputHeight}]}
        placeholder="Instruction Here"
        textAlignVertical="top"
        multiline
        onContentSizeChange={(event) => {
            let newHeight = event.nativeEvent.contentSize.height;
            if (newHeight < prevHeight){
                // Causes a re-trigger with the correct height?
                newHeight = 0;
            }
            setInputHeight(newHeight);
            prevHeight = newHeight;
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
    }
})