// 状态接口
interface LightState {
    changeState(light: Light): void;
    getLabel(): string;
    getValue(): string;
}

// 具体状态类 - 关闭状态
class OffState implements LightState {
    changeState(light: InstanceType<typeof Light> ): void {
        light.setState(new WeakLightState());
        console.log("从关闭状态切换到弱光状态");
    }
    getLabel(): string {
        return "关闭";
    }
    getValue(): string {
        return "off";
    }
}

// 具体状态类 - 弱光状态
class WeakLightState implements LightState {
    changeState(light: Light): void {
        light.setState(new OnState());
        console.log("从弱光状态切换到正常状态");
    }
    getLabel(): string {
        return "弱光";
    }
    getValue(): string {
        return "weakLight";
    }
}

// 具体状态类 - 正常状态
class OnState implements LightState {
    changeState(light: Light): void {
        light.setState(new StrongLightState());
        console.log("从正常状态切换到强光状态");
    }
    getLabel(): string {
        return "正常";
    }
    getValue(): string {
        return "on";
    }
}

// 具体状态类 - 强光状态
class StrongLightState implements LightState {
    changeState(light: Light): void {
        light.setState(new OffState());
        console.log("从强光状态切换回关闭状态");
    }
    getLabel(): string {
        return "强光";
    }
    getValue(): string {
        return "strongLight";
    }
}

// Context 类
class Light {
    private state: LightState;
    
    constructor() {
        // 初始状态为关闭
        this.state = new OffState();
    }
    
    // 设置当前状态
    setState(state: LightState): void {
        this.state = state;
    }
    
    // 切换状态
    changeState(): void {
        this.state.changeState(this);
    }
    
    // 获取当前状态标签
    getCurrentStateLabel(): string {
        return this.state.getLabel();
    }
    
    // 获取当前状态值
    getCurrentStateValue(): string {
        return this.state.getValue();
    }
    
    // 执行当前状态对应的操作
    performAction(): void {
        const stateValue = this.getCurrentStateValue();
        
        switch(stateValue) {
            case 'off':
                console.log("💡 执行关闭操作：切断电源");
                break;
            case 'weakLight':
                console.log("💡 执行弱光操作：降低亮度至30%");
                break;
            case 'on':
                console.log("💡 执行正常操作：设置亮度至70%");
                break;
            case 'strongLight':
                console.log("💡 执行强光操作：设置亮度至100%");
                break;
        }
    }
    
    // 获取当前状态实例（用于测试或特殊操作）
    getCurrentState(): LightState {
        return this.state;
    }
}

// 使用示例
const light = new Light();

console.log("=== 灯光状态模式使用示例 ===\n");

// 初始状态
console.log(`初始状态: ${light.getCurrentStateLabel()}`);
light.performAction();
console.log('');

// 切换状态并执行操作
console.log("开始状态切换:");
for (let i = 0; i < 4; i++) {
    console.log(`\n--- 第 ${i + 1} 次切换 ---`);
    light.changeState();
    console.log(`当前状态: ${light.getCurrentStateLabel()}`);
    light.performAction();
}

// 直接操作示例
console.log("\n=== 直接状态操作示例 ===");
const testLight = new Light();

// 手动设置状态
testLight.setState(new OnState());
console.log(`手动设置状态: ${testLight.getCurrentStateLabel()}`);
testLight.performAction();

// 再切换一次
testLight.changeState();
console.log(`切换后状态: ${testLight.getCurrentStateLabel()}`);
testLight.performAction();

// 状态检测示例
console.log("\n=== 状态检测示例 ===");
if (testLight.getCurrentState() instanceof StrongLightState) {
    console.log("✅ 当前是强光状态");
} else {
    console.log("❌ 当前不是强光状态");
}

// 重置为关闭状态
testLight.setState(new OffState());
console.log(`重置后状态: ${testLight.getCurrentStateLabel()}`);