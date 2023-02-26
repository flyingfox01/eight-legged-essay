import Dep from './Dep';

function Observer(obj: any) {
  if(!obj || typeof obj !== 'object') return;
  const dep = new Dep()
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    // 递归监听
    Observer(value);

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`取${key}的值：${value}`)
        // 收集有哪些订阅者
        // @ts-ignore
        window._target_ && dep.add(window._target_);
        return value
      },
      set(v) {
        value = v;
        // 重新监听
        Observer(value)

        //通知每个订阅者更新自己的文本
				dep.notify()
      }
    }) 
  })
}

export default Observer