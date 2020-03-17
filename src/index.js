import { helloworld } from './helloworld'

class People {
  constructor(name){
    this.name = name
  }
  __str__(){
    return `I am ${this.name} i am is a dog`
  }
}
let zxb = new People('zxb')
console.log(zxb.__str__());
// document.write(helloworld())