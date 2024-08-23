const express=require('express');
const { TaskUserModel } = require('../model/user.model');
const userRouter=express.Router();
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
require('dotenv').config();

userRouter.post('/register', async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        const isUserExist=await TaskUserModel.findOne({email});
        if(isUserExist)
            res.send("You are already Registerd user, Please login");
        else
        {
            bcrypt.hash(password,5, (err,result)=>{
                if(err)
                    res.send(err);
                else
                {
                    const newUser=new TaskUserModel({username,email,password:result});
                    newUser.save();
                    res.send("Registration successful");
                }
            }) 
        }
    }
    catch(err){
        res.send("Some error occour! Please try again later");
    }       
})



userRouter.post('/login', async (req,res)=>{
    try{
        const {email,password}=req.body;
        const isUserExist=await TaskUserModel.findOne({email});
        if(isUserExist)
        {
            bcrypt.compare(password,isUserExist.password, (err,result)=>{
                if(err)
                    res.send(err);
                else
                {
                    const payload={userid:isUserExist._id,email:isUserExist.email}
                    jwt.sign(payload,process.env.KEY,{expiresIn:"12h"}, (err,token)=>{
                        if(err)
                            res.send("Error to generate token");
                        else
                            res.json({token:token});
                    })
                }
            })
        }
            
        
    }
    catch(err){
        res.send("Some error occour! Please try again later");
    }       
})
module.exports={userRouter};