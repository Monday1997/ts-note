// let str:string|undefined
// console.log(str);
// function go(data){
//     console.log(data);
    
// }

// class Animal{
//     constructor(public name:string){}
// }
// class Dog extends Animal{
//     age:number
//     like:string
//     constructor(name:string){
//         super(name)
//     }
// }
// let animal:Animal = new Dog('dog')
// let dog:Dog=new Dog('dog')
// console.log(animal as Dog);

// class Fish{
//     swim(){}
// }
// class Bird{
//     fly(){}
// }
// function go(action:Fish|Bird){
//     if(isFish(action))
//     action.swim()
// }
// function isFish(data:Fish|Bird):data is Fish{
//     return data instanceof Fish
// }

// interface Ref<T>{
//     value:T
// }
// type d = {name:string}
// let dataA:Ref<d>={
//     value:{
//         name:'a'
//     }
// }
// console.log(dataA.value.name);

// interface Go{
//     go:{
//         dd:string
//     }
// }
// let dddd:Go['go']['dd']='a'

type Torder={
    id:string,
    title:string
}
type TTypesKey<T extends object>=keyof T
const data:TTypesKey<Torder>='id'