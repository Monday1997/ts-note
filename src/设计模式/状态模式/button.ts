const Pending = 'pending'
type TState<T> = T | 'pending'
interface IBaseState<T> {
    state: T;
    stateLabel: string;
    stateIndex: number;
}
type TStateSortList<T> = {
    label: string,
    value: T,
    event: (dat: IBaseState<TState<T>>) => (void | Promise<any>)
}[]
function isPromise(result: any): result is Promise<any> {
    return result?.then && typeof result.then === 'function'
}
class CircleEvent<T> implements IBaseState<TState<T>> {
    state: TState<T>
    stateLabel: string
    stateIndex: number = 0
    private queueList: Function[] = []
    private stateEvent: TStateSortList<T>
    constructor(stateEvent: TStateSortList<T>) {
        this.stateEvent = stateEvent
        this.state = stateEvent[0].value
        this.stateLabel = stateEvent[0].label || this.state as string
    }
    execState() {
        if (this.state === Pending ) {
            this.queueList.push(()=>{
                this.execState()
            })
            return
        }
        const stateIndex = this.stateIndex + 1
        this.stateIndex = stateIndex > this.stateEvent.length - 1 ? 0 : stateIndex
        this.changeState(this.stateEvent[this.stateIndex].value)
    }
    async changeState(state: T) {
        this.state = Pending
        this.stateIndex = this.stateEvent.findIndex(item => item.value === state)
        this.stateLabel = this.stateEvent[this.stateIndex].label || state as string
        const result = this.stateEvent[this.stateIndex].event({
            state: this.state,
            stateIndex: this.stateIndex,
            stateLabel: this.stateLabel
        })
        if (isPromise(result)) {
            await result
        }
        this.state = state
        const next = this.queueList.shift()
        next && next()
    }
}

// 传统的那种太过于臃肿 更推荐下面这种
type Tstate = 'off' | 'weakLight' | 'on' | 'strongLight'
const lightEventList: TStateSortList<Tstate> = [
    {
        label: '关灯', value: 'off', event(data) {
            console.log('关灯')
        }
    },
    {
        label: '开灯', value: 'on', event(data) {
            console.log('开灯');
            
            // return new Promise(r => {
            //     console.log('准备状态', data.state);
            //     setTimeout(() => {
            //         console.log('完成关灯')
            //         r('ok')
            //     }, 1000)
            // })
        }
    },
    { label: '弱光', value: 'weakLight', event(data) { 
         return new Promise(r => {
                console.log('准备状态', data.state);
                setTimeout(() => {
                    console.log('切到弱光')
                    r('ok')
                }, 1000)
            })
         } },
    { label: '强关', value: 'strongLight', event() { console.log('切到强光') } }
]

const light = new CircleEvent(lightEventList)
const btn = document.createElement('button')
btn.onclick = () => {
    light.execState()
}
btn.innerHTML = '这是一个按钮'
document.body.append(btn)

const btn2 = document.createElement('button')
btn2.onclick = () => {
    light.changeState('off')
}
btn2.innerHTML = '关灯'
document.body.append(btn2)


