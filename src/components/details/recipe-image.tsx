import { Image, useImage } from "expo-image";
import { StyleSheet, View } from "react-native";

type Props = {
    uri: string
    height: number
}

export default function RecipeImage({uri, height}: Props){
    const image = useImage(uri)
    
    if (image === null){    
        return <View/>
    }

    return <Image source={image} style={[style.image, {height: height, width: height * image.width / image.height}]}/>
    
}


export const style = StyleSheet.create({
    image:{
        borderRadius: 20
    },
})