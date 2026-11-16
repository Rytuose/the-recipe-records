
export class Ingredient{
    name: string = "";
    quantity: number = -1;
    measurement: string = "";

    toString(portion:number = 1){
        let str = (this.quantity === -1)? "":parseFloat((this.quantity*portion).toFixed(4)).toString();
        if(this.measurement !== ""){
            if(str.length != 0){
                str += " " 
            }
            str += this.measurement
        }
        if(this.name !== ""){
            if(str.length != 0){
                str += " " 
            }
            str += this.name
        }
        return str;
    }
}