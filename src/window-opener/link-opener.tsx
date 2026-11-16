import { invoke } from "@tauri-apps/api/core";
import { Platform } from "react-native";


export async function openLink(link:string){

    if (Platform.OS === 'web'){
        try{
            let result = await invoke<boolean>('open_website', {
                link: link
            })
            return result;
        }
        catch(e){ 
            console.log("Failed to open window " + e);
            return false;
        }
    }

}