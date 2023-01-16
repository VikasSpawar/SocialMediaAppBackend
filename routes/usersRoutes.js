require("dotenv").config()
const express =require("express")
const { UsersModel } = require("../models/usersModel")
const bcrypt=require("bcrypt")
const UsersRoutes=express.Router()
const jwt=require("jsonwebtoken")
//Get All Users Route
UsersRoutes.get("/", async(req,res)=>{
    const AllUsers=await UsersModel.find()

    res.send(AllUsers)
})
//Register Route
UsersRoutes.post("/register",async(req,res)=>{

    const {email,password,name,gender}=req.body

    try{

        bcrypt.hash(password,5,async(err,Cpass)=>{

            console.log(Cpass)
            if(err){
                console.log(err)
            }
            else{
                 const NewUser=new UsersModel({email,password:Cpass,name,gender})
              await NewUser.save()
              res.send("User is Registered Successfully")
            }


        })

      
    }catch(err){
        console.log(err)
        res.send("Error to Register!")
    }



    // res.send("User is registered")
})

//Login Route
UsersRoutes.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await UsersModel.findOne({email})
         const Cpass=user.password
         console.log(Cpass)
         bcrypt.compare(password,Cpass,(err,result)=>{

            console.log(result)
            if(result){
                const token=jwt.sign({UID:user._id},process.env.key)

                res.send({"msg":"Login successfull","token":token})
            }
            else{
                res.send("wrong details")
            }

         })
     
    } catch (error) {
        console.log(error)
        res.send("Error to login")
    }

    // res.send("User is Logged in")
})

module.exports={
    UsersRoutes
}