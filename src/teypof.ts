interface Icustom{
    name:string;
    age:number;
    sex:string;
    height:number;
    weight:number;
    isMarried:boolean;
    hobby:string[];
    job:{
        name:string;
        salary:number;
    }
}

type DirectKey<T> =  T extends any ?  T :never
type keys2 = DirectKey<keyof Icustom>