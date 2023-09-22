const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    title:String,
    body:String,
    username:String,
    userID:String
});

const NoteModel=mongoose.model("note",noteSchema);

module.exports=NoteModel;