const express=require('express');
const app=express();
const userRouter=require('./routes/userRoute');
const expenseRoute=require('./routes/expenseRoute');
const sequelize=require('./utils/db-connection');
const cors=require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter);
app.use('/expenses',expenseRoute);

sequelize.sync({force:true}).then(()=>{
  app.listen(3000,(req,res)=>{
    console.log("Server is running");
  }) 
}).catch((err)=>{
  console.log(err);
})