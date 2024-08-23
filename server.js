const express=require('express');
const { connectionWithDB } = require('./src/config/db');
const { userRouter } = require('./src/routes/user.route');
const { taskRoute } = require('./src/routes/task.route');
const app=express();
require('dotenv').config();

let port=process.env.PORT;
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('This is home route');
})


app.use('/user',userRouter);

app.use('/task',taskRoute);
app.listen(port, async ()=>{
    await connectionWithDB();
    console.log(`Server is running at ${port} port`);
})