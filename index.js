const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const { setUpDemoUser } = require('./Models/User')
const { AddUser, LogIn } = require('./Controllers/User')
const { Verify, VerifyToken } = require('./Controllers/Auth')
const { AddReminder, DeleteReminder,UpdateReminder } = require('./Controllers/Reminder')

mongoose.connect(
    'mongodb://127.0.0.1:27017/reminderDB', 
    {
        useNewUrlParser : true ,
        useUnifiedTopology: true
    });

app.use(cors())
app.use(bodyParser.json())

app.post("/user/register",(req,res)=>{
    AddUser(req.body.name , req.body.email , req.body.password , (err,user)=>{
        if(err != null){
            res.json({
                error :err
            })
        }else{
            res.json({
                user
            })
        }
    })
})

app.post("/user/login" , (req,res)=>{
    LogIn(req.body.email , req.body.password , (err,user,token)=>{
        if(err != null){
            res.json({
                error : err
            })
        }else{
            res.json({
                user,
                token
            })
        }
    })
})

app.post("/reminder" , Verify , (req,res)=>{
    VerifyToken(req.token , (err,_)=>{
        if(err != null){
            res.json({
                error:err
            })
        }else{
            AddReminder(req.body.userId , req.body.name , 
                req.body.des , req.body.time , req.body.repeat ,
                (err,reminders)=>{
                    if(err != null){
                        res.json({
                            error:err
                        })
                    }else{
                        res.json({
                            reminders
                        })
                    }
                })
        }
    })
})

app.delete("/reminder/:id" , Verify , (req,res)=>{
    VerifyToken(req.token , (err,_)=>{
        if(err != null){
            res.json({
                error:err
            })
        }else{
            DeleteReminder(req.body.userId , req.params.id , (err,updatedReminders)=>{
                if(err != null){
                    res.json({
                        error:err
                    })
                }else{
                    res.json({
                        updatedReminders
                    })
                }
            })
        }
    })
})

app.put("/reminder/:id" , Verify , (req,res)=>{
    VerifyToken(req.token , (err,_)=>{
        if(err != null){
            res.json({
                error:err
            })
        }else{
            UpdateReminder(req.body.userId , req.params.id , req.body.name , 
                req.body.des , req.body.time , req.body.repeat ,
                (err,updatedReminders)=>{
                if(err != null){
                    res.json({
                        error:err
                    })
                }else{
                    res.json({
                        updatedReminders
                    })
                }
            })
        }
    })
})


app.listen(3000 , ()=>{
    console.log("Server started on port :",3000);
    setUpDemoUser();
})