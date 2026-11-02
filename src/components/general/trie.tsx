
export class Trie{

    root:TrieNode = new TrieNode();

    constructor(initialValues:string[]){
        initialValues.forEach((value)=>{
            this.add(value.toLocaleLowerCase())
        })
    }

    add(value:string){
        let pos = this.root

        for (const char of value){
            if (!pos.map.has(char)){
                pos.map.set(char, new TrieNode())
            }
            pos = pos.map.get(char)!
        }
        pos.valid = true
    }
}


class TrieNode{
    map = new Map<string, TrieNode>();
    valid = false;
}