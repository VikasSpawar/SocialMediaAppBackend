const jwt=require("jsonwebtoken")
require("dotenv").config()

const Auth=(req,res,next)=>{

    const token=req.headers.authorization

    if(token){

        const UserTokenVerify=jwt.verify(token,process.env.key)

        if(UserTokenVerify){
            const userID=UserTokenVerify.UID 
            req.body.userID=userID
            next()
        }
        else{
            res.send("Please login first")
        }

    }
    else{
        res.send("Pleas login first")
    }



}

module.exports={
    Auth
}