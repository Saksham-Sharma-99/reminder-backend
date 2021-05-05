const { UserModel } = require("../Models/User");
const { AssignToken } = require("./Auth");

function AddUser(name , email , password , callback){
    UserModel.findOne({email:email} , (err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }else if( user != null){
            console.log("User Exists with email" , email);
            callback("user already exists" , null)
        }else{
            const newUser = new UserModel({
                name : name,
                email : email,
                password : password,
                reminders : []
            })
            newUser.save()
            console.log("Added user successfully" , newUser);
            callback(null , newUser)
        }
    })
}

function LogIn( email , password , callback){
    UserModel.findOne({email:email , password : password} , (err,user)=>{
        if(err != null){
            console.log(err);
            callback(err,null , null)
        }else if( user == null){
            console.log("User doesn't exist ");
            callback("user dosen't exist" , null , null)
        }else{
            AssignToken(user , (err,token)=>{
                if(err != null){
                    console.log(err);
                    callback(err,null , null)
                }else{
                    console.log("Log in Successful",user);
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