import { InstructionPair } from "@/app/(tabs)/add/details";
import { INSTRUCTION_FORM_STARTING_HEIGHT } from "@/constants/constants";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import InstructionForm from "./instruction-form";

type Props = {
    instructions: InstructionPair[],
    setInstructions: (instructions:InstructionPair[]) => void
}

const INSTRUCTION_GAP = 5;

export default function InstructionFormBuilder(props: Props){

    const {instructions, setInstructions} = props;

    const keyCounter = useRef(0);

    const selectedInstruction = useSharedValue(-1);
    const translateY = useSharedValue(Array(instructions.length).fill(0));
    const lowerBound = useSharedValue(0);
    const upperBound = useSharedValue(0);
    const shiftAmount = useSharedValue(0);
    

    const updateInstruction = (position: number, value: string, height: number) => {
        if(value !== instructions[position].instruction){

            let newInstructions = instructions.map((val, index) => {
                if(index === position){
                    return {...val, instruction: value, height: height}
                }
                return val;
            })

            // Since newInstructions is not a state variable, we can modify it freely
            if (position === instructions.length - 1){
                keyCounter.current++;
                newInstructions.push({instruction:"", key: keyCounter.current, height: INSTRUCTION_FORM_STARTING_HEIGHT});
                translateY.value = [...translateY.value, 0];
            }
            if (value === ""){
                newInstructions = newInstructions.filter((val, index) => {return index !== position})
                translateY.value = translateY.value.filter((val, index) => {return index !== position})
            }

            setInstructions(newInstructions);             
        }  
    }

    const select = (position:number) => {
        
        if (selectedInstruction.value > 0){
            return;
        }
        
        selectedInstruction.value = position;
        shiftAmount.value = 0;

        let totalHeight = INSTRUCTION_GAP * (instructions.length - 2);
        let startingHeight = 0;

        instructions.forEach((value, index) => {
            if(index === instructions.length - 1){
                return;
            }
            totalHeight += value.height;
            if(index < position){
                startingHeight += value.height + INSTRUCTION_GAP;
            }
        })
        
        let lower = -startingHeight;
        let upper = totalHeight -startingHeight - instructions[position].height
        
        //return {lowerBound, upperBound}
        lowerBound.value = lower;
        upperBound.value = upper;
    }

    const onShift = (position: number, shift: number) => {

        let firstPos = -1;
        let lastNeg = -1;
        let above = -1;
        let below = -1;
        let aboveHeight = 0;
        let belowHeight = 0;
        let height = 0;

        translateY.value.forEach((val, index) => {
            if(index === position){
                return;
            }

            if(val < 0){
                lastNeg = index;
            }
            else if(val > 0 && firstPos === -1){
                firstPos = index;
            }
        })
        
        if (firstPos !== -1){
            above = firstPos - 1;
            below = firstPos;
        }
        else if(lastNeg !== -1 ){
            above = lastNeg;
            below = lastNeg + 1;
        }
        else{
            above = position - 1;
            below = position + 1;
        }

        instructions.forEach((val, index) => {
            if(index < position){
                height += val.height + INSTRUCTION_GAP
            }
            if(index < above){
                aboveHeight += val.height + INSTRUCTION_GAP
            }
            if(index < below){
                belowHeight += val.height + INSTRUCTION_GAP
            }
        })

        let newShift = translateY.value[position];

        newShift += shift;
        newShift = Math.min(newShift, upperBound.value);
        newShift = Math.max(newShift, lowerBound.value);

        if (above >= 0){
            let upperShiftThreshold = height - aboveHeight - translateY.value[above];
            if (-newShift >= upperShiftThreshold){
                translateY.value = translateY.value.map((val, index) => {
                    if(index === above){
                        return val + instructions[position].height + INSTRUCTION_GAP;
                    }
                    return val;
                })
                shiftAmount.value -= 1;
            }  
        }
        if (below <= instructions.length - 2){
            let lowerShiftThreshold = belowHeight + translateY.value[below] - height + instructions[below].height - instructions[position].height
            if(newShift >= lowerShiftThreshold){
                translateY.value = translateY.value.map((val, index) => {
                    if(index === below){                    
                        return val - instructions[position].height - INSTRUCTION_GAP;
                    }
                    return val;
                })
                shiftAmount.value += 1;

            }
        }

        translateY.value = translateY.value.map((val, index) => {
            if(index === position){
               return newShift; 
            }  
            return val;
        })
    }

    const finalize = (position: number) => {
        if (selectedInstruction.value !== position){
            return;
        }
        
        translateY.value = translateY.value.map(() => {
            return 0;
        })
        
        let destination = position + shiftAmount.value;
        let leftBound = (shiftAmount.value < 0)?destination:position;
        let rightBound = (shiftAmount.value < 0)?position:destination;
        let direction = (shiftAmount.value < 0)?-1:1;

        let newInstructions = instructions.map((val, index) => {
            if(index === destination){
                return instructions[position]
            }
            if(index >= leftBound && index <= rightBound){     
                return instructions[index + direction]
            }
            return val;
        })

        setInstructions(newInstructions)

        selectedInstruction.value = -1;
    }

    return <GestureHandlerRootView style={style.gestureView}>
            {
                instructions.map((value, index) => {
                    return <View key={value.key} style = {[style.step]}>
                        {/* <Text style={{fontSize: 16}}>{(index + 1) + "."}</Text> */}
                        <InstructionForm
                            position={index}
                            initialText={value.instruction}
                            placeholder={(index === instructions.length - 1)?"Write here to add a new instruction":"Leave empty to delete instruction"}
                            translateY={ translateY }
                            moveable = {index !== instructions.length-1}
                            select={ select }
                            shift={ onShift }
                            finalize={ finalize }
                            update={updateInstruction}/>
                    </View>
                })
            }
        </GestureHandlerRootView>
}

export const style = StyleSheet.create({
    gestureView:{
        gap: INSTRUCTION_GAP,
        //backgroundColor: '#94bde6'
    },
    step:{
        flexDirection: 'row',
        gap: 10
    }
})