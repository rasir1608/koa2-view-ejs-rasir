const db = require('../db/db');
const userModel = '../models/user.js';

const userTb = db.import(userModel);
const userSever = {
  async getUserByName(name){
    const userInfo = await userTb.findOne({
      where:{
        user_name:name
      }
    });
    return userInfo;
  },
  async createUser(userInfo){
    const user = await userTb.findOne({
      where:{
        user_name:userInfo.userName
      }
    });
    if(user) return false;
    const ret = await userTb.create({
      user_name:userInfo.userName,
      password:userInfo.password
    });
    console.log(ret);
    return true;
  }
};
module.exports = userSever;