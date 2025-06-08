import 'reflect-metadata'
type MyPropDecorator = (target:any,key:string|symbol)=>void
export function Inject(injectid:string):MyPropDecorator{
    return (target,key)=>{
        // 拿到这个装饰器上修饰这个属性的类型
        let propClass =  Reflect.getMetadata("design:type",target,key)
        propClass = new propClass()
    }
}

class userService{
    name:string='名字'
    public login(){
        console.log(this.name+'登录');
        
    }
}

type TMyMethodDecorator = (target:any,methodName:string,dataProps:PropertyDescriptor)=>void
function get(path:string):TMyMethodDecorator{
    return (target,methodName,dataProps)=>{
        // 原型方法上定义一个元数据path
        Reflect.defineMetadata("path",path,target,methodName)
    }
}


function ControllerDecorator(rootPath:string){
    return function <T extends {new (...args:any):any}>(targetClass:T){
        console.log("🚀 ~ <Textends{new ~ targetClass:", targetClass)
    }
}

// 装饰器顺序 属性-》参数-》方法-》类
@ControllerDecorator('/')
class UserController{
    @Inject("userService")
    private userService?:userService

    @get("/login")
    public login():void{
        
    }
}

