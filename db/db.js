const Sequelize = require('sequelize');
const db = new Sequelize('mysql://root:123456@localhost:3306/todolist',{
  define: {
    timestamps: false
  }
});

module.exports = db;