/* type Tclass = { new(...arg: any[]): any }
type TInstanceClass<T extends Tclass> = { new(...arg: any[]): InstanceType<T> }&{destroy:Function}
const getSingleClass= <T extends Tclass>(userClass:T):TInstanceClass<T> => {
    let instance: any = null
    const fn: TInstanceClass<T> = function (...arg: any[]) {
        return instance || (instance = new userClass(...arg))
    } as any
    (fn as any).destroy = function(...args:any[]){
        instance && instance.destroy?.(args)
        instance = null
    }
    return fn
}

class Stu {
    name = ''
    constructor(name: string) {
        console.log('完成一次构造');
        this.name = name
    }
    init(name: string) {
        this.name = name
    }
    destroy(){
        console.log('写入销毁逻辑');
        this.name = '销毁了'
    }
}

const singleStu = getSingleClass(Stu)
const stu = new singleStu('留一个名字')
const stu2 = new singleStu('来了')
singleStu.destroy()
console.log(stu) */
// 自执行
/* function createWin(html:string){
    const div = document.createElement('div')
    div.innerHTML = html
    div.classList.add('aaa')
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}
const singlecreateWin=(function(){
    let instance:any = null
    function aa(){
        if(!instance){
            instance = createWin('这是一个弹窗')
        }
    }
    return instance
})() */

// 惰性单例
/* function createWin(html:any){
    const div = document.createElement('div')
    div.innerHTML = html
    div.classList.add('aaa')
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}
// fn永远只会单次执行，用于创建对象或者一些如click的事件注册
function getSingle(fn:Function){
    let instance:any = null 
     function singleFn(...arg:any[]){
        return instance || (instance=fn.apply(this,arg))
    }
    singleFn.destroy = () => {
        if (instance) {
            instance.remove();
            instance = null;
        }
    };
    return singleFn
}
const singleWin = getSingle(createWin)
function click(){
    const win = singleWin()
    win.style.display = 'block'
} */

// 渲染即绑定
/* function getSingle(fn:Function){
    let instance:any = null 
     function singleFn(...arg:any[]){
        return instance || (instance=fn.apply(this,arg))
    }
   
    return singleFn
}
const bindEvent = getSingle(()=>{
    document.getElementById('id').onclick=function(){
        alert('1')
    }
    return true
})
const render = ()=>{
    bindEvent()
}
// 多次render 只会对数据进行一次绑定
render()
render()
render() */