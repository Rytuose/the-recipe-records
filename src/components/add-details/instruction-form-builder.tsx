import { InstructionPair } from "@/app/(tabs)/add/details";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import InstructionForm from "./instruction-form";

type Props = {
    instructions: InstructionPair[],
    setInstructions: (instructions:InstructionPair[]) => void
}

export default function InstructionFormBuilder(props: Props){

    const {instructions, setInstructions} = props;

    const keyCounter = useRef(0);

    const updateInstruction = (position: number, value: string) => {
        if(value !== instructions[position].instruction){

            let newInstructions = instructions.map((val, index) => {
                if(index === position){
                    return {...val, instruction: value}
                }
                return val;
            })

            // Since newInstructions is not a state variable, we can modify it freely
            if (position === instructions.length - 1){
                keyCounter.current++;
                newInstructions.push({instruction:"", key: keyCounter.current});
            }
            if (value === ""){
                newInstructions = newInstructions.filter((val, index) => {return index !== position})
            }
            setInstructions(newInstructions);             
        }  
    }

    return <View style={style.view}>
        {
            instructions.map((value, index) => {              
                return <View key={value.key} style = {style.step}>
                    <Text style={{fontSize: 16}}>{(index + 1) + "."}</Text>
                    <InstructionForm 
                        position={index} 
                        initialText={value.instruction}
                        placeholder={(index === instructions.length - 1)?"Write here to add a new instruction":"Leave empty to delete instruction"} 
                        update={updateInstruction}/>
                </View>
            })
        }
    </View>
}

export const style = StyleSheet.create({
    view:{
        gap: 5
    },
    step:{
        flexDirection: 'row',
        gap: 10
    }
})