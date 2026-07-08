import { Measurement } from "./measurement";

export class Ingredient{
    name: string = "";
    quantity: number = -1;
    measurement: Measurement = "";

    toString(){
        let str = this.quantity.toString();
        if(this.measurement !== ""){
            str += " " + this.measurement
        }
        return str + " " + this.name;

    }
}