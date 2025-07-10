const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,

}, {
    timestamps: true 
  },
  {versionKey:false})


const UserModel=mongoose.model("User",UserSchema) 

module.exports={UserModel}