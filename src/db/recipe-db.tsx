import { Ingredient } from '@/recipe/ingredient';
import { MEASUREMENT_NAMES } from '@/recipe/measurement';
import { Recipe, RecipeSummaryDetail } from '@/recipe/recipe';
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'the-recipe-records.db'

let db:SQLite.SQLiteDatabase;

export async function initDatabase(){

    console.log("Awaiting for database to be opened");
    
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    
    console.log("Setting up database");

    await db.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS categories ( 
            category_name TEXT PRIMARY KEY 
        );

        CREATE TABLE IF NOT EXISTS recipes ( 
            recipe_id INTEGER PRIMARY KEY, 
            recipe_name TEXT,
            website TEXT, 
            cooking_time INTEGER,
            author TEXT, 
            date_updated TEXT,
            starred BOOLEAN, 
            instructions TEXT, 
            images TEXT 
        );

        CREATE TABLE IF NOT EXISTS ingredients ( 
            ingredient_name TEXT PRIMARY KEY 
        );

        CREATE TABLE IF NOT EXISTS recipe_categories ( 
            category_name TEXT, 
            recipe_id INTEGER, 
            PRIMARY KEY (category_name, recipe_id),
            FOREIGN KEY (category_name) REFERENCES categories(category_name) ON DELETE CASCADE,
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS recipe_ingredients ( 
            ingredient_name TEXT, 
            recipe_id INTEGER, 
            amount REAL, 
            display_unit TEXT, 
            PRIMARY KEY (ingredient_name, recipe_id), 
            FOREIGN KEY (ingredient_name) REFERENCES ingredients(ingredient_name) ON DELETE NO ACTION, 
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
        );

    `);

    console.log("Setting up statements");

    console.log("Finished Setup");   
}

export async function deleteDatabase(){
        await SQLite.deleteDatabaseAsync('databaseName');
    await SQLite.deleteDatabaseAsync(DATABASE_NAME)
}

export async function addRecipeDatabase(recipe:Recipe){
    
    await dbCheck();
    
    if (!Number.isNaN(recipe.id)){
        updateRecipeDatabase(recipe);
        return;
    }

    let result = await db.runAsync(`INSERT INTO recipes (recipe_name, website, cooking_time, date_updated, author, starred, instructions, images) 
        VALUES ($recipe_name, $website, $cooking_time, $date_updated, $author, $starred, $instructions, $images)`,
        {
            $recipe_name: recipe.name,
            $website: recipe.website,
            $cooking_time: recipe.cooking_time,
            $date_updated: Date.now(),
            $author: recipe.author,
            $starred: recipe.starred?1:0,
            $instructions: recipe.instructions.reduce((prev, current) => prev + '\n' + current, "").trim(),
            $images: recipe.images.reduce((prev, current) => prev + '\n' + current, "").trim()
        })
    
    const newId = result.lastInsertRowId

    console.log("Added recipe with id " + newId);
    
    const ingredientCheck = await db.prepareAsync('SELECT COUNT(*) AS ingredient_exists FROM ingredients I WHERE I.ingredient_name = $ingredient_name');
    const ingredientInsert = await db.prepareAsync(`INSERT INTO ingredients VALUES ($ingredient_name)`)
    const recipeIngredientInsert = await db.prepareAsync(`INSERT INTO recipe_ingredients 
        VALUES ($ingredient_name, $recipe_id, $amount, $display_unit)`)

    try{

        for (const value of recipe.ingredients){
            console.log(value.name);

            const ingredientCheckResult = await ingredientCheck.executeAsync<{ingredient_exists:number}>({
                $ingredient_name: value.name
            });
            
            const ingredientExists = await ingredientCheckResult.getFirstAsync();

            console.log(ingredientExists?.ingredient_exists)

            if(ingredientExists?.ingredient_exists === 0){
                 await ingredientInsert.executeAsync({$ingredient_name: value.name});
            }

            console.log("Finished Adding Ingredient");

            //TODO: Uniqueness check on recipe items
            await recipeIngredientInsert.executeAsync({
                $ingredient_name: value.name,
                $recipe_id: newId,
                $amount: value.quantity,
                $display_unit: value.measurement
            })

            console.log("Finished Adding ingredient to recipe");
        }
    }
    catch(e){
        console.log(e);
    }
    finally{
        await ingredientCheck.finalizeAsync();
        await ingredientInsert.finalizeAsync();
        await recipeIngredientInsert.finalizeAsync();
    }

}

async function updateRecipeDatabase(recipe:Recipe){

}

export async function getRecipies(){
    await dbCheck();

    let result:{recipe_id:number, recipe_name:string, cooking_time:number, starred:number}[] = await db.getAllAsync(`
        SELECT R.recipe_id, R.recipe_name, R.cooking_time, R.starred
        FROM recipes R
        ORDER BY R.date_updated DESC
        LIMIT 20
    `)


    const recipies = new Array<RecipeSummaryDetail>(result.length);
    let count = 0;

    for (const row of result){
        console.log(row.recipe_id + " " + row.recipe_name + " " + row.cooking_time + " " + row.starred);

        recipies[count] = {
            id: row.recipe_id,
            name: row.recipe_name,
            cooking_time: row.cooking_time,
            starred: row.starred === 1
        }

        count++;
    }

    return recipies;
    
}

export async function getRecipeById(id:number){
    const recipe = new Recipe();
    console.log("Getting recipe with id " + id);

    let result:{
        recipe_name:string, 
        website: string,
        cooking_time: number,
        author: string,
        instructions: string,
        images: string
    }|null = await db.getFirstAsync(`
        SELECT R.recipe_name, R.website, R.author, R.instructions, R.images
        FROM recipes R
        WHERE R.recipe_id = $recipe_id`,
    {$recipe_id: id});

    if (result === null){
        return null;
    }

    recipe.id = id;
    recipe.name = result!.recipe_name;
    recipe.website = result!.website;
    recipe.cooking_time = result!.cooking_time;
    recipe.author = result!.author;
    recipe.instructions = (result!.instructions === "")?[]:result!.instructions.split("\n")
    recipe.images = (result!.images)?[]:result!.images.split("\n")

    //TODO Fill ingredients
    let ingredientResult:{
        ingredient_name: string,
        amount: number,
        display_unit: string
    }[] = await db.getAllAsync(`
        SELECT R.ingredient_name, R.amount, R.display_unit
        FROM recipe_ingredients R
        WHERE R.recipe_id = $recipe_id`,
    {$recipe_id: id})

    for (const ingr of ingredientResult){
        const ingredient = new Ingredient();
        ingredient.name = ingr.ingredient_name;
        ingredient.quantity = ingr.amount;

        //TODO: Maybe binary search this
        for (const options of MEASUREMENT_NAMES){
            if (options === ingr.display_unit){
                ingredient.measurement = ingr.display_unit
                break
            }
        }
        recipe.ingredients.push(ingredient);
    }
    
    return recipe;
    
}

async function dbCheck(){
    if(db === undefined){
        await initDatabase();
    }
}