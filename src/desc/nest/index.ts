
import 'reflect-metadata'

class userService {
    name: string = '名字'
    public login() {
        console.log(this.name + '登录');

    }
}

type MyPropDecorator = (target: any, key: string | symbol) => void
// propertyDecorator
function Inject(injectid: string): MyPropDecorator {
    return (target, key) => {
        // 拿到这个装饰器上修饰这个属性的类型
        let propClass = Reflect.getMetadata("design:type", target, key)
        const propClassObj = new propClass()
    }
}

type TMyMethodDecorator = (target: any, methodName: string, dataProps: PropertyDescriptor) => void
function get(path: string): TMyMethodDecorator {
    return (targetPrototype, methodName, dataProps) => {
        // 原型方法上定义一个元数据path
        Reflect.defineMetadata("path", path, targetPrototype, methodName)
        console.log("🚀 ~ return ~ methodName:", methodName)
        console.log("🚀 ~ return ~ targetPrototype:", targetPrototype)
        console.log("🚀 ~ return ~ path:", path)
    }
}

// 控制器装饰器获取装饰器上定义的元数据--此处是login22到login上
function Controller(rootPath: string) {
    return function <T extends { new(...args: any): any }>(targetClass: T) {
        console.log("🚀 ~ <Textends{new ~ targetClass.prototype:", targetClass.prototype)
        // tsconfig中的target改为es5才能够执行
        Object.keys(targetClass.prototype).forEach(methodName => {
            const result = Reflect.getMetadata("path",targetClass.prototype,methodName)
            console.log("🚀 ~ Object.keys ~ methodName:", result)
        })
    }
}

@Controller('/')
class UserController {
    @Inject("userService")
    private userService?: userService

    @get("/login22")
    public login(): void {

    }
}

