import React, { useEffect, useRef } from "react";

const Component = () => {
  const input = useRef();
  const text = useRef();

  useEffect(() => {
    // 实现双向绑定
    input.current.addEventListener("keyup", function (e) {
      obj.val = e.target.value
    });

    let obj = {}
    Object.defineProperty(obj, 'val', {
      get: function () { return obj.val },
      set: function (_val) {
        input.current.value = _val
        text.current.innerHTML = _val
      }
    })
  }, []);

  return <>
    <input type="text" ref={input}/>
    你输入的文本是：
    <p ref={text} />
  </>
};

export default Component;