import RecipeEditor from "@/components/recipe-edit/recipe-editor";
import { Recipe } from "@/recipe/recipe";
import { useLocalSearchParams } from "expo-router";

export default function AddDetailScreen() {

    let recipe = new Recipe();

    try {
        const recipeJSON = useLocalSearchParams().recipe as string;
        recipe = JSON.parse(recipeJSON) as Recipe;
    }
    catch(e){}

    return <RecipeEditor 
        recipe={recipe} isUpdate={false}    />
}