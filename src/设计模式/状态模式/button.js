var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Pending = 'pending';
function isPromise(result) {
    return (result === null || result === void 0 ? void 0 : result.then) && typeof result.then === 'function';
}
class CircleEvent {
    constructor(stateEvent) {
        this.stateIndex = 0;
        this.queueList = [];
        this.stateEvent = stateEvent;
        this.state = stateEvent[0].value;
        this.stateLabel = stateEvent[0].label || this.state;
    }
    execState() {
        if (this.state === Pending || this.queueList.length) {
            this.queueList.push(() => {
                this.execState();
            });
            return;
        }
        const stateIndex = this.stateIndex + 1;
        this.stateIndex = stateIndex > this.stateEvent.length - 1 ? 0 : stateIndex;
        this.changeState(this.stateEvent[this.stateIndex].value);
    }
    changeState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = Pending;
            this.stateIndex = this.stateEvent.findIndex(item => item.value === state);
            this.stateLabel = this.stateEvent[this.stateIndex].label || state;
            const result = this.stateEvent[this.stateIndex].event({
                state: this.state,
                stateIndex: this.stateIndex,
                stateLabel: this.stateLabel
            });
            if (isPromise(result)) {
                yield result;
            }
            this.state = state;
            const next = this.queueList.pop();
            next && next();
        });
    }
}
const lightEventList = [
    {
        label: '关灯', value: 'off', event(data) {
            console.log('关灯');
        }
    },
    {
        label: '开灯', value: 'on', event(data) {
            return new Promise(r => {
                console.log('准备状态', data.state);
                setTimeout(() => {
                    console.log('完成开灯');
                    r('ok');
                }, 10000);
            });
        }
    },
    { label: '弱光', value: 'weakLight', event() { console.log('切到弱光'); } },
    { label: '强关', value: 'strongLight', event() { console.log('切到强光'); } }
];
const light = new CircleEvent(lightEventList);
const btn = document.createElement('button');
btn.onclick = () => {
    light.execState();
};
btn.innerHTML = '这是一个按钮';
document.body.append(btn);
