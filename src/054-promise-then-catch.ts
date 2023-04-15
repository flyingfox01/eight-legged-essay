function fetchUser(userId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ];
      const user = users.find(u => u.id === userId);
      // throw new Error('测试')
      if(user) {
        resolve(user);
      } else {
        reject(new Error(`reject错误，${userId}未找到`));
      }
    }, 1000);
  });
}

// then抛出错误，catch捕获
fetchUser(1)
  .then(
    (user) => {
      console.log(user.name);
      throw new Error('测试then中抛出错误')
    },
    (error) => {
      console.error("then第二个参数捕获：", error.message);
    }
  ).catch(error => {
    console.error("catch捕获：" + error.message);
  });

// promise错误（reject），就近捕获（这里有第二个参数，所以第二个参数捕获）
fetchUser(4)
  .then(
    (user) => {
      console.log(user.name);
      throw new Error('测试then中抛出错误')
    },
    (error) => {
      console.error("then第二个参数捕获：", error.message);
    }
  ).catch(error => {
    console.error("catch捕获：" + error.message);
  });


// promise错误（reject），就近捕获（这里没有第二个参数，所以catch捕获）
fetchUser(4)
.then(
  (user) => {
    console.log(user.name);
    throw new Error('测试then中抛出错误')
  }
).catch(error => {
  console.error("catch捕获：" + error.message);
});

export default fetchUser