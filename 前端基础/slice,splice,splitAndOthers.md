---
layout: default
title: {{ site.name }}
---

# slice, splice, split and others

### slice（数组&字符串）
***
用法：array.slice(start, end)

解释：该方法是对数组进行部分截取，并返回一个数组副本；参数start是截取的开始数组索引，end参数减1等于截取的数组结束索引（可选）；

**注意：slice不会改变原数组；**

    //如果不传入参数二，那么将从参数一的索引位置开始截取，一直到数组尾
    var a=[1,2,3,4,5,6];
    var b=a.slice(0,3);  //[1,2,3]
    var c=a.slice(3);    //[4,5,6]

    //slice除了可以用来截取数组还可以用来截取字符串，用法一致。
    var a="i am a boy";
    var b=a.slice(0,6);  //"i am a"

### splice（数组）
***
用法：array.splice(start,deleteCount,item...)

解释：splice方法从array中移除一个或多个数组，并用新的item替换它们。参数start是从数组array中移除元素的开始位置。参数deleteCount是要移除的元素的个数。  
如果有额外的参数，那么item会插入到被移除元素的位置上。它返回一个包含被移除元素的数组。

**注意：splice会改变原数组；**

    var a=['a','b','c'];
    var b=a.splice(1,1,'e','f');  //a=['a','e','f','c'],b=['b']

### split（字符串）
***
用法：string.split(separator,limit)

解释：split() 方法用于把一个字符串分割成字符串数组。可选参数limit可指定返回的数组的最大长度。separator参数可以是一个字符串或一个正则表达式, 从该参数指定的地方分割 stringObject。分割的结果不含separator。如果separator为空，则会返回一个单字符数组。

注意：split不会改变原字符串；

    var a="01234056";
    var b=a.split("",3);  //b=["0", "1", "2"]
    var c=a.split("");    //c=["0", "1", "2", "3", "4", "0", "5", "6"]
    var d=a.split("0");   //d=["", "1234", "56"]

### join（数组）
***
用法：arrayObject.join(separator)

解释：join() 方法用于把数组中的所有元素放入一个字符串。使用separator参数作为分隔符进行分隔。

注意：join不会改变原数组；

    var a=['a','b','c'];
    var b=a.join('');  //b="abc"
    var c=a.join(','); //c="a,b,c"

### reduce（数组）
***
用法：array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

解释：reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。 对于空数组reduce()是不会执行回调函数的。

参数 | 描述 
----|------
function(total,currentValue, index,arr)   | 必需。用于执行每个数组元素的函数。 
空                                        | total：必需。初始值, 或者计算结束后的返回值。 
空                                        | currentValue：必需。当前元素。
空                                        | currentIndex：可选。当前元素的索引。
空                                        | arr：可选。当前元素所属的数组对象。                            
initialValue | 可选。如果指定 initialValue，则它将用作初始值来启动累积。第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。

注意：reduce不会改变原数组；

    var numbers = [65, 44, 12, 4];
     
    function getValue(total, currentValue, currentIndex, arr) {
        //在函数运行期间并不会产生新数组。
        console.log("total: " + total);
        console.log("currentValue: " + currentValue);
        console.log("currentIndex: " + currentIndex);
        console.log("arr: " + arr);
        return total - currentValue;
    }
    var value = numbers.reduce(getValue); //value=5

#### 参考文档
+ [javascript中不易分清的slice,splice和split三个函数](http://www.jb51.net/article/81663.htm)
+ [JavaScript reduce() 方法](http://www.runoob.com/jsref/jsref-reduce.html)
+ [reduce 方法 (Array) (JavaScript)](https://msdn.microsoft.com/library/ff679975(v=vs.94).aspx)



