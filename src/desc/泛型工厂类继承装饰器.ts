function FirstDesc<T extends {new(...args:any):any}>(cus:T) {
    return class  extends cus{
        constructor(...args:any[]){
            super(args)
            console.log('日志信息',cus.name);
        }
    }
}



@FirstDesc
export class CustomerServices {
    constructor(public name:string) { 
        console.log(this.name);
        
    }
    buy() {
        console.log(this.name + '购买');
    }
    placeOrder() {
        console.log(this.name + '下单购买');

    }
}
new CustomerServices('名字')

class A  {name:string}
class B {
    age:number
}
let a = FirstDesc(A)
let aInstances = new A()
aInstances
// let ACopy:any = A
// ACopy = B
// let BCopy = B
// BCopy = A