import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, View } from "react-native";

type Props = {
    checkboxSize: number
}

export default function Checkbox({checkboxSize}: Props){

    const [selected, setSelected] = useState<boolean>(false);

    const toggleCheckbox = () => {
        setSelected(!selected);
    }

    return <View>
        <Pressable onPress={toggleCheckbox}>
            {selected?
            <MaterialCommunityIcons name="checkbox-marked" size={checkboxSize} color={'#123456'}/>:
            <MaterialCommunityIcons name="checkbox-blank-outline" size={checkboxSize}/>}
        </Pressable>
    </View>
}