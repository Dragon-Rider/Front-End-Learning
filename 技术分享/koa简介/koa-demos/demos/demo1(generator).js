const Koa = require('koa');
const app = new Koa();

function* gen(x){
  var y = yield x + 2;
  y = yield y + 2;
  return y;
}

app.use(function *(){
    var g = gen(1);
    var result1 = JSON.stringify(g.next()) + '\n\n';   // { value: 3, done: false }
    var result2 = JSON.stringify(g.next(10)) + '\n\n'; // { value: 12, done: false }
    var result3 = JSON.stringify(g.next(10)); // { value: undefined, done: true }

    this.body = result1 + result2 + result3;
});

app.listen(3000);


/*
    next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据。
    上面代码中，第一个 next 方法的 value 属性，返回表达式 x + 2 的值（3）。第二个 next 方法带有参数10，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量 y 接收。因此，这一步的 value 属性，返回的就是12（变量 y 的值）。
 */
