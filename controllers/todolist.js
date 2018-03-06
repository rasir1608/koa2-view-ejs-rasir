const todoListSever = require('../services/todolist');
const todolist = {
  async getList(ctx){
    const userInfo = ctx.session.userInfo ? JSON.parse(ctx.session.userInfo) :{};
    const todoList = await todoListSever.findAll(userInfo.userId);
    await ctx.render('index',{
      title:'todolist',
      router:'todolist',
      userName:userInfo.userName,
      todoList
    });
  },
  async addTodo(ctx){
    const userInfo = JSON.parse(ctx.session.userInfo);
    const data = {
      userId:userInfo.userId,
      content:ctx.request.body.content,
      status:0
    }
    const ret = await todoListSever.insert(data);
    if(ret){
      ctx.body = `
        <script>
          location.href = '/';
        </script>
      `
    } else {
      ctx.body = `
        <script>
          alert('事件保存失败！');
          location.href = '/';
        </script>
      `
    }
  },
  async delById(ctx){
    const userInfo = JSON.parse(ctx.session.userInfo);
    const id = ctx.request.body.id;
    const data = {
      userId:userInfo.userId,
      id
    }
    const ret = await todoListSever.removeById(data);
    if(ret){
      ctx.body = `
        <script>
          alert('事件删除成功！');
          location.href = '/';
        </script>
      `
    } else {
      ctx.body = `
        <script>
          alert('事件删除失败！');
          location.href = '/';
        </script>
      `
    }
  },
  async updateStatus(ctx){
    const data = ctx.request.body;
    const userInfo = JSON.parse(ctx.session.userInfo);
    data.userId = userInfo.userId;
    const ret = await todoListSever.updateStatusById(data);
    if(ret){
      ctx.body = `
        <script>
          alert('事件更新成功！');
          location.href = '/';
        </script>
      `
    } else {
      ctx.body = `
        <script>
          alert('事件更新失败！');
          location.href = '/';
        </script>
      `
    }
  },
}
module.exports = todolist;