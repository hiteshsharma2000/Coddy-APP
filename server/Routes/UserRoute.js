const express=require('express')
const UserRoute=express.Router()
const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')
var cookieParser = require('cookie-parser')
require('dotenv').config();

const {UserModel}=require('../Models/UserModel')


UserRoute.post('/register',async (req,res)=>{
    let {Name,Email,Password}=req.body;
    
    try {
        const exist=await UserModel.findOne({"Email":Email})
        if(exist){
          return  res.status(409).send({msg:"user is already register with this Email"})
        }else{
             const hash=await bcrypt.hash(Password, 5)
        console.log(Name,Email,hash);
        
         const newuser=new UserModel({Name,Email,Password:hash})
       await newuser.save()
      return  res.send({msg:"new user has been registered"})
        } 
     } catch (error) {
       return res.send(error)   
    }
})
UserRoute.post('/login',async (req,res)=>{
    let {Email,Password}=req.body;
    
    try {
        const Emailexist=await UserModel.findOne({"Email":Email}) 
        
        if(Emailexist){
            const matchpassword=await bcrypt.compare(Password, Emailexist.Password)
            
        // console.log("matchpassword");
        
         if(matchpassword){
            var token =jwt.sign({Email,"id":Emailexist._id}, process.env.JWT_SECRET,{expiresIn:"1d"});
         return res.send({msg:"user logged in successfully",token})
         }else{
            return res.send({msg:"Wrong Password"})
         }
   
        }else{
            res.send({msg:"NO user Found with This Email"})
        } 
     } catch (error) {
       return res.send(error)   
    }
})

UserRoute.post('/forgot-password', async (req, res) => {
  const { Email } = req.body;

  try {
    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(404).send({ msg: "No user with this email" });
    }

    const token = jwt.sign({ id: user._id }, process.env.RESET_PASS, { expiresIn: "15m" });

    // Prepare reset link
    const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;

    // Send mail using nodemailer
    // console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // console.log(resetLink);
    
    let mailOptions = {
      from: '"Coddy App" <no-reply@frigga.com>',
      to: Email,
      subject: "Password Reset Request",
      // reset:`${resetLink}`
      html: ` <p>Click the button below to reset your password:</p>
    <a href="${resetLink}" target="_blank" 
       style="
         display: inline-block;
         padding: 10px 20px;
         background-color: #007bff;
         color: #fff;
         text-decoration: none;
         border-radius: 5px;
         font-weight: bold;
         margin-top: 10px;
       ">
       Reset Password
    </a>
    <p>This link is valid for 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return res.send({ msg: "Reset link sent to your email" ,});

  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "Server error" });
  }
});

UserRoute.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { Password } = req.body;
  // console.log(token,Password);
  

  try {
    const decoded = jwt.verify(token,process.env.RESET_PASS);
    if(decoded){
    const userId = decoded.id;

    const hash = await bcrypt.hash(Password, 5);
    await UserModel.findByIdAndUpdate(userId, { Password: hash });

    return res.send({ msg: "Password has been reset successfully" });
    }else{
      return res.send({ msg: "Something went wrong" });
    }

  } catch (err) {
    console.error(err);
    return res.status(400).send({ msg: "Invalid or expired token" });
  }
});


module.exports={UserRoute}