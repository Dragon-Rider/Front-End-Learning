* Note: http://es6.ruanyifeng.com/#docs/

# Module 的语法

### 22.3 export 命令
***
通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。

    function v1() { ... }
    function v2() { ... }

    export {
      v1 as streamV1,
      v2 as streamV2,
      v2 as streamLatestVersion
    };

上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。

### 22.5 模块的整体加载
***
加载模块。

    // main.js

    import { area, circumference } from './circle';

    console.log('圆面积：' + area(4));
    console.log('圆周长：' + circumference(14));

上面写法是逐一指定要加载的方法，**整体加载**的写法如下。

    import * as circle from './circle';

    console.log('圆面积：' + circle.area(4));
    console.log('圆周长：' + circle.circumference(14));

注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

    import * as circle from './circle';

    // 下面两行都是不允许的
    circle.foo = 'hello';
    circle.area = function () {};
