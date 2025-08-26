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
}


function order500(orderType:EOrderType,pay:boolean,stock:number){
    if(orderType === EOrderType.prepay500 && pay){
        console.log('预付500元，得到100优惠');
    }else{
        return 'next'
    }
}
function order200(orderType:EOrderType,pay:boolean,stock:number){
    if(orderType === EOrderType.prepay200 && pay){
        console.log('预付200元，得到100优惠');
    }else{
        return 'next'
    }
}
function orderNormal(orderType:EOrderType,pay:boolean,stock:number){
    if( stock>0){
        console.log('普通购买 无优惠券');
    }else{
       console.log('库存不足');
       
    }
}


const order500Chain = new Chain(order500);
const order200Chain = new Chain(order200);
const orderNormalChain = new Chain(orderNormal);
order500Chain.setNextSuccessor(order200Chain);
order200Chain.setNextSuccessor(orderNormalChain);

let store = 3
order500Chain.passRequest(EOrderType.prepay500,true,store--);
order500Chain.passRequest(EOrderType.prepay200,true,store--);
order500Chain.passRequest(EOrderType.normal,true,store--);
order500Chain.passRequest(EOrderType.normal,true,store--);
