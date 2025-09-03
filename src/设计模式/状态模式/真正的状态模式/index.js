// 具体状态类 - 关闭状态
var OffState = /** @class */ (function () {
    function OffState() {
    }
    OffState.prototype.changeState = function (light) {
        light.setState(new WeakLightState());
        console.log("从关闭状态切换到弱光状态");
    };
    OffState.prototype.getLabel = function () {
        return "关闭";
    };
    OffState.prototype.getValue = function () {
        return "off";
    };
    return OffState;
}());
// 具体状态类 - 弱光状态
var WeakLightState = /** @class */ (function () {
    function WeakLightState() {
    }
    WeakLightState.prototype.changeState = function (light) {
        light.setState(new OnState());
        console.log("从弱光状态切换到正常状态");
    };
    WeakLightState.prototype.getLabel = function () {
        return "弱光";
    };
    WeakLightState.prototype.getValue = function () {
        return "weakLight";
    };
    return WeakLightState;
}());
// 具体状态类 - 正常状态
var OnState = /** @class */ (function () {
    function OnState() {
    }
    OnState.prototype.changeState = function (light) {
        light.setState(new StrongLightState());
        console.log("从正常状态切换到强光状态");
    };
    OnState.prototype.getLabel = function () {
        return "正常";
    };
    OnState.prototype.getValue = function () {
        return "on";
    };
    return OnState;
}());
// 具体状态类 - 强光状态
var StrongLightState = /** @class */ (function () {
    function StrongLightState() {
    }
    StrongLightState.prototype.changeState = function (light) {
        light.setState(new OffState());
        console.log("从强光状态切换回关闭状态");
    };
    StrongLightState.prototype.getLabel = function () {
        return "强光";
    };
    StrongLightState.prototype.getValue = function () {
        return "strongLight";
    };
    return StrongLightState;
}());
// Context 类
var Light = /** @class */ (function () {
    function Light() {
        // 初始状态为关闭
        this.state = new OffState();
    }
    // 设置当前状态
    Light.prototype.setState = function (state) {
        this.state = state;
    };
    // 切换状态
    Light.prototype.changeState = function () {
        this.state.changeState(this);
    };
    // 获取当前状态标签
    Light.prototype.getCurrentStateLabel = function () {
        return this.state.getLabel();
    };
    // 获取当前状态值
    Light.prototype.getCurrentStateValue = function () {
        return this.state.getValue();
    };
    // 执行当前状态对应的操作
    Light.prototype.performAction = function () {
        var stateValue = this.getCurrentStateValue();
        switch (stateValue) {
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
    };
    // 获取当前状态实例（用于测试或特殊操作）
    Light.prototype.getCurrentState = function () {
        return this.state;
    };
    return Light;
}());
// 使用示例
var light = new Light();
console.log("=== 灯光状态模式使用示例 ===\n");
// 初始状态
console.log("\u521D\u59CB\u72B6\u6001: ".concat(light.getCurrentStateLabel()));
light.performAction();
console.log('');
// 切换状态并执行操作
console.log("开始状态切换:");
for (var i = 0; i < 4; i++) {
    console.log("\n--- \u7B2C ".concat(i + 1, " \u6B21\u5207\u6362 ---"));
    light.changeState();
    console.log("\u5F53\u524D\u72B6\u6001: ".concat(light.getCurrentStateLabel()));
    light.performAction();
}
// 直接操作示例
console.log("\n=== 直接状态操作示例 ===");
var testLight = new Light();
// 手动设置状态
testLight.setState(new OnState());
console.log("\u624B\u52A8\u8BBE\u7F6E\u72B6\u6001: ".concat(testLight.getCurrentStateLabel()));
testLight.performAction();
// 再切换一次
testLight.changeState();
console.log("\u5207\u6362\u540E\u72B6\u6001: ".concat(testLight.getCurrentStateLabel()));
testLight.performAction();
// 状态检测示例
console.log("\n=== 状态检测示例 ===");
if (testLight.getCurrentState() instanceof StrongLightState) {
    console.log("✅ 当前是强光状态");
}
else {
    console.log("❌ 当前不是强光状态");
}
// 重置为关闭状态
testLight.setState(new OffState());
console.log("\u91CD\u7F6E\u540E\u72B6\u6001: ".concat(testLight.getCurrentStateLabel()));
