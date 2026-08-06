import RecipeEditor from "@/components/recipe-edit/recipe-editor";
import { Recipe } from "@/recipe/recipe";

export default function AddDetailScreen() {
    return <RecipeEditor 
        recipe = {new Recipe()}
    />
}