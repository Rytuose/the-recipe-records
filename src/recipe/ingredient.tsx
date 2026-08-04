
export class Ingredient{
    name: string = "";
    quantity: number = -1;
    measurement: string = "";

    toString(portion:number = 1){
        let str = (this.quantity === -1)? "":parseFloat((this.quantity*portion).toFixed(4));
        if(this.measurement !== ""){
            str += " " + this.measurement
        }
        return str + " " + this.name;
    }
}