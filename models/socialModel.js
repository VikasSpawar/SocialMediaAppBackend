const mongoose=require("mongoose")

const SocialSchema=mongoose.Schema({
    title: String,
    body : String,
    device : String,
    userID:String
})

const SocialModel=mongoose.model("socialdata",SocialSchema)

module.exports={
    SocialModel
}

