export type Tcross<T> = Extract<T,object>

function cross<T ,U >(obj1:Tcross<T>,obj2:Tcross<U>):string
function cross<T ,U ,Z >(obj1:Tcross<T>,obj2:Tcross<U>,obj3:Tcross<Z>):number
function cross<T ,U ,Z >(obj1:Tcross<T>,obj2:Tcross<U>,obj3?:Tcross<Z>):any{
    if(obj3) return 1
    return '1'
}