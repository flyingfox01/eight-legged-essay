import Observer from './Observer';
import Compier from './Compier';

class Vue {
  private $data;
  constructor(options: any) {
    this.$data = options.data;
    // 递归监听内部数据
    Observer(this.$data);

    // 对this.$data.xxx换成this.xxx
    this._()

    // 编译模版
    Compier(options.el, this);
  }

  private _() {
    // 属性代理，方便直接取值
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return this.$data[key];
        },
        set(v) {
          this.$data[key] = v;
        },
      })
    });
  }

}

export default Vue;