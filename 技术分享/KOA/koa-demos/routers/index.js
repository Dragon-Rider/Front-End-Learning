const Router = require('koa-router');
var router = new Router();

//koa-router 7.2后支持的写法
router.get('/setcookie', async (ctx, next) => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});
router.get('/getcookie', function (ctx, next) {
    ctx.body = 'Get Cookie!';
    console.log(ctx.session.views)
});

/*
koa-router 7.2之后不支持generator的写法
router.get('/deprecated', function* (ctx, next) {
    ctx.body = '没有一点点防备。。。';
    console.log(ctx);
});
*/

module.exports = router;

/*
app.use(function *(next){
    this.cookies.set('name', 'tobi', { signed: true });
    this.body = '123';
})
app.use(function *(next){
    let a = this.cookies.get('name');
    this.body = '456';
})*/
