//patience coder
const express= require('express');
const mongoose=require('mongoose');
const path=require('path');
const port=3019;



const app=express();
// Include CSS Styles
app.use(express.static(__dirname));
//middleware function
app.use(express.urlencoded({extended:true}));

//connecting a mongoDB database in server.js
mongoose.connect('mongodb://127.0.0.1:27017/students');
const db=mongoose.connection
db.once('open',()=>{
    console.log("MongoDB connection successful");
})

// defining mongoDB schema (structure of our database)
const userSchema=new mongoose.Schema({
    regd_no:String,
    name:String,
    email:String,
    contact:Number,
    branch:String
})


const users=mongoose.model("data",userSchema);

//rendering our html file using node
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'));
})

//posting the details to DB
app.post('/post',async (req,res)=>{
    const{regd_no,name,email,contact,branch}=req.body
    const user= new users({
        regd_no,
        name,
        email,
        contact,
        branch
    })
    await user.save();
    console.log(user);
    res.send("Form Submission Successfull");


})

 app.listen(port,()=>{
    console.log("Server Started");
 })