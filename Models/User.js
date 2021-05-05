const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    reminders : [
        {
            id : Number,
            name : String,
            des : String,
            time : String,
            expired : Boolean,
            repeat : String
        }
    ]
})

const User = mongoose.model("User" , userSchema)

function setUpDemoUser(){
    const newUser = new User({
        name : "test-user",
        email : "test-user@email.com",
        password : "test123",
        reminders : []
    })

    User.find({},(err,users)=>{
        if(err == null && users.length == 0){
            newUser.save()
            console.log("Successfuly added test user");
        }
    })
}

module.exports = {
    UserModel : User,
    setUpDemoUser : setUpDemoUser
}