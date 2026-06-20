import { StyleSheet, Text, View } from "react-native";
import InstructionForm from "./instruction-form";


export default function InstructionFormBuilder(){

    const steps = [1,2,3,4,5,6,7]

    return <View style={style.view}>
        {
            steps.map((value, index) => {
                return <View key={index} style = {style.step}>
                    <Text style={{fontSize: 16}}>{(index + 1) + "."}</Text>
                    <InstructionForm/>
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