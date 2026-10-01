import { Ingredient } from "./ingredient";


export class Recipe{
    id: number = NaN;
    name: string = "Food Name?";
    website: string = "Website";
    cooking_time: number = 0;
    author: string = "Author";
    starred: boolean = false;
    categories: string[] = [];
    images: string[] = [];
    imagePaths: string[] = [];
    deletedImages: string[] = [];
    ingredients: Ingredient[] = [];
    instructions: string[] = [];
}

export type RecipeSummaryDetail = {
    id: number;
    name: string;
    cooking_time: number;
    starred: boolean;
    images: string;
}

export type RecipeSearchCriteria = {
    name: string;
    starredValid: boolean;
    starred: boolean;
    time: number;
    timeComparator: string;
    timeDisplayUnit: string;
}

export function printSearchCriteria(criteria:RecipeSearchCriteria){
    console.log("Criteria Details");
    console.log("\tName: " + ((criteria.name === "")? 'N/A': criteria.name));
    console.log("\tStarred: " + ((criteria.starredValid)?((criteria.starred)?"Starred":"Not Starred"):"N/A"))
    console.log("\tTime: " + ((criteria.timeComparator === "")?'N/A':criteria.timeComparator + " " + criteria.time));
}

export function getCriteriaCount(criteria:RecipeSearchCriteria){
    let count = 0

    if (criteria.starredValid){count ++}
    if (criteria.timeComparator !== ""){count ++}

    return count
}