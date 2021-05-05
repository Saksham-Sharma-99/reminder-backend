const scheduler = require('node-schedule');
const { Messages } = require('../Models/Constants');
const { UserModel } = require('../Models/User');
const { SendMail } = require('./Mailer');


function ScheduleReminder(reminderId,userId){
    UserModel.findById(userId , (err,user)=>{
        if(err != null){
            console.log(err);
        }
        else if(user == null){
            console.log(Messages.USER_DOESNT_EXIST);
        }
        else{
            console.log(Messages.USER_FOUND , user);
            var reminder = user.reminders[reminderId]
            if(!isPastDate(reminder)){
                const remindTime = new Date(reminder.time)
                    scheduler.scheduleJob(String(reminder._id),remindTime , ()=>{
                    console.log( Messages.SENDING_MAIL, user.name);
                    SendMail(reminderId,userId)
                    scheduler.cancelJob(String(reminder._id))
                })
            }else{
                try{
                    user.reminders[reminderId].expired = true
                    user.save()
                    console.log(Messages.MARKED_EXPIRED,user.reminders[reminderId]); 
                }catch(err){
                    console.log(err);
                }
            }
        }
    })
}

function RemoveSchedule(reminderId ){
    scheduler.cancelJob(String(reminderId))
    console.log(Messages.SCHEDULE_REMOVED);
}


function isPastDate(reminder){
    var now = new Date();
    var remindTime = new Date(reminder.time)

    return now > remindTime; 
}

module.exports = {
    ScheduleReminder : ScheduleReminder,
    RemoveSchedule : RemoveSchedule
}