const express=require('express');
const { auth } = require('../middleware/auth.middleware');
const { TaskModel } = require('../model/task.model');
const { access } = require('../middleware/access.middleware');

const taskRoute=express.Router();


taskRoute.post('/create', auth, async(req,res)=>{
    try{
        const {title,description,assignedTo}=req.body;
        const createdBy=req.body.userid;
        let newTask=new TaskModel({title,description,assignedTo,createdBy});
        console.log("Creating task:", { title, description, assignedTo, createdBy });
        await newTask.save();
        res.send("Task created successfully");
    }
    catch(err){
        console.log(err);
        res.send("Unable to create the Task");
    }
})

taskRoute.patch('/update/:id', auth, async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description}=req.body
        let updateTask=await TaskModel.findByIdAndUpdate(id, {title,description},{ new: true });
     
        if(updateTask)
            res.send("Task updated successfully"); 
        else
            res.send("Task not found");
    }
    catch(err){
        res.send("Unable to update the Task");
    }
})
taskRoute.delete('/delete/:id', auth, async(req,res)=>{
    try{
        const {id}=req.params;
        let deleteTask=await TaskModel.findByIdAndDelete({_id:id});
        if(deleteTask)
            res.send("Task deleted successfully");
        else
            res.send("Task not found");
    }
    catch(err){
        res.send("Unable to delete the Task");
    }
})

taskRoute.get('/selfTask', auth, async(req,res)=>{
    const {userid}=req.body;
    let getTask=await TaskModel.find({assignedTo:userid});
    if(getTask.length>0)
        res.send(getTask);
    else
        res.send("You don't have any task");
})

module.exports={taskRoute};