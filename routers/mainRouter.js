const KoaRouter = require('koa-router');
const router = new KoaRouter();
const todolist = require('../controllers/todolist');
const user = require('../controllers/user');

router
  .get('/',todolist.getList);
router
  .post('/todolist/insert',todolist.addTodo)
  .post('/todolist/del',todolist.delById)
  .post('/todolist/update',todolist.updateStatus);
router
  .get('/user',(ctx) => {
  ctx.response.redirect('/');
})
  .get('/user/register',user.registerPage)
  .get('/user/login',user.loginPage)
  .get('/user/logout',user.logoutPage);
router
  .post('/user/login',user.login)
  .post('/user/insert',user.insertUser)
module.exports = router;