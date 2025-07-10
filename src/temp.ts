/* interface Animal {
    name:string
}
interface Fish extends Animal {
    swim:()=>void
}
let ani:Animal={name:'s'}
let fish:Fish={name:'s',swim:()=>{}}
ani = fish
fish = ani */


/* const objData:object = undefined
const objData2:Object = undefined
const objData3:Object = 44
 */

/* const data:unknown = 5454
const numberData:number = data
function go(man:unknown){
    man.wife = '4445' // error
}
function go2(man:any){
    man.wife = '4445' // true
}
 */

/* interface INAME  {name:string,age:number,[key:string]:any}
let obj:INAME={
    name:'name',
    age:126,
    1:'abc',
    true:12,
    a:'sdfs'
} */

/* const sy1 = Symbol('1212')
interface Ieg{
    age:number,
    [sy1]:string
}
type A = Ieg[typeof sy1]
 */

// 获取所有类型 
/* type dog={
    type:string,
    age:number,
    name:string
}
// type TDogAttr = keyof dog
// let a:TDogAttr='name'
type TAllKeys<T> = T extends any?T:never
type TDogAttr = TAllKeys<keyof dog>
const a:TDogAttr='age' */

/**
 * 可变元组
 */
/* const custom:[string,number,number,...any[]] = ['sdf',123,123,'sdf',44544,999]
const [string1,number1,...rest]:[string,number,...any[]] = custom
console.log(rest); */

// enum week {
//     monday
// }

/* const week:Record<string,any> = ((()=>{
    const week:Record<string,any> = {}
    week[week['monday']=1] = 'monday'
    return week
})())
console.log(week.monday);
console.log(week[1]); */


/* class Animal{}
class Dog extends Animal{
    say(a:string){}
    hi(){}
}
class Tiger extends Animal{
    say(number:string){}
}
type TAllKeys<T> = T extends any?T:never
type TDogAttr = TAllKeys<keyof Dog>
const DogAttr:TDogAttr = 'hi'

function getDog(dag:Dog,dd2:string):string{
    return '1222'
}

type TGetParams<T> = T extends (...params:infer P)=>any?P:never
type TGetReturn<T> = T extends (...params:any)=>infer P?P:never
type getDogParams=TGetParams<typeof getDog>
type getDogReturn=TGetReturn<typeof getDog>

type arr1={label:string,value:number,disabled:false}[]
type getArrType<T>=T extends (infer P)[]?P:T
type arr2=getArrType<arr1> */

/* class Dog {
    say(a:string){}
    hi(){}
}
type TDog = {
    [P in keyof Dog]:Dog[P]
}
type TgetType<T> = T extends any?T:never
type TgetObjType<T>=TgetType<keyof T>

type TDogAttr = TgetObjType<Dog>
const dogAttr:TDogAttr = 'say' */

/* type A = {age:number,name:string,title:string}
type B = {age:number,title:string}
type MTAB = keyof (A|B) */

/* type Modules = {
    menu:{
        setA:(index:string)=>string
        setB:(index:string)=>string
    },
    tabs:{
        setC:(index:string)=>string
        setD:(index:string)=>string
    }
}
type MB<T,U>=`${T &string}/${U & string}`
// type testdata = MB<'test','hi'|'no'>
type TFlatObj<T> = {
    [P in keyof T]:MB<P,keyof T[P]>
}[keyof T]
type TFlatModules = TFlatObj<Modules> */

/* type AddAttrToObj<T,K extends string,V> = {
    [P in keyof T|K]:P extends keyof T?T[P]:V
}
interface cc{
    name:string,
    phone:string
}

type selfCC = AddAttrToObj<cc,'weixin',string> */

/* export type Tcross<T> = Extract<T,number>


function cross<T ,U >(obj1:Tcross<T>,obj2:Tcross<U>):string
function cross<T ,U ,Z >(obj1:Tcross<T>,obj2:Tcross<U>,obj3:Tcross<Z>):number
function cross<T ,U ,Z >(obj1:Tcross<T>,obj2:Tcross<U>,obj3?:Tcross<Z>):any{
    if(obj3) return 1
    return '1'
}
cross(16,55) */

/* type a = {
    name:string,
    age:number
}
type TOmit<T,K extends keyof T> = {
    [P in keyof T as Exclude<P,K>]:T[P]
}
type c = TOmit<a,'age'>


type ccc<T> = `${Capitalize<T & string>}`;
const a: ccc<'sdfdsf'> = 'Sdfdsf'; */
/* import * as space1 from 'space1';
space1.go(5555) */
/* function address<T extends { new(...args: any): any }>(student: T) {
    return class extends student {
        constructor(...arg: any[]) {
            super(...arg)
            this.address = 'address'
        }
    }
}
function beforeClass(targetClassPropertype: any, name: string, methodDesc: TypedPropertyDescriptor<any>) {
    const fn = targetClassPropertype[name]
    methodDesc.value = function (...args:any[]) {
        console.log('铃铃铃！！！！');
        return fn.apply(this,args)
    }
}

@address
class Student {
    address: ''
    constructor(public name: string, public age: number) { }
    @beforeClass
    goClass(name:string) {
        console.log(name+'上课')
    }
}

const student = new Student('这是一个学生', 4545)
student.goClass('小名')  */


export default {}