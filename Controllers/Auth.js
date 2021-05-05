const jwt = require('jsonwebtoken')
const { Messages } = require('../Models/Constants')

function Verify(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403);
    }
}

function VerifyToken(token , callback){
    jwt.verify(token , process.env.SECRET_KEY ,(err,authData)=>{
        if(err != null){
            console.log(err)
            callback(err , null);
        }else{
            callback(null,authData);
        }
    })
}

function AssignToken(user,callback){
    jwt.sign({user:user},process.env.SECRET_KEY,(err,token)=>{
        if(err!=null){
            console.log(err)
            callback(err,null)
        }else{
            console.log(Messages.TOKEN_ASSIGNED)
            callback(null , token)
        }
    })
}

module.exports = {
    Verify : Verify,
    VerifyToken : VerifyToken,
    AssignToken : AssignToken
}