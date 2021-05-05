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
                    id : user.reminders.length,
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
                        ScheduleReminder(reminder.id , userId)
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
                const reminders = user.reminders.filter(reminder=>reminder.id != reminderId)
                const _id = user.reminders.filter(reminder=>reminder.id == reminderId)[0]._id
                user.reminders = reminders;
                user.save((err,user)=>{
                    if(err != null){
                        console.log(err);
                        callback(err,null)
                    }
                    else{
                        console.log(Messages.REMINDER_UPDATED,reminders);
                        callback(null , reminders)
                        RemoveSchedule(_id)
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
            if(reminderId < user.reminders.length && reminderId >= 0){
                user.reminders.map((rem)=>{
                    if(rem.id == reminderId){
                        try{
                            const index = user.reminders.indexOf(rem)
                            RemoveSchedule(user.reminders[index]._id)
                            user.reminders.splice(index , 1)
    
                            const remindTime = new Date(time);
                            const reminder = {
                                id : reminderId,
                                name : name,
                                des : des ,
                                time : remindTime,
                                expired : false,
                                repeat : repeat
                            }
                            user.reminders.push(reminder)
                        }catch(err){
                            console.log(err);
                            // callback(err,null)
                        }
                    }
                })
                console.log(Messages.REMINDER_UPDATED);
                user.save((err,user)=>{
                    if(err != null){
                        console.log(err);
                        callback(err,null)
                    }
                    else{
                        console.log(Messages.REMINDER_UPDATED,user.reminders);
                        ScheduleReminder(reminderId,userId)
                        callback(null , user.reminders)
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