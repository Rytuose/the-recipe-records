import { getColorScheme } from "@/constants/color-scheme";
import { Text, TextInput, useNativeState } from "@expo/ui";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ButtonWrapper from "../general/button-wrapper";
import Dropdown from "../general/dropdown";

const HEIGHT = 40
const BORDER_RADIUS = 10

type Props = {
    close: () => void
}

export default function RecipeFilter({close}:Props){

    const starredOptions = ["--", "Starred", "Not Starred"]
    const comparisonOptions = ["<", "≤", "=", "≥", ">"]
    const timeUnit = ["minutes", "hours"]
    const [starred, setStarred] = useState<string>(starredOptions[0]);
    const [cookingTimeComparison, setCookingTimeComparison] = useState<string>(comparisonOptions[1])
    const [cookingTimeUnit, setCookingTimeUnit] = useState<string>(timeUnit[0])
    const cookingTimeLength = useNativeState<string>("")
    const [topDropdown,setTopDropdown] = useState<number>(-1);

    console.log("Top Dropdown " + topDropdown);
    
    const colorScheme = getColorScheme();

    const setFilter = () => {
        console.log("Set Filter");
        close();
    }

    const cancelFilter = () => {
        console.log("Cancel Filter");
        close();
    }
    

    return <View style={[style.view]}>
        <Text textStyle={style.title}>Recipe Filter</Text>
        <View style={[style.horizontalPair, {zIndex: (topDropdown == 0)? 1: 0}]}>
            <Text textStyle={style.section}>Cooking Time</Text>
            <View style={{width: 100}}>
                <Dropdown
                    options={comparisonOptions}
                    selectorHeight={126}
                    dropdownHeight={HEIGHT}
                    label={cookingTimeComparison}
                    setLabel={setCookingTimeComparison}
                    inverse={true}
                    borderRadius={BORDER_RADIUS}
                    minWidth={100}
                    onOpen={() => {setTopDropdown(0)}}/>
            </View>
            <TextInput 
                textStyle={style.textInput}
                value={cookingTimeLength}
                onChangeText={(text) => {cookingTimeLength.value = text.replaceAll(/[^0-9]/g,"")}}
            />
            <View style={{width: 150}}>
                <Dropdown
                    options={timeUnit}
                    selectorHeight={51}
                    dropdownHeight={HEIGHT}
                    label={cookingTimeUnit}
                    setLabel={setCookingTimeUnit}
                    inverse={true}
                    borderRadius={BORDER_RADIUS}
                    minWidth={100}
                    onOpen={() => {setTopDropdown(0)}}/>
            </View>
        </View>
        <View style={[style.horizontalPair, {zIndex: (topDropdown == 1)? 1: 0}]}>
            <Text textStyle={style.section}>Starred</Text>
            <Dropdown
                options={starredOptions}
                selectorHeight={76}
                dropdownHeight={HEIGHT}
                label={starred}
                setLabel={setStarred}
                inverse={true}
                minWidth={200}
                borderRadius={BORDER_RADIUS}
                onOpen={() => {setTopDropdown(1)}}/>
        </View>
        <View style={[style.horizontalPair, {justifyContent: 'center'}]}>
            <ButtonWrapper width={'40%'} onPress={cancelFilter} backgroundColor={colorScheme.tertiary}>
                <Text textStyle={style.buttonText}>Cancel</Text>
                <Ionicons name="close" size={24} color={colorScheme.onTertiary}/>
            </ButtonWrapper>
            <ButtonWrapper width={'40%'} onPress={setFilter} backgroundColor={colorScheme.primary}>
                <Text textStyle={style.buttonText}>Filter</Text>
                <Feather name="filter" size={26} color={colorScheme.onPrimary}/>
            </ButtonWrapper>
        </View>
    </View>
}

export const style = StyleSheet.create({
    view:{
        gap: 10,
        padding: 10,
    },
    horizontalPair:{
        flexDirection: 'row',
        gap: 15,
        alignItems:'center'
    },
    textInput:{
        flex: 1,
        fontSize: 20,
        color: 'white',
        fontFamily: "Body",
        height: HEIGHT,
        borderRadius: BORDER_RADIUS,
        minWidth: 200
    },
    title:{
        fontFamily: "Title",
        fontSize: 30,
        height: 100
    },
    section:{
        fontFamily: "Subtitle",
        fontSize: 25,
        width: 150,
        minWidth: 150,
    },
    buttonText:{
        fontFamily: 'Body',
        color: 'white',
        fontSize: 20
    }
})