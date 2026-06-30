import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'the-recipe-records.db'

let db;

export async function InitDatabase(){

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
            recipe_name TEXT, author TEXT, 
            website TEXT, 
            time TEXT, 
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
            FOREIGN KEY (recipe_id) REFERENCES recipies(recipe_id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS recipe_ingredients ( 
            ingredient_name TEXT, 
            recipe_id INTEGER, 
            amount REAL, 
            display_unit TEXT, 
            PRIMARY KEY (ingredient_name, recipe_id), 
            FOREIGN KEY (ingredient_name) REFERENCES ingredients(ingredient_name) ON DELETE NO ACTION, 
            FOREIGN KEY (recipe_id) REFERENCES recipies(recipe_id) ON DELETE CASCADE
        );

    `);

    console.log("Finished Setup");
    
}



export async function DeleteDatabase(){
    await SQLite.deleteDatabaseAsync(DATABASE_NAME)
}

