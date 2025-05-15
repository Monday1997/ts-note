class Person {
    go(data: string) {
        console.log('go', data);
    }
}

const aa = Object.getOwnPropertyDescriptor(Person.prototype, 'go')
let tmp = aa!.value
aa!.value = function (...arg: any[]) {
    console.log('前');
    tmp.apply(this, arg)
    console.log('后');

}
Object.defineProperty(Person.prototype, 'go', aa!)

const person = new Person()
person.go('123')
