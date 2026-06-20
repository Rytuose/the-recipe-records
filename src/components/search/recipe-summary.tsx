
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const RECIPE_SUMMARY_WIDTH = 460;

const RECIPE_SUMMARY_HEIGHT = 150;
const BORDER_WIDTH = 4;
const PADDING = 15;

export default function RecipeSummary(){
    
    const [favorite, setFavorite] = useState<Boolean>(false);

    const favoriteName = (favorite)? 'star': 'star-o';
    const favoriteColor = (favorite)? '#ffe234': '#000000';

    const recipeClick = () => {
        router.navigate("/search/details");
    }

    const favoriteRecipe = () => {
        setFavorite(!favorite);
    }

    return <View style={style.view}>
        <Pressable
        style={style.button}
        onPress={recipeClick}>
            <View style={style.horizontalView}>
                <View style={style.imagePlaceholder}/>
                <View style={{flex: 1}}>
                    <Text style={style.titleText}>Title</Text>
                    <Text style={style.bodyText}>Time: X hrs</Text>
                </View>
                <View>
                    <Pressable style={style.favoriteButton} onPress={favoriteRecipe}>
                        <FontAwesome name={favoriteName} size ={32} color={favoriteColor}/>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    </View>

}

export const style = StyleSheet.create({
    view: {
        width: RECIPE_SUMMARY_WIDTH,
        height: RECIPE_SUMMARY_HEIGHT,
        borderWidth: BORDER_WIDTH,
        borderRadius: 20
    },
    button:{
        flex: 1,
        paddingVertical: PADDING,
        paddingHorizontal: PADDING
    },
    favoriteButton: {
        width: 40, 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    titleText:{
        fontSize: 30
    },
    bodyText:{
        fontSize: 20
    },
    horizontalView:{
        flexDirection: 'row',
        gap: 10
    },
    imagePlaceholder:{
        height: RECIPE_SUMMARY_HEIGHT - BORDER_WIDTH - 2*PADDING,
        width: RECIPE_SUMMARY_HEIGHT - BORDER_WIDTH - 2*PADDING,
        backgroundColor: '#123456',
        borderRadius: 7

    }

})