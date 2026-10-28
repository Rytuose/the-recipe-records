import { Ingredient } from "./ingredient";
import { parseMeasurement } from "./measurement";
import { Recipe } from "./recipe";

// Maximum amount of space between tag and actual information
const FILTER_TOLERANCE = .1;

const vulgarFractions = new Map([
    ["¼", 1/4],
    ["½", 1/2],
    ["¾", 3/4],
    ["⅐", 1/7], 
    ["⅑", 1/9], 
    ["⅒", 1/10],
    ["⅓", 1/3], 
    ["⅔", 2/3], 
    ["⅕", 1/5], 
    ["⅖", 2/5], 
    ["⅗", 3/5], 
    ["⅘", 4/5], 
    ["⅙", 1/6], 
    ["⅚", 5/6], 
    ["⅛", 1/8], 
    ["⅜", 3/8], 
    ["⅝", 5/8], 
    ["⅞", 7/8]
])


export async function parseRecipe(recipeString: String){

    let recipe = new Recipe();

    let lines = recipeString.split("\n").filter((i) => {return i})

    let ingredients: number[] = []
    let instructions: number[] = []
    let author: number[] = []

    //TODO: There might be stuff after the comment so idk if we should disregard the section

    for (let i = 0 ; i < lines.length; i++){
        let lower = lines[i].toLowerCase().trim()
        if (lower === "ingredients"){
            ingredients.push(i)
        }

        if (lower === "instructions"){
            instructions.push(i)
        }

        if (lower.startsWith("by ") || lower === "by"){
            if(lower.split(/\s+/).length < 7 && lower !== "by category"){
                author.push(i)
            }
        }

    }

    if (ingredients.length == 1){
        let start = ingredients[0]
        let end = -1
        instructions.forEach((value) => {
            if (end === -1 && value > start) {
                end = value
            }
        })
        if (end == -1){
            end = lines.length
        }
        recipe.ingredients = parseIngredientsFocused(lines, start, end)
    }

    if (instructions.length == 1){
        recipe.instructions = parseInstrutions(lines, instructions[0])
    }

    recipe.cooking_time = parseTime(lines, lines.length)

    if (author.length > 0){
        recipe.author = parseAuthor(lines, author)
    }

    return recipe
}


function parseIngredientsFocused(lines: string[], start:number, end:number){
    let notedLines:string[] = []
    let indentedLines:string[] = []
    let regex = /^\s*/;
    let indent = lines[0].match(regex);
    let indentString = (indent)? indent[0] : "";
    

    for (let i = start; i < end; i++){
        if (lines[i].includes("▢")){
            notedLines.push(lines[i]);
        }
        let newLineIndent = lines[i].match(regex);
        let newIndentString = (newLineIndent)? newLineIndent[0] : "";
        
        if (indentString !== newIndentString && newIndentString !== lines[i]){
            indentedLines.push(lines[i])
        }
    }


    if (notedLines.length > 0){
        return parseIngredients(notedLines)
    }

    if (indentedLines.length > 0){
        return parseIngredients(indentedLines)
    }

    return []
    // Default to traditional methods??


}

function parseIngredients(lines: string[]){

    let ingredientList: Ingredient[] = []
    let regex = /^[\s▢]*/; //TODO: make this regex better to include letters,numbers,fractions instead of whitespace & checkbox

    lines.forEach((value) => {
        let indent = value.match(regex);
        let ingredient = value;
        if (indent !== null){
            ingredient = value.substring(indent[0].length)
        }
        ingredientList.push(parseIngredient(ingredient))
    })
    return ingredientList
    
}

function parseIngredient(string: string){
    console.log("Parsing Ingredient |" + string + "|");
    

    let numberString = ""

    let numberRegexes = [/^[0-9]+[/][0-9]+/, //Fraction
        /^[0-9]+ [0-9]+[/][0-9]+/, // Mixed Fraction
        /^[0-9]+(\.[0-9]+)?/, // Decimal and Whole Numbers
        /^[0-9]+(\.[0-9]+)?-[0-9]+(\.[0-9]+)?/ // Ranges
    ] 

    numberRegexes.forEach((value)=>{
        string.match(value)?.forEach((value) => {
            try{
                if (value.length > numberString.length){
                    numberString = value
                }
            }
            catch (e){}
        })     
    })

    //console.log("\t Number Section |" + numberString + "|");

    let amount = -1;

    if (numberString.includes("-")){
        let numbers = numberString.split("-")
        amount = (Number.parseFloat(numbers[0]) + Number.parseFloat(numbers[1]))/2
    }
    else if(numberString.includes("/")){
        let numbers = numberString.split(/[ /]/)
        if (numbers.length == 2){
            amount = Number.parseInt(numbers[0])/Number.parseInt(numbers[1])
        }
        else if (numbers.length == 3){
            amount = Number.parseInt(numbers[0]) + Number.parseInt(numbers[1])/Number.parseInt(numbers[2])
        }
    }
    else if (numberString.length > 0){
        amount = Number.parseFloat(numberString)
    }

    string = string.substring(numberString.length).trim()

    if (string.length > 0){
        let firstChar = string.charAt(0)    
        
        if (vulgarFractions.has(firstChar)){
            if (amount == -1){
                amount = vulgarFractions.get(firstChar)??-1;
            }
            else{
                amount += vulgarFractions.get(firstChar)??0;
            }
            string = string.substring(1).trim()
        }
    }

        
    //console.log("\t Parsed Number |" + amount + "|");
    //console.log("\t Remaining String |" + string + "|");
    
    let measurement = parseMeasurement(string);
    string = string.substring(measurement.length).trim();

    //console.log("\t Parsed Measurement |" + measurement + "|");
    //console.log("\t Remaining String |" + string + "|");
    
    let ingredient = new Ingredient();
    ingredient.quantity = amount;
    ingredient.measurement = measurement;
    ingredient.name = string;

    console.log("\t " + ingredient.toString());
    

    return ingredient

}

function parseInstrutions(lines: string[], start:number){
    let indentedLines:string[] = []
    let regex = /^\s*/;
    let indent = lines[start].match(regex);
    let indentString = (indent)? indent[0] : "";
    let indentStart = false
    let indentEnd = false
    let indentStartPos = -1;
    

    for (let i = start + 1; i < lines.length; i++){

        let newLineIndent = lines[i].match(regex);
        let newIndentString = (newLineIndent)? newLineIndent[0] : "";


        if (!indentEnd && indentString !== newIndentString && newIndentString !== lines[i]){
            indentedLines.push(lines[i].trim())
            if (!indentStart){
                indentStartPos = i
            }
            indentStart = true
        }
        else if (indentStart){
            indentEnd = true
        }
    }

    if (indentStartPos >= 0 && (indentStartPos - start)/lines.length < FILTER_TOLERANCE){
        for (let line of indentedLines){
            console.log(line);
        }
        return indentedLines;
    }

    return [];

    // TODO Check for numbered list (for both ingredients and instructions probably in a shared function) 

}

function parseTime(lines: string[], end: number){
    let count = 0
    for (const line of lines){
        if (count == end){
            break
        }
        if (line.toLowerCase().trim().startsWith('total time')){
            //TODO: Take care of case where time is on next line with total time

            let parsedLine = line.trim().substring(10).trim().split(/([0-9]+)/).filter((value) => {
                return value != "";
            })

            if (line.trim().toLowerCase() === "total time"){
                let pos = count + 1
                while (pos < lines.length && lines[pos].length === 0){
                    pos ++
                }
                parsedLine = lines[pos].trim().split(/([0-9]+)/).filter((value) => {
                    return value != "";
                })  
            }


            console.log("Time: " + parsedLine);

            let time = 0;

            for (let i = 0; i < parsedLine.length - 1; i++){
                let number = Number.parseFloat(parsedLine[i])
                if (!Number.isNaN(number)){
                    let timeUnit = parsedLine[i+1].toLocaleLowerCase()
                    if (timeUnit.includes("hour") || timeUnit.includes("hr")){
                        time += number * 60;
                        i++;
                    }
                    else if (timeUnit.includes("minute") || timeUnit.includes("min")){
                        time += number;
                        i++;
                    }
                }
            }

            if (time > 0){
                return time;
            }
        }
        count ++
    }


    return 0;
}

function parseAuthor(lines: string[], author: number[]){
    let words = lines[author[0]].split(/\s+/)
    let string = ""
    if (words.length > 1){
        for (let i = 1; i < words.length; i++){
            string = string + words[i]
            if (i < words.length - 1){
                string = string + " "
            }
        }
    }
    else{
        let pos = author[0] + 1
        while (pos < lines.length){
            if (lines[pos].length > 0 && lines[pos].split(/\s+/).length < 7){
                string = lines[pos]
                break;
            }

            pos ++
        }
    }
    return string
    
}