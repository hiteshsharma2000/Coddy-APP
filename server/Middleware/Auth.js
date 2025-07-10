const jwt=require('jsonwebtoken')
require('dotenv').config();

const Auth=async (req,res,next)=>{
    const token=req.headers.authorization

    // console.log(token);
    
    try {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(decoded){
            req.user=decoded
            // console.log(req.user.id)
        
            next()
        }else{
         return res.send({msg:"session Expired login again"})
        }  
});

    } catch (error) {
      return res.send({"errr":error})
        
    }

}
module.exports={Auth}