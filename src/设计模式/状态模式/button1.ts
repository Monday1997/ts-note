// 传统的那种太过于臃肿 更推荐下面这种
type Tstate = 'off' | 'weakLight' | 'on' | 'strongLight'
type TStateSortList = {
    label: string,
    value: Tstate,
    event:()=>void
}[]
type TStateEvent = {
    [K in Tstate]: () => void
}

class Light {
    public state: Tstate
    stateIndex: number = 0
    stateLabel: string
    private stateEvent: TStateSortList
    constructor(stateEvent: TStateSortList) {
        this.stateEvent = stateEvent
    }
    changeState() {
        const stateIndex = this.stateIndex + 1
        this.stateIndex = stateIndex > this.stateEvent.length - 1 ? 0 : stateIndex
        this.state = this.stateEvent[this.stateIndex].value
        this.stateLabel = this.stateEvent[this.stateIndex].label
        this.stateEvent[this.stateIndex].event()
    }


}

const lightEventList:TStateSortList = [
        { label: '关灯', value: 'off',event(){console.log('关灯')} },
        { label: '开灯', value: 'on' ,event(){  console.log('执行开灯')}},
        { label: '弱光', value: 'weakLight',event(){ console.log('切到弱光')} },
        { label: '强关', value: 'strongLight',event(){ console.log('切到强光')} }
    ]

const light = new Light(lightEventList)
const btn = document.createElement('button')
btn.onclick = () => {
    light.changeState()
}
btn.innerHTML = '这是一个按钮'
document.body.append(btn)
export {}