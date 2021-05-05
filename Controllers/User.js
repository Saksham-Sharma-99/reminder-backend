const { Messages } = require("../Models/Constants");
const { UserModel } = require("../Models/User");
const { AssignToken } = require("./Auth");

function AddUser(name , email , password , callback){
    UserModel.findOne({email:email} , (err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }else if( user != null){
            console.log(Messages.USER_ALREADY_EXIST , email);
            callback(Messages.USER_ALREADY_EXIST , null)
        }else{
            const newUser = new UserModel({
                name : name,
                email : email,
                password : password,
                reminders : []
            })
            newUser.save((err,user)=>{
                if(err != null){
                    console.log(err);
                    callback(err,null)
                }else{
                    console.log(Messages.USER_ADDED , user);
                    callback(null , user)
                }
            })
        }
    })
}

function LogIn( email , password , callback){
    UserModel.findOne({email:email , password : password} , (err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null , null)
        }else if( user == null){
            console.log(Messages.USER_DOESNT_EXIST);
            callback(Messages.USER_DOESNT_EXIST , null , null)
        }else{
            AssignToken(user , (err,token)=>{
                if(err != null){
                    console.log(err);
                    callback(err,null , null)
                }else{
                    console.log(Messages.LOGGED_IN,user);
                    callback(null ,user,token);
                }
            })
        }
    })
}

module.exports = {
    AddUser : AddUser,
    LogIn : LogIn
}