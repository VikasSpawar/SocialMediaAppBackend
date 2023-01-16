const express=require("express")
const { connection } = require("./config/db")
const { UsersRoutes } = require("./routes/usersRoutes")
const cors=require("cors")
const { SocialRouter } = require("./routes/socialRoutes")
const { Auth } = require("./middlewares/auth.middleware")
require("dotenv").config()
const app=express()


app.use(express.json())
app.use(cors())
app.use("/users",UsersRoutes)
app.use(Auth)
app.use("/posts",SocialRouter)




app.listen(process.env.PORT,async(err)=>{

    try {
        await connection
        console.log("connected to db")
    } catch (error) {
            console.log(error)
        console.log("error to connect")
        
    }


})