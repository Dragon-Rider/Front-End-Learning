* Note: http://es6.ruanyifeng.com/#docs/

# <EMCAScript 6>学习笔记

### chapter 2 let 和 const命令
#### 2.2 块级作用域与函数声明
<pre>
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
</pre>

上面代码在ES5中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。
<pre>
// ES5版本
function f() { console.log('I am outside!'); }
(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
</pre>

ES6的运行结果就完全不一样了，会得到“I am outside!”。因为块级作用域内声明的函数类似于let，对作用域之外没有影响，实际运行的代码如下。
<pre>
// ES6版本
function f() { console.log('I am outside!'); }
(function () {
  f();
}());
</pre>

很显然，这种行为差异会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6在附录B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
    * 允许在块级作用域内声明函数。
    * 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
    * 同时，函数声明还会提升到所在的块级作用域的头部。
注意，上面三条规则只对ES6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。
<pre>
// 前面的代码在ES6的浏览器环境(Chrome环境下),实际运行的是下面的代码。
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
</pre>

#### 2.4 全局对象的属性
ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。
<pre>
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
</pre>
上面代码中，全局变量a由var命令声明，所以它是全局对象的属性；全局变量b由let命令声明，所以它不是全局对象的属性，返回undefined。

#### 3.2 对象的解构赋值
##### 3.2.1
也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
<pre>
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
</pre>
上面代码中，真正被赋值的是变量baz，而不是模式foo。

#####3.2.2
<pre>
let foo;
({foo} = {foo: 1}); // 成功

let baz;
({bar: baz} = {bar: 1}); // 成功
</pre>
上面代码中，let命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。

##### 3.2.3
对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
<pre>
  let { log, sin, cos } = Math;
</pre>
上面代码将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。

### 4.字符串的扩展

### 5.正则的扩展

### 6.数值的扩展

### 8.数组的扩展
##### 8.1 扩展运算符
该运算符主要用于函数调用。
<pre>
let demo = function demo(...values){
    console.warn(values.join('\n'));
}
demo('start', 1, 3, 5, 7, 9, 'end');
// 输出：
// start
// 1
// 3
// 5
// 7
// 9
// end
// 如不使用 (...) 则需要
demo(['start', 1, 3, 5, 7, 9, 'end']);
</pre>

### 9.对象的扩展
##### 9.1
上面代码表明，ES6允许在对象之中，只写属性名，不写属性值。
<pre>
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
</pre>

##### 9.4
Object.is()  “Same-value equality”（同值相等）

##### 9.5
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

##### 9.6
Object.keys()：返回对象自身的所有可枚举的属性的键名

### 10 Symbol

### 11 Proxy和Reflect

### 12 Set和Map数据结构
Set Weakset Map WeakMap

### 13 Iterator和for...of循环
##### 13.1 概念
遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

##### 13.2 默认 Iterator 接口
对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作Map结构使用，ES5 没有 Map 结构，而 ES6 原生提供了

### 14 Generator函数



### 15 Promise对象
??上面代码中，Promise指定在下一轮“事件循环”再抛出错误，结果由于没有指定使用try...catch语句，就冒泡到最外层，成了未捕获的错误。因为此时，Promise的函数体已经运行结束了，所以这个错误是在Promise函数体外抛出的。

### 16 异步操作和Async函数

### 17 Class


19.Module

#####CommonJS和ES6模块加载的区别
