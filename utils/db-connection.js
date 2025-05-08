const {Sequelize}=require('sequelize');
const mysql=require('mysql2');

const sequelize=new Sequelize('testsql','root','Poornima@3787',{
  host:'localhost',
  dialect:'mysql'
});

(async()=>{
  try{
    await sequelize.authenticate();
    console.log("Connection to the database has been created");
  }catch(err){
    console.log(err);
  }
})();

module.exports=sequelize;