import { MAIN_STYLE } from "@/constants/styles";
import { Image, useImage } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
    base64: string
    height: number
}

export default function RecipeImage({base64, height}: Props){
    
    const [invalid, setInvalid] = useState<Boolean>(false)

    //TODO: test jpeg vs png?
    //Maybe need to fetch type and store somewhere
    const image = useImage("data:image/png;base64," + base64, {
        maxHeight: height,
        onError(error, retry){
            console.log("Error");
            setInvalid(true)
        }
    })
    
    if (image === null || invalid){    
        return <View style={MAIN_STYLE.imageNotFound}/>
    }

    return <Image source={image} style={[style.image, {height: height, width: height * image.width / image.height}]}/>
    
}


export const style = StyleSheet.create({
    image:{
        borderRadius: 20
    },
})