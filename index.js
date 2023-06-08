import express from 'express'
import sessions from 'express-session'
import path from 'path'
const app=express()
app.use(express.urlencoded({extended:true}))
const oneDay = 1000 * 60 * 60 * 24;
var session
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
const options = {
    root: path.join("../sessiondemo/public/")
};

app.get("/",(req,res)=>{
    
    //console.log(res.cookie("sessioncookie",session))
    
if(req.session.userid==null)
{    
res.sendFile('index.html',options,(err)=>{
  if(err) console.log(err)
  console.log("sent")
})
}
else{
    res.sendFile('home.html',options,(err)=>{
        if(err) console.log(err)
        console.log("sent")
      })
      
}
})
app.post("/login",(req,res)=>{
    
   

     if(req.body.username=="admin" && req.body.password=="admin123")
     {
        req.session.userid=req.body.username
        res.cookie("sessioncookie",req.session.userid)
        res.sendFile('home.html',options,(err)=>{
            if(err) console.log(err)
            console.log("sent")
          })
          
     }
    
     else{
        res.sendFile('index.html',options,(err)=>{
            if(err) console.log(err)
            console.log("sent")
          })
     }
   
})
app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.send("<h1>You have logged out</h1>")
})
app.listen(5050,()=>{
    console.log("server listening")
})