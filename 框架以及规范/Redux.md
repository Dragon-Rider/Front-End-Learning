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

### 二、设计思想
Redux 的设计思想很简单，就两句话。

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。

### 三、基本概念和 API
#### 3.1 Store
***
Store是一个对象，就是保存数据的地方。你可以把它看成一个容器，整个应用只能有一个 Store。Store可以看做整个程序运行期间无数State的合集。

    import { createStore } from 'redux';
    const store = createStore(fn);

Redux 提供createStore这个函数，用来生成 Store。createStore函数可以接受另一个函数作为参数，返回新生成的 Store 对象。

#### 3.2 State
***
State也是一个对象，是Store在某个时间点的快照。当前时刻的 State，可以通过store.getState()拿到。

    import { createStore } from 'redux';
    const store = createStore(fn);

    const state = store.getState();

<!-- ![前后端分离结构图](../../img/技术分享/koa1.png) -->
#### 参考文档
+ [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)


