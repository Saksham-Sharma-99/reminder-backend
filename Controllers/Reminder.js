const { UserModel } = require("../Models/User");

function AddReminder(userId , name , des , time , repeat , callback){
    UserModel.findById(userId ,(err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }
        else if( user == null){
            console.log("no user with user id",userId);
            callback(err,null)
        }else{
            console.log("user found" , user);
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
                user.save()
                console.log("reminder added",reminder);
                callback(null , user.reminders)
            }catch(err){
                console.log(err);
                callback(err,null)
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
            console.log("no user with user id",userId);
            callback(err,null)
        }else{
            console.log("user found" , user);
            const reminders = user.reminders.filter(reminder=>reminder.id != reminderId)
            user.reminders = reminders;
            user.save();
            console.log("reminders updated",reminders);
            callback(null , reminders)
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
            console.log("no user with user id",userId);
            callback(err,null)
        }else{
            console.log("user found" , user);
            if(reminderId < user.reminders.length && reminderId >= 0){
                user.reminders.map((rem)=>{
                    if(rem.id == reminderId){
                        try{
                            const index = user.reminders.indexOf(rem)
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
                            callback(err,null)
                        }
                    }
                })
                console.log("reminder updated");
                user.save()
                callback(null , user.reminders)
            }else{
                console.log("reminder doesn't exist");
                callback("reminder doesn't exist",null)
            }
        }
    })
}

module.exports = {
    AddReminder : AddReminder,
    DeleteReminder : DeleteReminder,
    UpdateReminder : UpdateReminder
}