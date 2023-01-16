require("dotenv").config()
const express =require("express")
const { UsersModel } = require("../models/usersModel")
const bcrypt=require("bcrypt")
const SocialRouter=express.Router()
const jwt=require("jsonwebtoken")
const { SocialModel } = require("../models/socialModel")
//Get All Users Route
SocialRouter.get("/", async(req,res)=>{
    const query=req.query
    
    const AllPosts=await SocialModel.find({userID:req.body.userID,...query})

    res.send(AllPosts)
})
//Register Route
// SocialRouter.post("/",async(req,res)=>{

//     try{

//      const AllPosts=await SocialModel.find({})

      
//     }catch(err){
//         console.log(err)
//         res.send("Error to get all Posts")
//     }



//     // res.send("User is registered")
// })

//Create Post Route
SocialRouter.post("/create",async(req,res)=>{
   
    console.log(req.body)
    const NewPostData=req.body

    try{

       
                 const NewPost=new SocialModel(NewPostData)
              await NewPost.save()
              res.send("New post has been created")
            

        

      
    }catch(err){
        console.log(err)
        res.send("Error to create new post!")
    }

   
})

//Update post 
SocialRouter.patch("/update/:postId",async(req,res)=>{

    const updates=req.body
    const id=req.params.postId

    try {
        const post=await SocialModel.findByIdAndUpdate({_id:id},updates)
        await post.save()
        res.send("Post had been updated")     
    } catch (error) {
        
        res.send("Error to updated the post")
    }


})

//Delete post
SocialRouter.delete("/delete/:postId",async(req,res)=>{

    // const updates=req.body
    const id=req.params.postId

    try {
      await SocialModel.findByIdAndDelete({_id:id})
     
        res.send("Post had been deleted")     
    } catch (error) {
        
        res.send("Error to delete the post")
    }


})

module.exports={
    SocialRouter
}