const scheduler = require('node-schedule');
const { Messages, CornString, RepeatTime } = require('../Models/Constants');
const { UserModel } = require('../Models/User');
const { SendMail } = require('./Mailer');


function ScheduleReminder(reminderId,userId , index){
    UserModel.findById(userId , (err,user)=>{
        if(err != null){
            console.log(err);
        }
        else if(user == null){
            console.log(Messages.USER_DOESNT_EXIST);
        }
        else{
            var reminder = user.reminders[index]
            if(!isPastDate(reminder)){
                const remindTime = new Date(reminder.time)
                    scheduler.scheduleJob(String(reminder._id),remindTime , ()=>{
                    console.log( Messages.SENDING_MAIL, user.name);
                    SendMail(reminderId,userId)
                    scheduler.cancelJob(String(reminder._id))
                    RecurringReminder(reminderId , userId  , reminder.repeat)
                })
            }else{
                try{
                    user.reminders[index].expired = true
                    user.save()
                    console.log(Messages.MARKED_EXPIRED,user.reminders[index]); 
                }catch(err){
                    console.log(err);
                }
            }
        }
    })
}

function RecurringReminder(reminderId , userId , repeat){
    switch(repeat){
        case RepeatTime.daily :
            scheduler.scheduleJob(String(reminderId) , CornString.daily , ()=>{
                SendMail(reminderId , userId)
            })
            break;

        case RepeatTime.weekly :
            scheduler.scheduleJob(String(reminderId) , CornString.weekly , ()=>{
                SendMail(reminderId , userId)
            })
            break;

        case RepeatTime.monthly :
            scheduler.scheduleJob(String(reminderId) , CornString.monthly , ()=>{
                SendMail(reminderId , userId)
            })
            break;

        case RepeatTime.none :
            break;
        
        default :
            break;
    }
}

function RemoveSchedule(reminderId){
    scheduler.cancelJob(String(reminderId))
    console.log(Messages.SCHEDULE_REMOVED);
}


function isPastDate(reminder){
    try{
        var now = new Date();
        var remindTime = new Date(reminder.time)

        return now > remindTime;

    }catch(err){
        console.log(err);
    } 
}

module.exports = {
    ScheduleReminder : ScheduleReminder,
    RemoveSchedule : RemoveSchedule
}