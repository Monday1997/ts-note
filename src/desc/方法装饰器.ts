/**
 * 
 * @param targetClassPrototype 
 * @param methodname 
 * @param methodDecri 
 */
function fnDesc(targetClassPrototype:any,methodname:string,methodDecri:TypedPropertyDescriptor<any>){
    console.log("🚀 ~ fnDesc ~ targetClassPrototype:", targetClassPrototype)
    console.log("🚀 ~ fnDesc ~ methodname:", methodname)
    console.log("🚀 ~ fnDesc ~ methodDecri:", methodDecri)
    methodDecri.value()

}
function attrDesc(targetClassPrototype:object,attrName:string|symbol){
    
}
class CustomerServices {
    constructor(public name:string) { 
        console.log(this.name);
        
    }
     
    @fnDesc
    buy() {
        console.log(this.name + '购买');
    }
    placeOrder() {
        console.log(this.name + '下单购买');

    }
    @attrDesc
    age:11
}
export {}