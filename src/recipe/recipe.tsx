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