import Watcher from "./Watcher";

/**
 * 订阅者（观察者）
 */
class Dep {
  private subs: Watcher[] = [];
  constructor() {
    this.subs = []
  }

  public add(watcher: Watcher) {
    this.subs.push(watcher)
  }

  public notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    })
  }

}

export default Dep