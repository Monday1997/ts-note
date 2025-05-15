interface obj{
    readonly name:string,
    age:number,
    address?:string
}
type getAll<T>={
    [K in keyof T]-?:[T[K]]
}
type AllObj = getAll<obj>

type allWrite<T>={
    -readonly [K in keyof T]:T[K]
}
type objWrite =  Readonly<obj> // 去除所有readonly限制