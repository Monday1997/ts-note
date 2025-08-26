/* var Event = (function () {
    var clientList = {},
        listen,
        trigger,
        remove;
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };
    remove = function (key, fn) {
        var fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})(); */
const Event = {
    clientList:{},
    listen (key:string, fn:Function) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger(...args:[string,...any[]]) {
        var key = Array.prototype.shift.call(args),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, args);
        }
    },
     remove(key:string, fn:Function) {
        var fns = this.clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    }
}
function fn(price:number){
    console.log('发布了一套88平的房子，价格= ' + price); // 输出：'价格=2000000'
}
Event.listen('squareMeter88', fn);
Event.trigger('squareMeter88', 2000000); // 售楼处发布消息
setTimeout(()=>{
    Event.remove('squareMeter88',fn)
    Event.trigger('squareMeter88', 2000000); // 售楼处发布消息
},1000)
export {}