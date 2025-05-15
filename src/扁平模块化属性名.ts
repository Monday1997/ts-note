type Modules = {
    menu:{
        setA:(index:string)=>string
        setB:(index:string)=>string
    },
    tabs:{
        setC:(index:string)=>string
        setD:(index:string)=>string
    }
}

// 模板字符类型
type MB<T,U> = `${T & string}/${U & string}`
type TestMB1 = MB<'menu','setA'|'setB'>

// type TModulesSpliceKeys<T>={
//     [Key in keyof T]:T[Key]
// }
type ModulesSpliceKeys<T> = {
    [Key in keyof T]:MB<Key,keyof T[Key]>
}[keyof T]
//[keyof T]舍掉属性 拿到值
type TestModulesSpliceKeys = ModulesSpliceKeys<Modules>

export type Record<K extends keyof any, T> = {
    [P in K]: T;
};
const aqq:Record<string,any> = {
    123:'sdfdsf',
    'sss':12323
}
console.log("🚀 ~ a:", aqq)
interface One{
    title:string
    isOk:boolean
    desc:string
}
const OneList:One[] = [
    {
        title:'one',
        isOk:true,
        desc:'描述1'
    },
    {
        title:'two',
        isOk:false,
         desc:'描述2'
    }
]

type OneKes = typeof OneList[number]['title']
type OneWithoutDesx  = Omit<One,'desc'>
const OneObj:Record<OneKes,OneWithoutDesx> = {
 one:{
     title:'one',
     isOk:true
 },
 two:{
     title:'two',
     isOk:false
 }
}   

type Tin = {
    [key in 'name'|'age']:string
}
type a = Omit<Tin,'age'>
let student:Tin = {
    name:'张三',
    age:'18',
    // obj:'sdff'//error
}