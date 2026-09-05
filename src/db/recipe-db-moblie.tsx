import { Ingredient } from "@/recipe/ingredient";
import { baselineToMeasurement, measurementToBaseline } from "@/recipe/measurement";
import { Recipe, RecipeSummaryDetail } from "@/recipe/recipe";
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'the-recipe-records.db'

let db:SQLite.SQLiteDatabase;

export async function initDatabaseMobile() {
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
            date_updated INTEGER,
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
            position INTEGER,
            PRIMARY KEY (recipe_id, position), 
            FOREIGN KEY (ingredient_name) REFERENCES ingredients(ingredient_name) ON DELETE NO ACTION, 
            FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS recipe_summary_index ON recipes(date_updated, recipe_id, recipe_name, cooking_time, starred);

    `);

    console.log("Setting up statements");

    console.log("Finished Setup");
}

export async function deleteDatabaseMobile(){
    await SQLite.deleteDatabaseAsync(DATABASE_NAME)
}

export async function addRecipeMobile(recipe:Recipe){
    await dbCheck();
    
    let newId = 0;

    if (!Number.isNaN(recipe.id)){
        await db.runAsync(`UPDATE recipes
            SET recipe_name = $recipe_name,
                cooking_time = $cooking_time,
                date_updated = $date_updated,
                instructions = $instructions,
                images = $images
            WHERE recipe_id = $recipe_id`,
            {
                $recipe_id: recipe.id,
                $recipe_name: recipe.name,
                //$website: recipe.website,
                $cooking_time: recipe.cooking_time,
                $date_updated: Date.now(),
                //$author: recipe.author,
                //$starred: recipe.starred?1:0,
                $instructions: JSON.stringify(recipe.instructions),
                $images: JSON.stringify(recipe.images),
            })
        
        await db.runAsync(`
            DELETE 
            FROM recipe_ingredients
            WHERE recipe_id = $recipe_id AND position >= $ingredient_count
        `,{
            $recipe_id: recipe.id,
            $ingredient_count: recipe.ingredients.length
        })

        newId = recipe.id;
    }
    else{
        let result = await db.runAsync(`INSERT INTO recipes (recipe_name, website, cooking_time, date_updated, author, starred, instructions, images) 
        VALUES ($recipe_name, $website, $cooking_time, $date_updated, $author, $starred, $instructions, $images)`,
        {
            $recipe_name: recipe.name,
            $website: recipe.website,
            $cooking_time: recipe.cooking_time,
            $date_updated: Date.now(),
            $author: recipe.author,
            $starred: recipe.starred?1:0,
            $instructions: JSON.stringify(recipe.instructions),
            $images: JSON.stringify(recipe.images),
        })
    
        newId = result.lastInsertRowId

        console.log("Added recipe with id " + newId);
    }
    
    const ingredientInsert = await db.prepareAsync(`INSERT OR IGNORE INTO ingredients VALUES ($ingredient_name)`)
    const recipeIngredientInsert = await db.prepareAsync(`INSERT OR REPLACE INTO recipe_ingredients 
        VALUES ($ingredient_name, $recipe_id, $amount, $display_unit, $position)`)

    try{

        let count = 0;
        for (const value of recipe.ingredients){
            console.log(value.name);
            
            await ingredientInsert.executeAsync({$ingredient_name: value.name});

            console.log("Finished Adding Ingredient");

            await recipeIngredientInsert.executeAsync({
                $ingredient_name: value.name,
                $recipe_id: newId,
                $amount: measurementToBaseline(value.measurement, value.quantity),
                $display_unit: value.measurement,
                $position: count
            })

            count++;

            console.log("Finished Adding ingredient to recipe");
        }
    }
    catch(e){
        console.log(e);
    }
    finally{
        await ingredientInsert.finalizeAsync();
        await recipeIngredientInsert.finalizeAsync();
    }
}

export async function deleteRecipeMobile(id:number){
    await dbCheck();
    await db.runAsync(`DELETE FROM recipes WHERE recipe_id = $recipe_id`,{$recipe_id: id})
}

export async function getRecipesMobile(){
    await dbCheck();
    
    let result:{recipe_id:number, recipe_name:string, cooking_time:number, starred:number}[] = await db.getAllAsync(`
        SELECT R.recipe_id, R.recipe_name, R.cooking_time, R.starred
        FROM recipes R
        ORDER BY R.date_updated DESC
        LIMIT 20
    `)


    const recipes = new Array<RecipeSummaryDetail>(result.length);
    let count = 0;

    for (const row of result){
        recipes[count] = {
            id: row.recipe_id,
            name: row.recipe_name,
            cooking_time: row.cooking_time,
            starred: row.starred === 1
        }

        count++;
    }

    return recipes;
}

export async function getRecipeByIdMobile(id:number){
    await dbCheck();
    
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
        SELECT R.recipe_name, R.website, R.cooking_time, R.author, R.instructions, R.images
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
    recipe.instructions = JSON.parse(result!.instructions)
    recipe.images = JSON.parse(result!.images)
    

    let ingredientResult:{
        ingredient_name: string,
        amount: number,
        display_unit: string
    }[] = await db.getAllAsync(`
        SELECT R.ingredient_name, R.amount, R.display_unit
        FROM recipe_ingredients R
        WHERE R.recipe_id = $recipe_id
        ORDER BY R.position ASC`,
    {$recipe_id: id})

    for (const ingr of ingredientResult){
        const ingredient = new Ingredient();
        ingredient.name = ingr.ingredient_name;
        ingredient.quantity = baselineToMeasurement(ingr.display_unit, ingr.amount),
        ingredient.measurement = ingr.display_unit;

        recipe.ingredients.push(ingredient);
    }
    
    return recipe;
}

async function dbCheck(){
    if(db === undefined){
        await initDatabaseMobile();
    }
}