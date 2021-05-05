const nodemailer = require("nodemailer")
const {UserModel} = require('../Models/User')
const {Messages} = require('../Models/Constants')

const transporter = nodemailer.createTransport(
    {
        service : process.env.SERVICE,
        auth :{
            user:process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }
)

function SendMail(reminderId , userId){
    UserModel.findById(userId , (err,user)=>{
        if(err != null){
            console.log(Messages.CANT_SEND_MAIL ,err);
        }else if( user == null){
            console.log(Messages.USER_DOESNT_EXIST , Messages.CANT_SEND_MAIL);
        }else{
            if(user.reminders.filter(rem=>rem._id == reminderId).length != 0){
                const reminder = user.reminders.filter(rem=>rem._id == reminderId)[0]

                var mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: reminder.name + " -Reminder",
                    text: reminder.des
                  };
            
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error , Messages.CANT_SEND_MAIL);
                    } else {
                      console.log('Email sent: ' + info.response);
                      console.log(Messages.MAIL_SENT,user.name)
                    }
                  });
            }else{
                console.log(Messages.USER_DOESNT_EXIST);
            }
            
            
        }
    })
}

module.exports = {
    SendMail : SendMail
}