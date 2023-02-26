import Watcher from "./Watcher";

function replace(node: any, vm: any) {
  const reg = /\{\{\s*(\S+)\s*\}\}/;// {{ 取中间的字符串 }}

  // 纯文本节点
  if (node.nodeType === 3) {
    const text = node.textContent;
    // 取值
    const exec = reg.exec(text);
    if (exec) {
      let value = exec[1].split('.').reduce((obj, k) => {
        return obj[k];
      }, vm);

      // 替换
      node.textContent = text.replace(reg, value);

      // 订阅
      new Watcher(vm, exec[1], (v: any) => {
        node.textContent = text.replace(reg, v)
      })
    }
  }

  // input输入框
  if (node.nodeType === 1 && node.tagName.toUpperCase() === "INPUT") {
    // 找出v-modle绑定的值
    const attrs = Array.from(node.attributes);
    const findResult: any = attrs.find((x: any) => x.name === "v-model")
    if (findResult) {
      const text = findResult.value;
      const value = text.split(".").reduce((obj: any, k: string) => obj[k], vm);

      // 赋值
      node.value = value
      // 订阅
      new Watcher(vm, text, (v: any) => {
        node.value = v
      })
      // 监听
      node.addEventListener('input', (e: any) => {
        const keyArr = text.split('.')
        const obj = keyArr.slice(0, keyArr.length - 1).reduce((obj: any, k: string) => obj[k], vm)
        console.log(obj)
        obj[keyArr[keyArr.length - 1]] = e.target.value
      })
    }
  }

  // 不是纯文本节点要对dom节点进行递归处理
  node.childNodes.forEach((child: any) => {
    replace(child, vm)
  });
}

function Compier(el: any, vm: any) {
  // 获取元素
  vm.$el = document.querySelector(el);
  // 创建文档片段
  const fragment = document.createDocumentFragment();

  let childNode
  while (childNode = vm.$el.firstChild) {
    fragment.appendChild(childNode);// 具有移动性
  }

  // 编译模版
  replace(fragment, vm)

  // 编译后统一替换
  vm.$el.appendChild(fragment);
}

export default Compier;