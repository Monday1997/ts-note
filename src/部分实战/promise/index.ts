// 定义 Promise 的三种状态
enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

// 定义 Promise 解析回调函数的类型
type Resolve<T> = (value: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;

// 定义 then 方法的回调函数类型
type OnFulfilled<T, TResult> = ((value: T) => TResult | PromiseLike<TResult>) | undefined | null;
type OnRejected<TResult> = ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null;

class MyPromise<T> {
  // Promise 的当前状态
  private state: PromiseState = PromiseState.PENDING;
  // Promise 的最终值
  private value?: T;
  // Promise 的拒绝原因
  private reason?: any;
  // 存储成功回调队列
  private onFulfilledCallbacks: Array<() => void> = [];
  // 存储失败回调队列
  private onRejectedCallbacks: Array<() => void> = [];

  constructor(executor: Executor<T>) {
    try {
      // 立即执行 executor
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 如果 executor 执行出错，直接 reject
      this.reject(error);
    }
  }

  // resolve 方法
  private resolve(value: T | PromiseLike<T>): void {
    // 只有 pending 状态可以转换
    if (this.state !== PromiseState.PENDING) return;

    // 处理 thenable 对象（PromiseLike）
    if (value && typeof (value as PromiseLike<T>).then === 'function') {
      // 如果是 PromiseLike 对象，则继续等待它的结果
      (value as PromiseLike<T>).then(
        val => this.resolve(val),
        err => this.reject(err)
      );
      return;
    }

    // 设置状态和值
    this.state = PromiseState.FULFILLED;
    this.value = value as T;

    // 执行所有成功回调
    this.onFulfilledCallbacks.forEach(callback => callback());
    this.onFulfilledCallbacks = [];
  }

  // reject 方法
  private reject(reason?: any): void {
    // 只有 pending 状态可以转换
    if (this.state !== PromiseState.PENDING) return;

    // 设置状态和拒绝原因
    this.state = PromiseState.REJECTED;
    this.reason = reason;

    // 执行所有失败回调
    this.onRejectedCallbacks.forEach(callback => callback());
    this.onRejectedCallbacks = [];
  }

  // then 方法
  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: OnFulfilled<T, TResult1>,
    onRejected?: OnRejected<TResult2>
  ): MyPromise<TResult1 | TResult2> {
    // 确保 onFulfilled 和 onRejected 是函数
    const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : (value: T) => value as unknown as TResult1;
    const onRejectedFn = typeof onRejected === 'function' ? onRejected : (reason: any) => { throw reason; };

    // 返回新的 Promise
    const promise2 = new MyPromise<TResult1 | TResult2>((resolve, reject) => {
      // 封装微任务执行
      const microtask = (fn: () => void) => {
        // 使用 queueMicrotask 或 setTimeout 模拟微任务
        if (typeof queueMicrotask === 'function') {
          queueMicrotask(fn);
        } else {
          setTimeout(fn, 0);
        }
      };

      // 处理 fulfilled 状态
      const handleFulfilled = () => {
        microtask(() => {
          try {
            const x = onFulfilledFn(this.value!);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 处理 rejected 状态
      const handleRejected = () => {
        microtask(() => {
          try {
            const x = onRejectedFn(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 根据当前状态决定如何处理
      if (this.state === PromiseState.FULFILLED) {
        handleFulfilled();
      } else if (this.state === PromiseState.REJECTED) {
        handleRejected();
      } else {
        // 如果是 pending 状态，将回调加入队列
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return promise2;
  }

  // 处理 Promise 解析过程
  private resolvePromise<TResult>(
    promise: MyPromise<TResult>,
    x: TResult | PromiseLike<TResult>,
    resolve: Resolve<TResult>,
    reject: Reject
  ): void {
    // 防止循环引用
    if (promise === x) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    // 防止重复调用
    let called = false;

    // 处理 thenable 对象
    if (x && (typeof x === 'object' || typeof x === 'function')) {
      try {
        const then = (x as PromiseLike<TResult>).then;

        if (typeof then === 'function') {
          // 调用 then 方法
          then.call(
            x,
            (y: TResult | PromiseLike<TResult>) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise, y, resolve, reject);
            },
            (r: any) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          // 如果不是 thenable，直接 resolve
          if (called) return;
          called = true;
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      // 基本类型值，直接 resolve
      resolve(x);
    }
  }

  // catch 方法（then 的语法糖）
  catch<TResult = never>(onRejected?: OnRejected<TResult>): MyPromise<T | TResult> {
    return this.then(undefined, onRejected);
  }

  // finally 方法
  finally(onFinally?: () => void): MyPromise<T> {
    return this.then(
      value => MyPromise.resolve(onFinally?.()).then(() => value),
      reason => MyPromise.resolve(onFinally?.()).then(() => { throw reason; })
    );
  }

  // 静态 resolve 方法
  static resolve<T>(value?: T | PromiseLike<T>): MyPromise<T> {
    // 如果已经是 Promise 实例，直接返回
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise<T>(resolve => {
      resolve(value!);
    });
  }

  // 静态 reject 方法
  static reject<T = never>(reason?: any): MyPromise<T> {
    return new MyPromise<T>((_, reject) => {
      reject(reason);
    });
  }

  // 静态 all 方法
  static all<T>(iterable: Iterable<T | PromiseLike<T>>): MyPromise<T[]> {
    return new MyPromise<T[]>((resolve, reject) => {
      const values: T[] = [];
      let count = 0;
      let total = 0;
      
      // 转换为数组并计算总数
      const promises = Array.from(iterable);
      total = promises.length;
      
      if (total === 0) {
        return resolve(values);
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            values[index] = value;
            count++;
            if (count === total) {
              resolve(values);
            }
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }

  // 静态 race 方法
  static race<T>(iterable: Iterable<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      for (const promise of iterable) {
        MyPromise.resolve(promise).then(resolve, reject);
      }
    });
  }

  // 静态 allSettled 方法
  static allSettled<T>(iterable: Iterable<T | PromiseLike<T>>): MyPromise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
    return new MyPromise(resolve => {
      const results: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }> = [];
      let count = 0;
      let total = 0;
      
      const promises = Array.from(iterable);
      total = promises.length;
      
      if (total === 0) {
        return resolve(results);
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = { status: 'fulfilled', value };
            count++;
            if (count === total) {
              resolve(results);
            }
          },
          reason => {
            results[index] = { status: 'rejected', reason };
            count++;
            if (count === total) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  // 静态 any 方法
  static any<T>(iterable: Iterable<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise((resolve, reject) => {
      const errors: any[] = [];
      let count = 0;
      let total = 0;
      
      const promises = Array.from(iterable);
      total = promises.length;
      
      if (total === 0) {
        return reject(new AggregateError([], 'All promises were rejected'));
      }

      promises.forEach(promise => {
        MyPromise.resolve(promise).then(
          value => {
            resolve(value);
          },
          reason => {
            errors.push(reason);
            count++;
            if (count === total) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          }
        );
      });
    });
  }
}

// 测试用例
const promise1 = new MyPromise<number>((resolve, reject) => {
  setTimeout(() => resolve(100), 1000);
});

promise1
  .then(value => {
    console.log('resolved:', value); // 1秒后输出: resolved: 100
    return value + 100;
  })
  .then(value => {
    console.log('chained:', value); // 输出: chained: 200
    return new MyPromise<string>(resolve => resolve('hello'));
  })
  .then(value => {
    console.log('promise:', value); // 输出: promise: hello
    throw new Error('something wrong');
  })
  .catch(error => {
    console.error('caught:', error.message); // 输出: caught: something wrong
  })
  .finally(() => {
    console.log('finally'); // 输出: finally
  });

// 测试静态方法
MyPromise.all([
  MyPromise.resolve(1),
  MyPromise.resolve(2),
  3
]).then(values => {
  console.log('all:', values); // 输出: all: [1, 2, 3]
});

MyPromise.race([
  new MyPromise(resolve => setTimeout(() => resolve('fast'), 100)),
  new MyPromise(resolve => setTimeout(() => resolve('slow'), 500))
]).then(value => {
  console.log('race:', value); // 输出: race: fast
});