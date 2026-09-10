import { getColorScheme } from "@/constants/color-scheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, useImage } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ButtonWrapper from "../general/button-wrapper";
import ImageNotFound from "./image-not-found";

type Props = {
    base64: string
    height: number
    deleteEnabled: boolean,
    id: number,
    deletePhoto: (key:number) => void
}

export default function RecipeImage({base64, height, deleteEnabled, id, deletePhoto}: Props){
    
    const [invalid, setInvalid] = useState<Boolean>(false)
    const colorScheme = getColorScheme()

    //Flickering because when loading, we do not know the image width
    //so there will be a gap when loading since we can't make a placeholder?

    //UseEffect? + Image.getSize()

    //TODO: test jpeg vs png?
    //Maybe need to fetch type and store somewhere
    const image = useImage("data:image/png;base64," + base64, {
        maxHeight: height,
        onError(error, retry){
            console.log("Error");
            setInvalid(true)
        },
    }, [])

    //Issue is that flat list does not save anything and re-renders everything

    if (image === null){
        console.log("Image null " + id);
        return 
    }
    
    if (invalid){    
        return <ImageNotFound/>
    }
    
    const removeImage = () => {
        deletePhoto(id);
    }

    return <View>
        <Image key={id} transition={0} source={{uri: "data:image/png;base64," + base64}} style={[style.image, {height: height, width: height * image.width / image.height}]}/>
        {deleteEnabled && <View style = {style.delete}>
            <ButtonWrapper width={36} noBorder={true} onPress={removeImage}>
                <Ionicons name="close" size={36} color={colorScheme.tertiary}/>
            </ButtonWrapper>
        </View>}

    </View> 
}

export const style = StyleSheet.create({
    image:{
        borderRadius: 20
    },
    delete:{
        top: 10,
        right: 10,
        position: 'absolute'
    }
})