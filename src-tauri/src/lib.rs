mod recipe_db_desktop;
mod open_website;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      recipe_db_desktop::init_database_desktop,
      recipe_db_desktop::delete_database_desktop,
      recipe_db_desktop::add_recipe_desktop,
      recipe_db_desktop::delete_recipe_desktop,
      recipe_db_desktop::get_recipes_desktop,
      recipe_db_desktop::get_recipe_by_id_desktop,
      recipe_db_desktop::star_recipe_desktop,
      recipe_db_desktop::query_recipes_desktop,
      open_website::open_website])
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_opener::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
