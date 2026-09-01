import { NotificationContext } from "@/app/_layout";
import { getColorScheme } from "@/constants/color-scheme";
import { MAIN_STYLE } from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import RecipeImage from "./recipe-image";

export const IMAGE_HEIGHT = 320
const IMAGE_GAP = 10

type Props = {
    images: (string | null)[],
    imagePaths: string[],
    editable: boolean,
    setImages: (images:(string | null)[]) => void,
    setImagePaths: (images:string[]) => void
}

export default function ImageDisplay({images, imagePaths, editable, setImages, setImagePaths}: Props){

    const notificationUpdate = useContext(NotificationContext);
    const colorScheme = getColorScheme();
    //const [images, setImages] = useState<(ImagePicker.ImagePickerAsset | null)[]>([null]) 

    //TODO: store in expo file system?

    const addPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            base64: true
        })

        if(result.canceled){
            notificationUpdate("No Photo Selected")
        }
        else{
            //TODO: Case when base64 is null
            let tempImages = [...images, result.assets[0].base64!];
            setImages(tempImages)
            let tempImagePaths = [...imagePaths, ""];
            setImagePaths(tempImagePaths)
            //console.log("Test " + result.assets[0].base64);
        }
    }

    const takePhoto = () => {
        console.log("Take Photo");
    }

    return <FlatList 
        key = {images.length}
        data={images} 
        horizontal={true}
        contentContainerStyle = {style.containerStyle}
        renderItem={({item, index}) => {
            if(editable && index === 0){
                return <View style={style.addImage}>
                    <Pressable 
                    style={[style.addImageOption, {backgroundColor:colorScheme.primary}]}
                    onPress={addPhoto}>
                        <Text style={[style.addImageText, {color: colorScheme.onPrimary}]}>Add Photo</Text>
                        <Ionicons name="image-outline" size={65} color={colorScheme.onPrimary} />
                    </Pressable>
                    <Pressable 
                    style={[style.addImageOption, {backgroundColor:colorScheme.primary}]}
                    onPress={takePhoto}>
                        <Text style={[style.addImageText, {color: colorScheme.onPrimary}]}>Take Photo</Text>
                        <Ionicons name="camera-outline" size={65} color={colorScheme.onPrimary}/>
                    </Pressable>
                </View>
            }

            if (item === null || item.length == 0){
                return <View style={MAIN_STYLE.imageNotFound}/>
            }
            
            return <RecipeImage base64={item} height={IMAGE_HEIGHT}/>
        }}/>

}

export const style = StyleSheet.create({
    image:{
        height: IMAGE_HEIGHT,
        borderRadius: 20
    },
    addImage:{
        width: (IMAGE_HEIGHT - IMAGE_GAP)/2,
        height: IMAGE_HEIGHT,
        gap: IMAGE_GAP
    },
    addImageOption:{
        width: '100%',
        height: (IMAGE_HEIGHT - IMAGE_GAP)/2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    addImageText:{
        fontFamily: "Subtitle",
        fontSize: 25,
        textAlign: 'center',
        userSelect: 'none',
    },

    containerStyle:{
        marginHorizontal: 10,
        gap: 10
    }

})