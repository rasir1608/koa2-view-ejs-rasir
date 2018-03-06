const db = require('../db/db');
const todoListModel = '../models/list.js';

const todoListTb = db.import(todoListModel);

const todoListServer = {
  async insert(data){
      const ret = await todoListTb.create({
        user_id:data.userId,
        content:data.content,
        status:data.status,
      });
      return true;
  },
  async findAll(userId){
    const allList = await todoListTb.findAll({
      where:{
        user_id:userId
      },
      attributes: ['id', 'content', 'status'] 
    });
    return allList;
  },
  async removeById(data){
    const ret = await todoListTb.destroy({
      where:{
        id:data.id,
        user_id:data.userId,
      }
    });
    return ret === 1;
  },
  async updateStatusById(data){
    const ret = await todoListTb.update(
    {
      status:data.status,
    },{
      where:{
        id:data.id,
        user_id:data.userId
      }
    });
    return ret[0] === 1;
  },
};

module.exports = todoListServer;
