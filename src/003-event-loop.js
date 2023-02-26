console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

/**
 * 输出顺序 
 * script start
 * script end
 * promise1
 * promise2
 * setTimeout
 */

