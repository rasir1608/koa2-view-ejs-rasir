const userSever = require('../services/user');
const user = {
  async registerPage(ctx){
    ctx.session.userInfo = null;
    await ctx.render('index',{
      title:'注册账号',
      router:'register',
      userName:'',
    });
  },
  async loginPage(ctx){
    ctx.session.userInfo = null;
    await ctx.render('index',{
      title:'账号登录',
      router:'login',
      userName:'',
    });
  },
  async login(ctx){
    const userInfo = ctx.request.body;
      const ret = await userSever.getUserByName(userInfo.userName);
      if(!ret) {
        ctx.body = `
        <script>
          alert('账号不存在，请重新输入！');
          location.href = '/user/login';
        </script>
      ` 
      } else {
        if(userInfo.password === ret.password){
          ctx.session.userInfo = JSON.stringify({
            userId:ret.id,
            userName:ret.user_name
          });
          ctx.body = `
          <script>
            alert('登录成功');
            location.href = '/';
          </script>
          `
        } else {
          ctx.body = `
          <script>
            alert('您输入的密码不正确，请重新输入！');
            location.href = '/user/login';
          </script>
          `
        }
      }
    },
  async insertUser(ctx){
    const userInfo = ctx.request.body;
    if(userInfo.password !== userInfo.rePassword){
      ctx.body = `
      <script>
        alert('两次输入密码不一致，请重新输入！');
        location.href = '/user/register';
      </script>
    `;
    } else {
      const result = await userSever.createUser(userInfo);
      if(result) {
        ctx.body = `
          <script>
            alert('账号注册成功，请登录！');
            location.href = '/user/login';
          </script>
        `;
      } else {
        ctx.body = `
          <script>
            alert('账号已存在，请重新输入！');
            location.href = '/user/register';
          </script>
        `;
      }
    }
  },
  async logoutPage(ctx){
    ctx.session.userInfo = null;
     ctx.body = `
      <script>
        sessionStorage.clear();
        alert('退出成功,请重新登录！');
        location.href = '/user/login';
      </script>
    `;
  },
}

module.exports = user;