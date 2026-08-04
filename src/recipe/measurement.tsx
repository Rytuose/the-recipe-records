
const MEASUREMENT_NAMES = ["", 
    "teaspoon", "teaspoons", "t", "tsp",
    "tablespoon", "tablespoons", "T", "tbsp",
    "cup", "cups", "c",
    "fluid ounce", "fluid ounces", "fl oz",
    "pint", "pints", "pt",
    "quart", "quarts", "qt",
    "gallon", "gallons", "gal",
    "ounce", "ounces", "oz",
    "pound", "pounds", "lb", "lbs",
    "gram", "grams", "g"
];

export function getRecommendations(str:string){
    let text = str.toLowerCase();
    return MEASUREMENT_NAMES.filter((value, index) => {
        return value.includes(text)
    })
}

export function validMeasurement(str:string){
    return MEASUREMENT_NAMES.includes(str.toLowerCase())
}


/*
    Liquid Measurement Baseline - Tablespoon
    Mass Measurement Baseline - Gram
*/

export function measurementToBaseline(measurement:string, value:number){
    if(value === -1){
        return -1;
    }

    const categorizedMeasurement = categorizeMeasurement(measurement);

    switch(categorizedMeasurement){
        case "teaspoon":
            return value / 3;
        case "tablespoon":
            return value;
        case "fluid ounce":
            return value * 2;
        case "cup":
            return value * 16;
        case "pint":
            return value * 32;
        case "quart":
            return value * 64;
        case "gallon":
            return value * 256;

        case "gram":
            return value;
        case "ounce":
            return value * 28.35; 
        case "pound":
            return value * 453.59;

        default:
            return value;
    }
}

export function baselineToMeasurement(measurement:string, value:number){
    if(value === -1){
        return -1;
    }

    const categorizedMeasurement = categorizeMeasurement(measurement);

    switch(categorizedMeasurement){
        case "teaspoon":
            return value * 3;
        case "tablespoon":
            return value;
        case "fluid ounce":
            return value / 2;
        case "cup":
            return value / 16;
        case "pint":
            return value / 32;
        case "quart":
            return value / 64;
        case "gallon":
            return value / 256;

        case "gram":
            return value;
        case "ounce":
            return value / 28.35; 
        case "pound":
            return value / 453.59;
        
        default:
            return value;
    }
}

function categorizeMeasurement(str: string){
    const lowercaseString = (str === "T")?str:str.toLowerCase();

    switch(lowercaseString){
        case "teaspoon":
        case "teaspoons":
        case "t":
        case "tsp":
            return "teaspoon";
        case "tablespoon":
        case "tablespoons":
        case "T":
        case "tbsp":
            return "tablespoon";
        case "cup":
        case "cups":
        case "c":
            return "cup";
        case "fluid ounce":
        case "fluid ounces":
        case "fl oz":
            return "fluid ounce";
        case "pint":
        case "pints":
        case "pt":
            return "pint";
        case "quart":
        case "quarts":
        case "qt":
            return "quart";
        case "gallon":
        case "gallons":
        case "gal":
            return "gallon";
        case "ounce":
        case "ounces":
        case "oz":
            return "ounce";
        case "pound":
        case "pounds":
        case "lb":
        case "lbs":
            return "pound";
        case "gram":
        case "grams":
        case "g":
            return "gram";
        default:
            return "";
    }
}