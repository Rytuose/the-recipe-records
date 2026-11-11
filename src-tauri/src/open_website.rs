use tauri::Url;
use tauri_plugin_opener::OpenerExt;

#[tauri::command]
pub fn open_website(link: String, app: tauri::AppHandle) -> bool{
    println!("Attempting to visit link {}", link);

    let url_parse = Url::parse(&link);

    let url = match url_parse {
        Ok(url) => url,
        Err(_error) => {
            return false;
        }
    };

    if url.scheme() == "https" {
        let _ = app.opener().open_url(link, None::<&str>);
    }

    return true;

}