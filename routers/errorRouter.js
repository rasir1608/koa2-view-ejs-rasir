module.exports = function (){
  return async function (ctx,next) {
      try{
        if([401,404].indexOf(ctx.status) !== -1){
          await ctx.render('index',{
            title:ctx.status,
            router:`${ctx.status}`,
            userName:'',
          });
        }
        await next();
      } catch(err){
        console.log(err.toString())
        await ctx.render('index',{
          title:ctx.status,
          router:'err',
          errorCode:ctx.status,
          userName:'',
        });
      }
  }
}