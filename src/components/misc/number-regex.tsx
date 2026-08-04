export function applyNumberRegex(text:string){
    const number = text.replaceAll(/[^0-9.]/g,"")
    const decimalSplit = number.split('.')
    return (decimalSplit.length > 1)?decimalSplit[0] + '.' + decimalSplit[1]:decimalSplit[0];
}