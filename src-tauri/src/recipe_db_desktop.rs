use rusqlite::{Connection};
use serde::Serialize;
use std::sync::Mutex;
use std::sync::LazyLock;

const DATABASE_NAME:&str = "the-recipe-records.db";

#[derive(serde::Deserialize, Serialize)]
pub struct Ingredient{
  name: String,
  quantity: f32,
  measurement: String
}

#[derive(serde::Deserialize, Serialize)]
pub struct RecipeSummaryDetail{
  id: i32,
  name: String,
  cooking_time: i32,
  starred: bool
}

#[derive(serde::Deserialize, Serialize)]
pub struct Recipe{
  id: i32,
  name: String,
  website: String,
  cooking_time: i32,
  author: String,
  instructions: String,
  images: String,
  ingredients: Vec<Ingredient>
}

//let mut db;
static DB:LazyLock<Mutex<Connection>> = LazyLock::new(|| {
  let connection = Connection::open(DATABASE_NAME).expect("Issue opening database");
  return Mutex::new(connection);
});

#[tauri::command]
pub fn init_database_desktop() {
  println!("InitDatabaseDesktop");
  let db = DB.lock().unwrap();
  let _ = (*db).execute_batch("
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

    ").expect("Error creating db");
  println!("Success?")
  //db = Connection::open(DATABASE_NAME)
}

#[tauri::command]
pub fn delete_database_desktop() {
  println!("DeleteDatabaseDesktop");
  let _ = std::fs::remove_file(DATABASE_NAME);
}

#[tauri::command]
pub fn add_recipe_desktop(mut recipe_id: i64, recipe_name: String, website: String, cooking_time: i32, 
    date_updated: i64, author: String, starred:i32, instructions: String, images: String,
    ingredients: Vec<Ingredient>) {
  
  let mut db = DB.lock().unwrap();
  let transaction = (*db).transaction().unwrap();
  
  // New Recipe
  if recipe_id == -1 {
    let _ = transaction.execute("INSERT INTO recipes (recipe_name, website, cooking_time, date_updated, author, starred, instructions, images) 
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)", 
        [recipe_name, website, cooking_time.to_string(), date_updated.to_string(), author, starred.to_string(), instructions, images]);
    recipe_id = transaction.last_insert_rowid();
  }
  else{
    let _ = transaction.execute("UPDATE recipes
            SET recipe_name = ?1,
                cooking_time = ?2,
                date_updated = ?3,
                instructions = ?4,
                images = ?5
            WHERE recipe_id = ?6", 
            [recipe_name, cooking_time.to_string(),date_updated.to_string(), instructions, images, recipe_id.to_string()]).unwrap();
    
    let _ = transaction.execute("
      DELETE 
      FROM recipe_ingredients
      WHERE recipe_id = ?1 AND position >= ?2", 
      [recipe_id, ingredients.len().try_into().unwrap()]);
  }

  let mut count = 0;  

  {
    let mut ingredient_insert = (transaction).prepare("INSERT OR IGNORE INTO ingredients VALUES (?1)").unwrap();
    let mut recipe_ingredient_insert = (transaction).prepare("INSERT OR REPLACE INTO recipe_ingredients VALUES (?1, ?2, ?3, ?4, ?5)").unwrap();

    for ingr in &ingredients{
      let _ = ingredient_insert.execute([ingr.name.clone()]).unwrap();
      let _ = recipe_ingredient_insert.execute([ingr.name.clone(), recipe_id.to_string(), ingr.quantity.to_string(), ingr.measurement.clone(), count.to_string()]).unwrap();

      count += 1;
    }
  }

  let _ = transaction.commit();

  println!("Done");
}

#[tauri::command]
pub fn delete_recipe_desktop(recipe_id: i32) {
  println!("DeleteRecipeDesktop");
  let db = DB.lock().unwrap();
  let _ = (*db).execute("DELETE FROM recipes WHERE recipe_id = ?1", 
    [recipe_id]);

}

#[tauri::command]
pub fn get_recipes_desktop() -> Vec<RecipeSummaryDetail> {
  println!("getRecipesDesktop");

  let db = DB.lock().unwrap();

  let mut query = (*db).prepare("SELECT R.recipe_id, R.recipe_name, R.cooking_time, R.starred
        FROM recipes R
        ORDER BY R.date_updated DESC
        LIMIT 20").unwrap();
  
  let result = query.query_map([], |row| {
    Ok(RecipeSummaryDetail  { 
      id: row.get(0)?, 
      name: row.get(1)?, 
      cooking_time: row.get(2)?, 
      starred: row.get(3)?})
  }).unwrap();

  let mut summaries:Vec<RecipeSummaryDetail> = Vec::new();

  for summary in result{
    let recipe_summary = summary.unwrap();
    summaries.push(recipe_summary);
  }

  return summaries;
}

#[tauri::command]
pub fn get_recipe_by_id_desktop(recipe_id: i32) -> Recipe {
  println!("getRecipeByIdDesktop {}", recipe_id);

  let db = DB.lock().unwrap();

  let mut query = (*db).prepare("
    SELECT R.recipe_name, R.website, R.cooking_time, R.author, R.instructions, R.images
    FROM recipes R
    WHERE R.recipe_id = ?1").unwrap();

  let mut result = query.query_row([recipe_id], |row|{
    Ok(Recipe{
      id: recipe_id,
      name: row.get(0)?,
      website: row.get(1)?,
      cooking_time: row.get(2)?,
      author: row.get(3)?,
      instructions: row.get(4)?,
      images: row.get(5)?,
      ingredients: Vec::new()
    })
  }).unwrap_or(Recipe{
    id: -1, 
    name: "".to_string(), 
    website: "".to_string(), 
    cooking_time: 0, 
    author: "".to_string(), 
    instructions: "".to_string(), 
    images: "".to_string(),
    ingredients: Vec::new()});

  if result.id == -1 { 
    return result;
  }

  //println!("{} {} {} {}", result.id, result.name, result.instructions, result.images);

  let mut ingredient_query = (*db).prepare("
    SELECT R.ingredient_name, R.amount, R.display_unit
    FROM recipe_ingredients R
    WHERE R.recipe_id = $recipe_id
    ORDER BY R.position ASC").unwrap();
  
  let ingredient_result = ingredient_query.query_map([recipe_id], |row|{
    Ok(Ingredient{ 
      name: row.get(0)?, 
      quantity: row.get(1)?, 
      measurement: row.get(2)?
    })
  }).unwrap();

  for ingredient in ingredient_result{
    let ingr  = ingredient.unwrap();
    result.ingredients.push(ingr);
  }

  return result;


}