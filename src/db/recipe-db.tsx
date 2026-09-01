import { Ingredient } from '@/recipe/ingredient';
import { baselineToMeasurement, measurementToBaseline } from '@/recipe/measurement';
import { Recipe, RecipeSummaryDetail } from '@/recipe/recipe';
import { invoke } from '@tauri-apps/api/core';
import { Platform } from 'react-native';
import { retrieveImages, storeImages } from './image-manager';
import * as MobileDatabase from './recipe-db-moblie';

type DBReturn = {
    id: number;
    name: string;
    website: string;
    cooking_time: number;
    author: string;
    images: string;
    ingredients: Ingredient[];
    instructions: string;
}

export async function initDatabase(){

    if (Platform.OS === 'web'){
        console.log("Web? Detected");
        try{
            await invoke('init_database_desktop');
            return;
        }
        catch(e){ console.log("Failed");}
    }

    await MobileDatabase.initDatabaseMobile(); 
}

export async function deleteDatabase(){
    
    if (Platform.OS === 'web'){
        try{
            await invoke('delete_database_desktop');
            return;
        }
        catch(e){}
    }

    await MobileDatabase.deleteDatabaseMobile();

}

export async function addRecipe(recipe:Recipe){
    
    if (Platform.OS === 'web'){
        try{
            let imagePaths = await storeImages(recipe.images, recipe.imagePaths)
            await invoke('add_recipe_desktop',
                {
                    recipeId: Number.isNaN(recipe.id)?-1:recipe.id,
                    recipeName: recipe.name,
                    website: recipe.website,
                    cookingTime: recipe.cooking_time,
                    dateUpdated: Date.now(),
                    author: recipe.author,
                    starred: recipe.starred?1:0,
                    instructions: JSON.stringify(recipe.instructions),
                    images: JSON.stringify(imagePaths),
                    ingredients: recipe.ingredients.map((value) => {
                        return {...value, quantity: measurementToBaseline(value.measurement, value.quantity)}
                    })
                }
            );
            return;
        }
        catch(e){
            console.log("Error");
            
            return;
        }
    }

    await MobileDatabase.addRecipeMobile(recipe); 

}

export async function deleteRecipe(id:number){
    if (Platform.OS === 'web'){
        try{
            await invoke('delete_recipe_desktop', 
            {
                recipeId: id
            });
            return;
        }
        catch(e){}
    }

    await MobileDatabase.deleteRecipeMobile(id); 
}

export async function getRecipes(){
    if (Platform.OS === 'web'){
        try{
            let returnValue = await invoke<RecipeSummaryDetail[]>('get_recipes_desktop');
            return returnValue;
        }
        catch(e){}
    }

    return await MobileDatabase.getRecipesMobile();
    
}

export async function getRecipeById(id:number){
    if (Platform.OS === 'web'){
        try{
            let returnValue = await invoke<DBReturn>('get_recipe_by_id_desktop',{
                recipeId: id
            });
            
            if (returnValue.id === -1){
                return null;
            }

            let recipe = new Recipe();

            recipe.id = returnValue.id;
            recipe.name = returnValue.name;
            recipe.website = returnValue.website;
            recipe.cooking_time = returnValue.cooking_time;
            recipe.author = returnValue.author;
            recipe.instructions = JSON.parse(returnValue.instructions);
            recipe.imagePaths = JSON.parse(returnValue.images);
            recipe.images = await retrieveImages(recipe.imagePaths);
            recipe.ingredients = [];
            
            //retrieveImages(recipe.images)

            returnValue.ingredients.forEach((value) => {
                let ingredient = new Ingredient();
                ingredient.name = value.name;
                ingredient.measurement = value.measurement;
                ingredient.quantity = baselineToMeasurement(value.measurement, value.quantity);
                recipe.ingredients.push(ingredient);
            })

            
            
            return recipe;
        }
        catch(e){}
    }

    return await MobileDatabase.getRecipeByIdMobile(id);
    
}

