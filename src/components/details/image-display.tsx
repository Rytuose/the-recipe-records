import { NotificationContext } from "@/app/_layout";
import { getColorScheme } from "@/constants/color-scheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const HEIGHT = 320
const IMAGE_GAP = 10

type Props = {
    images: (ImagePicker.ImagePickerAsset | null)[],
    editable: boolean,
    setImages: (images:(ImagePicker.ImagePickerAsset | null)[]) => void
}

export default function ImageDisplay({images, editable, setImages}: Props){

    const notificationUpdate = useContext(NotificationContext);
    const colorScheme = getColorScheme();
    //const [images, setImages] = useState<(ImagePicker.ImagePickerAsset | null)[]>([null]) 

    //TODO: store in expo file system?

    const addPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1
        })

        if(result.canceled){
            notificationUpdate("No Photo Selected")
        }
        else{
            //setSelectedImage(result.assets[0])
            let tempImages = [...images, null];
            tempImages[images.length - 1] = result.assets[0];
            setImages(tempImages)
            //console.log(Paths.document);
            
        }
    }

    const takePhoto = () => {
        console.log("Take Photo");
    }

    //console.log("Selected Image " + selectedImage);
    //console.log(images);
    

    return <FlatList 
        key = {images.length}
        data={images} 
        horizontal={true}
        contentContainerStyle = {style.containerStyle}
        renderItem={({item, index}) => {
            if(editable && index === images.length-1){
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
            if (item === null){
                return <View style={style.tempImage}/>
            }

            return <Image source={item} style={[style.image, {width: HEIGHT * item.width / item.height}]}/>
        }}/>

}

export const style = StyleSheet.create({
    image:{
        height: HEIGHT,
        borderRadius: 20
    },
    addImage:{
        width: (HEIGHT - IMAGE_GAP)/2,
        height: HEIGHT,
        gap: IMAGE_GAP
    },
    addImageOption:{
        width: '100%',
        height: (HEIGHT - IMAGE_GAP)/2,
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
    tempImage:{
        width: 180,
        height: HEIGHT,
        borderRadius: 20,
        backgroundColor: "#123456"
    },
    containerStyle:{
        marginHorizontal: 10,
        gap: 10
    }

})