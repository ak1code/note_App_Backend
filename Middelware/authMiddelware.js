const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
     
     const token=req.headers.authorization;

     jwt.verify(token,"masai",(err,decoded)=>{
           if(decoded){
            // console.log(decoded)
             req.body.username=decoded.username;
             req.body.userID=decoded.userID
               next()
           }else{
            res.status(400).send({"msg":err.message})
           }
     })

}

module.exports=auth;

