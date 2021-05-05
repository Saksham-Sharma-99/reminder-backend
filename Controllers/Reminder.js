const { Messages } = require("../Models/Constants");
const { UserModel } = require("../Models/User");
const { ScheduleReminder, RemoveSchedule } = require("../Services/Scheduler");

function AddReminder(userId , name , des , time , repeat , callback){
    UserModel.findById(userId ,(err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }
        else if( user == null){
            console.log(Messages.USER_DOESNT_EXIST,userId);
            callback(err,null)
        }else{
            console.log(Messages.USER_FOUND , user);
            try{
                const remindTime = new Date(time);
                const reminder = {
                    name : name,
                    des : des ,
                    time : remindTime,
                    expired : false,
                    repeat : repeat
                }
                user.reminders.push(reminder)
                user.save((err,user)=>{
                    if(err != null){
                        console.log(err);
                        callback(err,null)
                    }
                    else{
                        console.log(Messages.REMINDER_ADDED,reminder);
                        ScheduleReminder(user.reminders[user.reminders.length-1]._id , userId , user.reminders.length-1)
                        callback(null , user.reminders)
                    }
                })
            }catch(err){
                console.log(err);
                // callback(err,null)
            }
        }
    })
}

function DeleteReminder(userId , reminderId , callback){
    UserModel.findById(userId ,(err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }
        else if( user == null){
            console.log(Messages.USER_DOESNT_EXIST,userId);
            callback(err,null)
        }else{
            try{
                console.log(Messages.USER_FOUND , user);
                const reminders = user.reminders.filter(reminder=>reminder._id != reminderId)
                user.reminders = reminders;
                user.save((err,user)=>{
                    if(err != null){
                        console.log(err);
                        callback(err,null)
                    }
                    else{
                        console.log(Messages.REMINDER_UPDATED,reminders);
                        callback(null , reminders)
                        RemoveSchedule(reminderId)
                    }
                })
            }catch(err){
                console.log(err);
                callback(err,null)
            }
        }
    })
}

function UpdateReminder(userId,reminderId, name , des , time , repeat , callback){
    UserModel.findById(userId ,(err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }
        else if( user == null){
            console.log(Messages.USER_DOESNT_EXIST,userId);
            callback(err,null)
        }else{
            console.log(Messages.USER_FOUND , user);
            if(user.reminders.filter(reminder=>reminder._id == reminderId).length!=0){
                user.reminders.map((rem)=>{
                    if(rem._id == reminderId){
                        try{
                            const index = user.reminders.indexOf(rem)
                            RemoveSchedule(reminderId)
                            user.reminders[index].name = name
                            user.reminders[index].des = des
                            user.reminders[index].time = time
                            user.reminders[index].repeat = repeat
                            user.save((err,user)=>{
                                if(err != null){
                                    console.log(err);
                                    callback(err,null)
                                }
                                else{
                                    console.log(Messages.REMINDER_UPDATED,user.reminders);
                                    ScheduleReminder(reminderId,userId , index)
                                    callback(null , user.reminders)
                                }
                            })
                        }catch(err){
                            console.log(err);
                            // callback(err,null)
                        }
                    }
                })
            }else{
                console.log(Messages.REMINDER_DOESNT_EXIST);
                callback(Messages.REMINDER_DOESNT_EXIST,null)
            }
        }
    })
}


module.exports = {
    AddReminder : AddReminder,
    DeleteReminder : DeleteReminder,
    UpdateReminder : UpdateReminder
}