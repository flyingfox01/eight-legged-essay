type Vue = any

/**
 * 发布者（被观察者）
 */
class Watcher {
  vm: Vue;
  cb: Function;
  key: string;

  constructor(vm: Vue, key: string, cb: Function) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 被观察者放全局对象上
    // @ts-ignore
    window._target_ = this;
    // 取值的时候回执行get，此时调用Dep添加依赖列表
    key.split(".").reduce((obj, key) => obj[key], vm);
    // @ts-ignore
    window._target_ = null
  }

  public update() {
    // 更新key指向的最细粒度的值
    const value = this.key.split(".").reduce((obj, key) => obj[key], this.vm)
    this.cb(value)
  }
}

export default Watcher