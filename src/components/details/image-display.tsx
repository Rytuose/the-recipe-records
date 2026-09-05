import { NotificationContext } from "@/app/_layout";
import { getColorScheme } from "@/constants/color-scheme";
import { IMAGE_HEIGHT } from "@/constants/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useContext, useEffect, useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ImageNotFound from "./image-not-found";
import RecipeImage from "./recipe-image";

const IMAGE_GAP = 10

export type ImagePair = {
    image: string
    path: string
    key: number
}

type Props = {
    images: (ImagePair | null)[],
    //imagePaths: string[],
    deletedImages: string[],
    editable: boolean,
    nextIdValue: number,
    setImages: (images:(ImagePair | null)[]) => void,
    //setImagePaths: (images:string[]) => void,
    setDeletedImages: (images:string[]) => void
}

export default function ImageDisplay({images, deletedImages, editable, nextIdValue, setImages, setDeletedImages}: Props){

    const notificationUpdate = useContext(NotificationContext);
    const colorScheme = getColorScheme();
    // const [imageIds, setImageIds] = useState<number[]>(images.map((value, index) => {
    //     return index
    // }));
    const nextId = useRef<number>(nextIdValue);
    
    //const [images, setImages] = useState<(ImagePicker.ImagePickerAsset | null)[]>([null]) 

    //TODO: store in expo file system?
    
    useEffect(() => {console.log("Rerender image display");
    })

    const addPhoto = useCallback(async () => {
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
            let tempImages = [...images, {image: result.assets[0].base64!, path:"", key:nextId.current}];
            //setImages(tempImages)
            setImages(tempImages)
            nextId.current += 1;

            console.log("Update new length " + tempImages.length);
            
            //console.log("Test " + result.assets[0].base64);
        }
    }, [images])

    const takePhoto = useCallback(() => {
        console.log("Take Photo");
    },[])

    const deletePhoto = (key:number) => {
        console.log("Deleting photo with id " + key);

        let deleteIndex = -1
        for (let i = 0 ; i < images.length; i++){
            if (images[i]?.key === key){
                deleteIndex = i;
                break;
            }
        }

        if (deleteIndex === -1){
            notificationUpdate("Couldn't delete photo")
        }

        //const deleteIndex = imageIds.indexOf(key)
        const deleteVal = images[deleteIndex];

        let tempImages = images.filter((value, index) => {
            return index !== deleteIndex;
        })

        setImages(tempImages);
        if (deleteVal !== null && deleteVal.path !== ""){
            const tempDeletedImages = [...deletedImages, deleteVal.path]
            console.log("Deleted images " + tempDeletedImages);
            
            setDeletedImages(tempDeletedImages)
        }
        //imageIds.current.splice(deleteIndex, 1)
    }

    const renderItem = useCallback(({item, index}:{item:(ImagePair | null), index:number}) => {
        

        //TODO: move to recipe image/simplify?

        console.log("Image ids " + " " + item?.key);
        console.log("Creating with index " + index + " " + editable);
        
        
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

        if (item === null || item.image.length == 0){
            return <ImageNotFound/>
        }

        return <RecipeImage key={item.key} id={item.key} base64={item.image} height={IMAGE_HEIGHT} deleteEnabled={editable} deletePhoto={deletePhoto}/>
    }, [editable, addPhoto, takePhoto])

    const keyExtractor = useCallback((item:(ImagePair | null), index:number) => {
        return (item === null)? "-1":item.key.toString()
    }, [])

    //TODO: Maybe try a scroll view to stop flickering
    return <FlatList 
        key = {images.length}
        data={images} 
        horizontal={true}
        contentContainerStyle = {style.containerStyle}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        />

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


/*
{({item, index}) => {
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
                return <ImageNotFound/>
            }

            return <RecipeImage id={imageIds.current[index]} base64={item} height={IMAGE_HEIGHT} deleteEnabled={editable} deletePhoto={deletePhoto}/>
        }}


*/