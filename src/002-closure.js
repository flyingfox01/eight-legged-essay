/**
 * 一个简单的闭包函数
 * @returns 
 */
function outer() {
  var a = 1

  function inner() {
    console.log(a)    //1
  }
  return inner
}

// case01 - 简单闭包
// outer()();


function createFunc() {
  var result = new Array()

  for (var i = 0; i < 10; i++) {
    // result[i] = function () {
    //   console.log(i)
    // }

    // 解决
    result[i] = (function(i) {
        return function timer() {
          console.log(i);
        }
    })(i);
  }
  return result
}

// case01 - 作用域链
var result = createFunc()
result[0]() //10
result[1]() //10
result[2]() //10
result[3]() //10
result[4]() //10
result[5]() //10
result[6]() //10
result[7]() //10
