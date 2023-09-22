const express=require("express");
const NoteModel = require("../Model/note.model");
const auth = require("../Middelware/authMiddelware");


const noteRoute=express.Router();

noteRoute.post("/create",auth,async(req,res)=>{
      const payload=req.body;
      try {
        const note=new NoteModel(payload);
          await note.save();
          res.status(200).send({"msg":"new note is created"})
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})

noteRoute.get("/get",auth,async(req,res)=>{
    
  try {
      const note=await NoteModel.find({username:req.body.username});
      // const note=await NoteModel.find();
       res.status(200).send(note)
  } catch (error) {
      res.status.apply(400).send({"msg":error.message})
  }
})

noteRoute.patch("/update/:id",auth,async(req,res)=>{

    const noteId=req.params.id;
    const note=await NoteModel.findOne({_id:noteId});
    const payload=req.body;
     try {
      if(req.body.userId==note.userID){
        note=await NoteModel.findByIdAndUpdate({_id:noteId,},payload);
        res.status(200).send({"msg":"updated"})
      }else{
        res.status(200).send({"msg":"you are note authorised"});
      }
          
     } catch (error) {
           res.status(200).send({"msg":error.message})
     }
});

noteRoute.delete("/delete/:id",auth,async(req,res)=>{
   const id=req.params.id;
   try {
      const note=await NoteModel.findByIdAndDelete({_id:id,username:req.body.username});
      res.status(200).send({"msg":"note deleted"})
   } catch (error) {
      res.status(400).send({"msg":error.message})
   }
})


module.exports=noteRoute;