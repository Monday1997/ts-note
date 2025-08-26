   enum EOrderType {
    prepay500,
    prepay200,
    normal
}

class Chain{
    private successor:Chain|null;
    constructor(private fn:Function){
        this.fn = fn;
        this.successor = null;
    }
    setNextSuccessor(successor:Chain){
        this.successor = successor;
    }
    passRequest(...args:any[]){   
        let ret = this.fn.apply(this,args);
        if(ret === 'next'){
            return this.successor && this.successor.passRequest.apply(this.successor,args);
        }
        return ret;
    }
    next(...args:any[]){
        return this.successor && this.successor.passRequest.apply(this.successor,args);
    }
}
const fn1 = new Chain(()=>{
    console.log(1);
    return 'next'
})
const fn2 = new Chain(function(){
    console.log(2);
    setTimeout(()=>{
        this.next();
    },3000)
})
const fn3 = new Chain(()=>{
    console.log(3);
})
fn1.setNextSuccessor(fn2);
fn2.setNextSuccessor(fn3);
fn1.passRequest();
export {}