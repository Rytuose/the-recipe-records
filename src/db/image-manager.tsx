import { BaseDirectory, exists, mkdir, open, readFile, remove } from '@tauri-apps/plugin-fs';

export async function storeImages(images:string[], paths:string[], deletePaths:string[]){
    //console.log("Images " + images);

    try{
        await mkdir("images", {
            baseDir: BaseDirectory.AppData,
            recursive: true
        })
    }
    catch(e){
        console.log("Error creating images folder " + e);
        return [];
    }

    let imagePaths = []

    for (const pos in images){
        
        let image = images[pos]
        let path = paths[pos]

        try{
            if (path !== ""){
                const fileExists = await exists(path, {
                    baseDir: BaseDirectory.AppData
                })
                if (fileExists){
                    imagePaths.push(path)
                    console.log("File already exists");
                    continue;
                }
            }

            let fetchedImage = await fetch("data:image/png;base64," + image);
            const arrayBuffer = await fetchedImage.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            const imageName = "images\\" + crypto.randomUUID() + ".png"

            console.log(imageName);
            

            const file = await open(imageName, {
                write: true,
                create: true,
                baseDir: BaseDirectory.AppData,
            });

            await file.write(uint8Array);
            await file.close();

            imagePaths.push(imageName)
            
        }
        catch(e){
            console.log("Error" + e);
        }
    }

    for (const deletePath of deletePaths){
        if (deletePath !== ""){
            try{
                await remove(deletePath,{
                    baseDir: BaseDirectory.AppData
                })
            }
            catch(e){
                console.log("Error" + e);
            }
        }
    }

    //TODO: Delete Images

    console.log("Image Paths " + imagePaths);
    
    return imagePaths
}

export async function retrieveImages(paths:string[]){
    //console.log("Retrieve Images " + paths );
    
    let uriPaths:string[] = []

    for (let path of paths){

        //console.log("Looking for path " + path);
        
        let fileExists = false;

        try{
            fileExists = await exists(path, {
                baseDir: BaseDirectory.AppData
            })
        }
        catch(e){}

        if (!fileExists){       
            uriPaths.push("")
            continue;
        }

        const uint8Array = await readFile(path, {
            baseDir: BaseDirectory.AppData
        })
        

        const base64 = uint8Array.toBase64()


        uriPaths.push(base64)
    }
    
    return uriPaths;

}