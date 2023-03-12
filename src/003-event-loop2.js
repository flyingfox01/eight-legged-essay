async function test1() {
  console.log('start test1');
  console.log(await test2());
  console.log('end test1');
}
async function test2() {
  console.log('test2');
  return await 'return test2 value';
}
test1();
console.log('start async');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('end async');

//输出
/* 
start test1
test2
start async
promise1
end async
promise2
return test2 value
end test1
setTimeout
*/