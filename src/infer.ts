interface Iparams{
    params1:string;
    params2:number;
}
type Tfn1 = (params:Iparams)=>number;
// 获取params类型
type Tfn1Params = Tfn1 extends (params:infer P)=>any ? P :Tfn1;
// 获取返回值类型
type Treturn = Tfn1 extends (params:any)=>infer R ? R :Tfn1;

// 封装一下
type TGetParams<T> = T extends (params:infer P)=>any ? P :T;
type TGetReturn<T> = T extends (params:any)=>infer R ? R :T;
type Tfn1P = TGetParams<Tfn1>;
type Tfn1R = TGetReturn<Tfn1>;
// 获取数组类型
type TGetArrayType<T> = T extends (infer P)[] ? P :T;
type TImtem = TGetArrayType<{name:string,age:number}[]>;


class Subject{
    constructor(public subid:number,public subname:string){}
}
let chineseSubject = new Subject(1,'chinese');
let mathSubject = new Subject(1,'math');
let englishSubject = new Subject(1,'english');
let someSubject = new Set([chineseSubject,mathSubject])
type TGetSubject<T> = T extends Set<infer P> ? P :T;
