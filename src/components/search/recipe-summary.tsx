
import { NotificationContext } from '@/app/_layout';
import { getColorScheme } from '@/constants/color-scheme';
import { RecipeSummaryDetail } from '@/recipe/recipe';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const RECIPE_SUMMARY_WIDTH = 460;

const RECIPE_SUMMARY_HEIGHT = 150;
const BORDER_WIDTH = 4;
const PADDING = 15;

type Props = {
    summary:RecipeSummaryDetail;
}

export default function RecipeSummary({summary}:Props){
    
    const [favorite, setFavorite] = useState<Boolean>(summary.starred);
    const notificationUpdate = useContext(NotificationContext);

    const colorScheme = getColorScheme();
    const favoriteName = (favorite)? 'star': 'star-o';
    const favoriteColor = (favorite)? '#ffd700': colorScheme.onSecondary;



    const recipeClick = async () => {
        // const recipe = await getRecipeById(summary.id)
        // if(recipe === null){
        //     notificationUpdate("Couldn't open recipe");
        //     return;
        // }
        router.navigate({pathname: "/search/details", params:{id:summary.id}});
    }

    const favoriteRecipe = () => {
        setFavorite(!favorite);
    }

    return <View style={[style.view, {backgroundColor: colorScheme.secondary}]}>
        <Pressable
        style={style.button}
        onPress={recipeClick}>
            <View style={style.horizontalView}>
                <View style={style.imagePlaceholder}/>
                <View style={{flex: 1}}>
                    <Text style={[style.titleText, {color: colorScheme.onSecondary}]}>{summary.name}</Text>
                    <Text style={[style.bodyText,{color: colorScheme.onSecondary}]}>Time: {summary.cooking_time} hrs</Text>
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
        fontSize: 30,
        fontFamily: "Subtitle"
    },
    bodyText:{
        fontSize: 20,
        fontFamily: "Body"
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