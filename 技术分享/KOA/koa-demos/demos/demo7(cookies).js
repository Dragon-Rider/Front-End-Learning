const Koa = require('koa');
//const Router = require('koa-router');
const session = require('koa-session');
var app = new Koa();
//var router = new Router();
var routers = require('./routers');
app.keys = ['some secret hurr'];

app.use(session(app));        //注册session
app.use(routers.routes());   //注册router


app.listen(3000);


