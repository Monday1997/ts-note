function cross<T extends object, U extends object>(obj1:T,obj2:U):T&U{
    const combined= {} as T&U 
    union(combined,obj1)
    union(combined,obj2)
    return combined
}
function union(combined:any,curobj:any){
    for(let key in curobj) combined[key] = curobj[key]
    return combined
}