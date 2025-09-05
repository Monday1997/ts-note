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
    event: (dat: IBaseState<TState<T>>) => (void | Promise<any>),
    cancel?:Function
}[]
function isPromise(result: any): result is Promise<any> {
    return result?.then && typeof result.then === 'function'
}
class CircleEvent<T> implements IBaseState<TState<T>> {
    state: TState<T>
    stateLabel: string
    stateIndex: number = 0
    private changeBeforState:T //非强行介入前提下，类当前所属的状态（用于区别pending）
    private userForce: TState<T> | null = null
    private queueList: Function[] = []
    private stateEvent: TStateSortList<T>
    constructor(stateEvent: TStateSortList<T>) {
        this.stateEvent = stateEvent
        this.state = stateEvent[0].value
        this.stateLabel = stateEvent[0].label || this.state as string
    }
    execState() {
        if (this.state === Pending) {
            this.queueList.push(() => {
                this.execState()
            })
            return
        }
        const nextStateEvent = this.getStateEventByChoice(this.state,'next')
        this.changeState(nextStateEvent.value)
    }
    async changeState(state: T, { pendingFn, force }: { pendingFn?: Function, force?: boolean } = {}) {
        try {
            if(!force){
                this.changeBeforState = state
            }
            if (this.state === Pending && !force) {
                console.log('state处于pending状态，暂无法操作');
                pendingFn && pendingFn()
                return
            } else if (this.state === Pending && force) {
                // 说明上一个还没结束
                this.userForce = state
                const stateEvent = this.getStateEventByChoice(this.changeBeforState,'cur')
                stateEvent.cancel&&stateEvent.cancel()
            }
            this.state = Pending
            const result = this.stateEvent[this.getStateIndexByState(state)].event({
                state: this.state,
                stateIndex: this.stateIndex,
                stateLabel: this.stateLabel
            })
            if (isPromise(result)) {
                await result
            }
            if (this.userForce && !force) {
                throw new Error(`强行介入${this.userForce}`)
            }
            // 执行完了才进入下一个状态
            this.state = state
            this.stateIndex = this.getStateIndexByState(state)
            this.stateLabel = this.stateEvent[this.stateIndex].label || state as string
            const next = this.queueList.shift()
            next && next()
        } catch (error) {
            // state状态回退
            this.state = this.getStateEventByChoice(state,'pre').value
            const stateLabel = this.getStateEventByChoice(state,'cur').label
            console.error(`状态转为${stateLabel}失败：`, error)
        } finally {
            //  让上一个去结束userForce
            if (!force && this.userForce) {
                this.userForce = null
            }
        }
    }
    getStateEventByChoice(state: TState<T>, choiceType: 'next' | 'pre' | 'cur') {
        let stateIndex = this.getStateIndexByState(state)
        const obj = {
            next: () => {
                stateIndex += 1
                return stateIndex > this.stateEvent.length - 1?0:stateIndex
            },
            pre: ()=>{
            stateIndex -= 1
            return stateIndex < 0?this.stateEvent.length - 1:stateIndex
            },
            cur: ()=>stateIndex
        }
        return this.stateEvent[obj[choiceType]()] 
    }
    getStateIndexByState(sate: TState<T>): number {
        return this.stateEvent.findIndex(item => item.value === sate)
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

            return new Promise((r) => {
                console.log('当前数据', data)
                setTimeout(() => {
                    r('ok')
                    console.log('执行完了')
                }, 1000)
            })
        },cancel(){
            console.warn('我要取消了')
        }
    },
    {
        label: '弱光', value: 'weakLight', event(data) {
            return new Promise((_, rj) => {
                console.log('准备状态', data.state);
                setTimeout(() => {
                    console.log('切到弱光')
                    rj('切换失败')
                }, 1000)
            })
        }
    },
    { label: '强关', value: 'strongLight', event() { console.log('切到强光') } }
]

const light = new CircleEvent(lightEventList)
const btn = document.createElement('button')
btn.onclick = () => {
    light.execState()
}
btn.innerHTML = '切换灯光'
document.body.append(btn)

const btn2 = document.createElement('button')
btn2.onclick = () => {
    light.changeState('off', { force: true })
}
btn2.innerHTML = '关灯'
document.body.append(btn2)
