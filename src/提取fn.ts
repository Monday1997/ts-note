interface Idog{
    name:string
    age:number
    shut():void
    run():void
}
type TFn<T>={
    [P in keyof T as T[P] extends Function?P:never]:T[P]
}
type TIdog = TFn<Idog>

type ExcArray<T>=Exclude<T,Array<any>>
// 加上前缀
type TPrefixFn<T extends Record<string,any >>={
    [P in keyof ExcArray<T> as  ExcArray<T>[P]  extends Function?`do${Capitalize<P & string>}`:never]:ExcArray<T>[P]
}
type arr = string[]
type TPrefixDo = TPrefixFn<Idog>

type A = {age:number,name:string}
type B = {age:number,title:string}
type MT = keyof (A|B)



type convert<T> = T extends any?T:never
type tt = convert<keyof Array<any>>