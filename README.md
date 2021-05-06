# Reminder-backend

Remember to add .env file in root directory

```
PORT={port address)
MONGODB_URI={mongoDB port address + '/database name'}
SERVICE={email service : gmail , outlook , hotmail etc}
EMAIL={email id}
PASSWORD={password}
SECRET_KEY={secretkey for jwt}
```

Also Remember to install node modules

# API docs

```
{
  {
    method : post
    path : "/user/register",
    body : {
      name : String,
      email : String,
      password : String
    }
    res : {
      user : {
        _id : String,
        name : String,
        email : String,
        password : String,
        reminders : []
      }
    }
  },
  
  {
    method : post
    path : "/user/login",
    body : {
      email : String,
      password : String
    }
    res : {
      user : {
        _id : String,
        name : String,
        email : String,
        password : String,
        reminders : []
      }
      token : String
    }
  },
  
  {
    method : post
    path : "/reminder",
    body : {
      userId : String,
      name : String,
      des : String,
      time : String \\format => 'YYYY-MM-YY HH:MM:SS',
      repeat : String \\ values => 'none' , 'daily' , 'weekly' , 'monthly'
    }
    res : {
      reminders : [{
        _id : String,
        name : String,
        des : String,
        time : String,
        expired : Boolean,
        repeat : String
      }]
    }
  },
  
  {
    method : put
    path : "/reminder/:id",
    body : {
      userId : String,
      name : String,
      des : String,
      time : String \\format => 'YYYY-MM-YY HH:MM:SS',
      repeat : String \\ values => 'none' , 'daily' , 'weekly' , 'monthly'
    }
    res : {
      updatedReminders : [{
        _id : String,
        name : String,
        des : String,
        time : String,
        expired : Boolean,
        repeat : String
      }]
    }
  },
  
  {
    method : delete
    path : "/reminder/:id",
    body : {
      userId : String
    }
    res : {
      updatedReminders : [{
        _id : String,
        name : String,
        des : String,
        time : String,
        expired : Boolean,
        repeat : String
      }]
    }
  },
}
```
