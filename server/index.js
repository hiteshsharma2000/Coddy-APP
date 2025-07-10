const express=require('express')
const app=express()
const {UserRoute}=require('./Routes/UserRoute')
var cookieParser = require('cookie-parser')
const cors=require('cors')
const {Document}=require('./Routes/Document')
const { default: mongoose } = require('mongoose')
require('dotenv').config();

app.use(cookieParser())
app.use(express.json())

app.use(cors({origin:"*",credentials: true}))

app.use('/user',UserRoute)
app.use('/document',Document)
app.get("/",async (req,res)=>{
    try {
        
    res.send({msg:"welcome to home screen"})

    } catch (error) {
        res.send({"err":error})
    }
})

app.listen(process.env.PORT,async (req,res)=>{
   try {
    await  mongoose.connect(process.env.MONGO_URL)
     console.log(`your server is running on port 8080`)
   } catch (error) {
    console.log(error);
    
   }
    
    
})