---
layout: default
title: {{ site.name }}
---

# Redux

### 零、你可能不需要 Redux
Redux只是一种状态管理工具，从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。

+ 某个组件的状态，需要共享
+ 某个状态需要在任何地方都可以拿到
+ 一个组件需要改变全局状态
+ 一个组件需要改变另一个组件的状态

### 一、设计思想
Redux 的设计思想很简单，就两句话。

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。

### 二、基本概念和 API
#### 3.1 Store
***
Store是一个对象，就是保存数据的地方。你可以把它看成一个容器，整个应用只能有一个 Store。Store的数据部分可以看做整个程序运行期间无数State的合集，同时它还带着三个重要的function，分别是：subscribe, dispatch, getState。

    import { createStore } from 'redux';
    const store = createStore(fn);

Redux 提供createStore这个函数，用来生成 Store。createStore函数可以接受另一个函数作为参数，返回新生成的 Store 对象。

#### 3.2 State
***
State也是一个对象，是Store在某个时间点的快照。整个应用只有一个 State 对象，包含所有数据。 当前时刻的 State，可以通过store.getState()拿到。

    import { createStore } from 'redux';
    const store = createStore(fn);

    const state = store.getState();

#### 3.3 Action
***
Action是一个对象。当用户交互时，触发View，Action就是 View 发出的通知，表示 State 应该要发生变化了。

    const action = {
        type: 'ADD_TODO',
        payload: 'Learn Redux'
    };

Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

3.4 Action Creator
***
自动生成Action，没啥好说的。
const ADD_TODO = '添加 TODO';

    function addTodo(text) {
        return {
            type: ADD_TODO,
            text
        }
    }

    const action = addTodo('Learn Redux');

上面代码中，addTodo函数就是一个 Action Creator。

####3.5 store.dispatch()
***
store.dispatch()是 View 发出 Action 的唯一方法。

    import { createStore } from 'redux';
    const store = createStore(fn);

    store.dispatch({
        type: 'ADD_TODO',
        payload: 'Learn Redux'
    });

上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。

####3.6 Reducer
***
Reducer 是一个函数。Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

    const reducer = function (state, action) {
        // ...
        return new_state;
    };   

实际应用中，Reducer 函数不用手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，在生成 Store 的时候，需要将 Reducer 传入createStore方法。

    import { createStore } from 'redux';
    const store = createStore(reducer);

上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。

####3.7 纯函数
***
Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。每一个State都对应唯一一个确定的View。

纯函数是函数式编程的概念，必须遵守以下一些约束。

+ 不得改写参数
+ 不能调用系统 I/O 的API
+ 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果





<!-- ![前后端分离结构图](../../img/技术分享/koa1.png) -->
#### 参考文档
+ [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
+ [Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
+ [深入理解React、Redux](http://www.jianshu.com/p/0e42799be566) *(感觉看懂了又感觉没看懂，囧)*
+ [React知识地图--Redux](https://github.com/YutHelloWorld/Blog/issues/3) *(未看)*


