function FirstDesc(name:string) {
    return function (tClass: any) {
        const instance = new tClass(name)
        instance.buy()
        console.log("🚀 ~ FirstDesc ~ tClass:", instance.name)
    }
}
console.log('lets go');


@FirstDesc('新名字')
class CustomerServices {
    constructor(public name:string) { }
    buy() {
        console.log(this.name + '购买');
    }
    placeOrder() {
        console.log(this.name + '下单购买');

    }
}