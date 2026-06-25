import { Ingredient } from "./ingredient";


export class Recipe{
    name: String = "";
    website?: String;
    author: String = "";
    categories: String[] = [];
    images: String[] = [];
    ingredients: Ingredient[] = [];
    instructions: String[] = [];
}