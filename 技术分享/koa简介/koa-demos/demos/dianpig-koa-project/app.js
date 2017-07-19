'use strict';

const app = require('@dp/node-server');

app.run({
    appRoot: __dirname,
    ajax: true
}, function*() {
    //如果有自己额外的中间件, 可以写在这里
});
