const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserModel = require("../Model/userModel");


const userRoute=express.Router();

userRoute.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body;
     try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user= UserModel({username,email,pass:hash});
              await user.save();
              res.status(200).send({"msg":"user register"})
        })
     } catch (error) {
        res.status(400).send({"msg":error.message});

     }
})

userRoute.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email});

        bcrypt.compare(pass,user[0].pass,async(err,result)=>{
             if(result){
                const token=jwt.sign({username:user[0].username,userID:user[0]._id},"masai");
                res.status(200).send({token,"msg":"login successfull"})
             }else{
                res.status(400).send({"msg":err.message})
             }
        })
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// userRoute.post("/login",async(req,res)=>{
//     const {email,pass}=req.body;
//     try {
//        const user=await UserModel.find({email});

//        if(user.length>0){
//             bcrypt.compare(pass,user[0].pass,async(err,result)=>{
//                 if(err){
//                    res.status(400).send({"error":"password is incorrect"})
//                 }else{
//                    const token=jwt.sign({name:"masai"},"masai");
                
//                    res.status(200).send({"msg":"Login successful!",token})
//                 }
//             })
//        }
//     } catch (error) {
//        res.status(400).send({"msg":error.message})
//     }
// })

module.exports=userRoute;