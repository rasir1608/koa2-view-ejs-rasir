const Koa = require('koa');
const Logger = require('koa-logger');
const Json = require('koa-json');
const Body = require('koa-body');
const Static = require('koa-static');
const path = require('path');
const KoaViews = require('koa-views');
const MainRouter = require('./routers/mainRouter');
const ErrorRouter = require('./routers/errorRouter');
const Session = require('koa-session');

const app = new Koa();
app.keys = ['koa2-ejs-demo-rasir'];
 
const CONFIG = {
  key: 'sljlsdgj', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(Session(CONFIG,app));

app
  .use(KoaViews(path.join(__dirname,'/views'),{
    extension:'ejs'
  }))
  .use(Static(path.join(__dirname,'/public')))
  .use(async (ctx,next) => {
    if(ctx.path === '/favicon.ico') return;
    const userInfo = ctx.session.userInfo;
    const inUser = /^\/user\//.test(ctx.path);
    if(userInfo || inUser) await next();
    else {
      ctx.body = `
        <script>
          alert('请先登录！');
          location.href = '/user/login';
        </script>
      `
    };
  })
  .use(Json())
  .use(Logger())
  .use(Body())
  .use(MainRouter.routes())
  .use(ErrorRouter());

app.listen(9999,() => {
  console.log('koa start at http://localhost:9999')
});
