var Light = /** @class */ (function () {
    function Light(stateEvent, sort) {
        this.stateIndex = 0;
        this.stateEvent = stateEvent;
        this.stateSort = sort;
    }
    Light.prototype.changeState = function () {
        var stateIndex = this.stateIndex + 1;
        this.stateIndex = stateIndex > this.stateSort.length - 1 ? 0 : stateIndex;
        this.state = this.stateSort[this.stateIndex];
        this.stateEvent[this.state]();
    };
    return Light;
}());
var lightEvent = {
    off: function () {
        console.log('关灯');
    },
    on: function () {
        console.log('执行开灯');
    },
    weakLight: function () {
        console.log('切到弱光');
    },
    strongLight: function () {
        console.log('切到强光');
    }
};
var light = new Light(lightEvent, ['off', 'on', 'weakLight', 'strongLight']);
var btn = document.createElement('button');
btn.onclick = function () {
    light.changeState();
};
btn.innerHTML = '这是一个按钮';
document.body.append(btn);
