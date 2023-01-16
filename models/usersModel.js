const mongoose=require("mongoose")

const usersSchema=mongoose.Schema({
    name :String,
    email : String,
    gender : String,
    password : String
})

const UsersModel=mongoose.model("users",usersSchema)

module.exports={
    UsersModel
}

