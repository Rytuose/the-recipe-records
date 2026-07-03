import { Ingredient } from "./ingredient";


export class Recipe{
    id: number = NaN;
    name: string = "";
    website: string = "";
    cooking_time: number = 0;
    author: string = "";
    starred: boolean = false;
    categories: string[] = [];
    images: string[] = [];
    ingredients: Ingredient[] = [];
    instructions: string[] = [];
}