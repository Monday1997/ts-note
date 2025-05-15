interface Iparams{
    params1:string;
    params2:number;
}
// keyof 获取其中所有类型
type TCustKey = {
    [P in keyof Iparams]:  Iparams[P]
}

type allParams = keyof Iparams

type Test = string | number  extends string|number| boolean ?string:never // string
type TGetType<T> = T extends string | number | boolean ? T : never
type Test2 = TGetType<string | number > // string | number
type TestExtract = Extract<string | number | boolean,string|number>


/* function cross<T extends object,U extends object>(obj1:T,obj2:U):string
function cross<T extends object,U extends object,Z extends object>(obj1:T,obj2:U,obj3:Z):number
function cross<T extends object,U extends object,Z extends object>(obj1:T,obj2:U,obj3?:Z):any{
    if(obj3) return 1
    return '1'
}
let one = cross({},{})
let two = cross({},{},{}) */

type Tcross<T> = T extends object ? T : never
function cross<T ,U >(obj1:Tcross<T>,obj2:Tcross<U>):string
function cross<T ,U ,Z >(obj1:Tcross<T>,obj2:Tcross<U>,obj3:Tcross<Z>):number
function cross<T ,U ,Z >(obj1:Tcross<T>,obj2:Tcross<U>,obj3?:Tcross<Z>):any{
    if(obj3) return 1
    return '1'
}
let one = cross({},{})
let two = cross({},{},{})