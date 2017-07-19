const Koa = require('koa');
const co = require('co');
const app = new Koa();


var asyncFun = function (fileName){
  return new Promise(function (resolve, reject){
    setTimeout(()=> {
        resolve(fileName);
    }, 2000);
  });
};

function* gen(){
  var result1 = await asyncFun('第一个异步操作');
  var result2 = await asyncFun('第二个异步操作');
  console.log(result1);
  console.log(result2);
}

app.use(function *(){
    let _this = this;
    co(gen).then(function (data){
        console.log('Generator 函数执行完成');
    });
    console.log('顺序执行完成');
    this.body = 'hello co!';
});

app.listen(3000);

/*
   异步编程的最高境界，就是根本不用关心它是不是异步。
   一句话，async 函数就是 Generator 函数的语法糖。
   一比较就会发现，async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await，仅此而已。
   async 函数对 Generator 函数的改进，体现在以下三点：1. 内置执行器；2.更好的语义。3. 更广的适用性。
 */
