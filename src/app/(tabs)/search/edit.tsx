import RecipeEditor from "@/components/recipe-edit/recipe-editor";
import { Recipe } from "@/recipe/recipe";
import { useLocalSearchParams } from "expo-router";


export default function EditScreen(){

    const recipeJSON = useLocalSearchParams().recipe as string;
    const recipe = JSON.parse(recipeJSON) as Recipe;

    return <RecipeEditor recipe={recipe} isUpdate={true}/>
}