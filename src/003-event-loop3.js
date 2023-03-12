async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3');
});
console.log('script end');

/**
 * 输出顺序 
  script start
  async1 start
  async2
  promise1
  promise2
  script end
  async1 end
  promise3
  setTimeout
 */

  async function async1() {
    console.log('async1 start');
    await return 'async2';
    console.log('async1 end');
  }
  async function async2() {
    console.log('async2');
  }
  console.log('script start');
  setTimeout(function () {
    console.log('setTimeout');
  }, 0)
  async1();
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
    console.log('promise2')
  }).then(function () {
    console.log('promise3');
  });
  console.log('script end');