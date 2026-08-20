mod recipe_db_desktop;

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
      recipe_db_desktop::get_recipe_by_id_desktop])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
