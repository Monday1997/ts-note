//泛型函数工厂函数类型
class School{
    studentNum:number=23
    constructor(public name:string){
        console.log('创建');
        
    }
}
type Tconstructor = new (...args:any)=>School

function createFactiory(cons:Tconstructor){
    new cons()
}
createFactiory(School)

type S = string[] & string

