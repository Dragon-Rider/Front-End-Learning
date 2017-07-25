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
  var result1 = yield asyncFun('第一个异步操作');
  var result2 = yield asyncFun('第二个异步操作');

  return result1 + '\n' + result2;
}

app.use(function *(){
    let _this = this;
    co(gen).then(function (data){
        console.log(data);
        console.log('Generator 函数执行完成');
    });
    console.log('顺序执行完成');
    this.body = 'hello co!';
});

app.listen(3000);

/*
   co 函数库是著名程序员 TJ Holowaychuk 于2013年6月发布的一个小工具，用于 Generator 函数的自动执行。
   co 函数库可以让你不用编写 Generator 函数的执行器。
 */
