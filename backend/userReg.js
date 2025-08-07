const mongodb = require("mongodb");
const jwt  = require("jsonwebtoken");
const dotenv = require("dotenv");
//import module, then start with new
var userM = require("./userModel.js");
var TaskM = require("./taskModel.js")
const path = require("path")
const {sendMail} = require('./emailVerify.js')
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dat_fns =  require("date-fns")
var session = require('express-session')
var https = require("https")
const fs = require("fs");
dotenv.config()
// var optionsHttps = {
//   key: fs.readFileSync('private-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };
const MONGO_URI = process.env.MONGO_URI;
const FPORT = process.env.FPORT;


const client =  new mongodb.MongoClient(MONGO_URI);
const myDb = client.db("users");
const myColl = myDb.collection("users")
const taskColl = myDb.collection("tasks");
const groupColl = myDb.collection("groups")

const { error, group } = require("console");
const parse = require('node-html-parser').parse;

// async function main(){
const app = express()
const signup = express()
const encoder = express.urlencoded({extended:false})
console.log(process.env.FPORT)

//be careful of sending data
dotenv.config()
app.use(express.static(path.join(__dirname, "../frontend")))
app.get("/", (req, res)=>{
   res.sendFile(path.join(__dirname, "../frontend","signin.html"))
})
app.use(cors({origin:FPORT, credentials:true}))
app.use(function (req, res, next) {
 
     res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(encoder)
app.use(cookieParser())
var myUser;
var userName;
var myEmail;
var tokenVer = false;
app.use(session({
   secret: 'my-secret-key',
   resave:false,
   saveUninitialized:true,
   cookie:{secure:false}
}))
// var optionsHttps = {
//   key: fs.readFileSync('keys/key.pem'),
//   cert: fs.readFileSync('keys/cert.pem')
// };
const requireAuth  = (req, res, next) =>{
   if(req.session.docId){
      console.log("in service..")
      next();
   }else{
      console.log(req.sessionID)
      console.log("not logged in!")
      res.redirect(`${FPORT}/signin.html`)

     
   }
}
function deleteDoc(coll, docField, docVal){
   console.log(docField, docVal)
   coll.deleteOne({[`${docField}`]:docVal})
}
function verifyReq(email, docGroupChats, docName,req ){
      sendMail(email, "Verify email", `Hello ${req.session.name} please verify your email at ${BPORT}/verify/`, true)
      app.get("/verify", (req,res)=>{
         myColl.findOne({email:email}).then((doc)=>{
                     if(tokenVer && doc.emailVerified){
                              console.log("sending request back")
                              console.log(doc.emailVerified)
                              res.redirect(`${FPORT}/main.html`)
                              // res.json({name:myUser.name, email:myUser.email})
                           
                     }
                     else{
                        console.log("not verified yet!")
                     }
                  
                  })
      })
      app.get("/verify/:token", (req,res)=>{
                  const {token} = req.params;
                  console.log(token)
                   jwt.verify(token,'ourSecretKey', function(err,decoded){
                   
                     if(err){
                        console.log(err)
                        res.send("Email couldnt be verified!Try again")

                     }
                     else{
                        tokenVer = true;
                        myColl.updateOne({email:email},{$set: {'emailVerified':true}})
                                    req.session.docId= req.sessionID
                                    req.session.groupChats = docGroupChats
                                    req.session.verified = true
                                    req.session.cookie.expires = false
                                    req.session.name = docName;
                          res.cookie("sessionID", req.sessionID ,{
                                      
                                       httpOnly:true,
                                       secure:true,
                                       sameSite:"none",
                                       
                                       
                                    })
                                   
                        res.send("Email verified");
                     }
               })
                  
                     
                
                  
                  
                
               })
}
async function updateDoc(userName, groupChat){
     groupColl.findOne({
      groupName:groupChat
   }).then(async(doc)=>{
            var userDoc = await myColl.findOne({name:userName})
            
               try{
                  var userGroups = userDoc.groupChats
                     if(!userGroups.includes(groupChat)){
                        myColl.updateOne({name:userDoc.name},{$push:{groupChats: doc._id}})
                  }
                  else{
                     res.json({msg:"user already in group!"})
                  }
               }
               catch{
                  if(doc._id){
                     console.log(doc._id)
                      myColl.updateOne({name:userName},{$set:{groupChats:[doc._id]}})
                  }
                  
                 
               }})

}
async function updateTask(taskID, username){
   myColl.findOne({name:username}).then((userDoc)=>{
        try{
                  var userTasks = userDoc.tasks
                     if(!userTasks.includes(taskID)){
                        myColl.updateOne({name:userDoc.name},{$push:{tasks: taskID}})
                     }
                  else{
                     console.log(taskID)
                     res.json({msg:"Task already there!"})
                  }
               }
               catch{
               
                      
                      myColl.updateOne({name:username},{$set:{tasks:[taskID]}})
                  
                  
                 
               }
   })
}
app.post("/addTask", requireAuth, async(req,res)=>{
   console.log(req.body)
   const task = new TaskM({username: req.body.user, dateDue:req.body.Date, taskInfo:req.body.task})
   taskColl.insertOne(task).then((doc)=>{
      console.log(doc.insertedId)
      updateTask(doc.insertedId._id, req.body.user)
      myColl.findOne({name:req.body.user}).then((doc)=>{
         sendMail(doc.email, "New task assigned:", req.body.task + " due: "+ req.body.Date, false )
      })
      
   });
   res.sendStatus(200)
   
})
app.get("/getTasks", requireAuth, async(req, res)=>{

   myColl.findOne({name:req.session.name}).then((userDoc)=>{
      var currDate = new Date();
      try{
         var myTasks = {"tasks":[]};
         userDoc.tasks.forEach((element,idx,array) => {
            var myEl = element.toString()
         
         
            taskColl.findOne({"_id":mongodb.ObjectId.createFromHexString(myEl)}).then((doc) =>{
                  var obj = {name:doc.username, title: doc.taskInfo, dateDue:doc.dateDue}
                  var reversedDate = doc.dateDue.split("/").reverse().join("-");
                  console.log(new Date(reversedDate), currDate)
                  if(new Date(reversedDate) < currDate){
                     taskColl.deleteOne({"_id":doc._id}).then(()=>{
                        var tasksArr = userDoc.tasks
                       tasksArr = tasksArr.filter(item => item !== element)
                       console.log(tasksArr)
                        myColl.updateOne({name:
                           userDoc.name
                        }, {$set:{tasks:tasksArr}})
                     })
                     
                     
                  }
                  else{
                        myTasks.tasks.push(obj)
                     console.log(myTasks)
                    
                  }
                  if(idx==array.length -1){
                        
                        res.json( JSON.parse(JSON.stringify(myTasks)))
                  }
         
               
            })
          
      });
      }
      catch{
         console.log('error')
         res.json({msg:"No groups"})
      }
   })
})
app.post("/createGroup", requireAuth,async(req,res)=>{
   console.log("accesed service")
   groupColl.insertOne({ groupName:req.body.name,admin: req.session.name,users: []}).then((doc)=>{
      console.log(req.session.name)
      updateDoc(req.session.name, req.body.name)
      req.session.groupChat = req.body.name;
      res.redirect(`${FPORT}/addUsers.html`)
   })
   
})
app.get("/getUserInfo", requireAuth, async(req, res)=>{
   res.json({"name":req.session.name})
})
app.get("/getUserGroups", requireAuth, async(req,res)=>{
   var groupsInfo ={"users":[]}
   var i =0;
   myColl.findOne({name:req.session.name}).then(async(userDoc)=>{
      try{
          for await(var el of userDoc.groupChats) {
            var myEl = await el.toString()
            
            
            var myId = mongodb.ObjectId.createFromHexString(myEl)
         
            groupColl.findOne({"_id": myId}).then(async(doc) =>{
                  var obj = {name:doc.groupName, admin:doc.admin, users:doc.users}
                
                  groupsInfo.users.push(obj)
                  console.log(groupsInfo.users)
                  
                  console.log(myEl,i)
                     if(doc.users.length ==0){
                        var groupArr = userDoc.groupChats
                        groupArr = groupArr.filter(item => item !== myEl)
                        myColl.updateOne({name:
                           userDoc.name
                        }, {$set:{groupChats:groupArr}})
                        deleteDoc(groupColl, "_id", doc._id )
                     }
                       if(groupsInfo.users.length== userDoc.groupChats.length){
                        res.json( JSON.parse(JSON.stringify(groupsInfo)))
                        }
                    
                       
                      
                     
                    
            })
            console.log(groupsInfo)
            
         
               
         }
       
          
          
      
      }
      catch{
         res.json({msg:"No groups"})
      }
     
    
     
      

   })

})
app.post("/addUsers", requireAuth,async(req,res)=>{
   groupColl.findOne({
      groupName:req.session.groupChat
   }).then(async(doc)=>{
      var user = await myColl.findOne({name:req.body.user})
      
      if(user){
           req.session.otherusers.push(user.name)
           
           try{
                  var users = doc.users
                  if(!users.includes(req.body.user)){
                      groupColl.updateOne({groupName: req.session.groupChat},{$push:{users:user.name}})
                      users.push(user.name)
                  }
                
                  res.sendStatus(200)
            }
            catch{
               groupColl.updateOne({groupName:req.session.groupChat},{$set:{users:[user.name]}})
               res.sendStatus(200)
            }
          updateDoc(req.body.user, req.session.groupChat)
      }
      else{
         res.sendStatus(404)
      }
   

      
     
    })})
app.get("/checkVer", requireAuth,async(req, res)=>{
   
   if(req.session.docId){
      res.json({redirect:false})
   }
   else{
      res.redirect(`main.html` )
   }
})

app.post("/register", async(req,res)=>{
   req.session.reload(()=>{
         myColl.findOne({$or:[{email:req.body.email},{name:req.body.name}]}).then((user)=>{
      //response text
      console.log(user)
      if(user){
         if(user.emailVerified){
            if(user.name!= req.body.name ){
               return res.json({msg:"User already exists!Invalid username though", userExists:true})
            }
            else if(user.email != req.body.email){
               return res.json({msg:"User already exists!Invalid email though", userExists:true})
            }
           
            else{
               return res.json({msg:"User already exists", userExists:true})
            }
             
         }
         else{
             if(user.name!= req.body.name ){
               return res.json({msg:"User already exists!Invalid username though, Sign in instead", userExists:true})
            }
            else if(user.email != req.body.email){
                 return res.json({msg:"User already exists!Invalid email though.Sign in instead", userExists:true})
            }
            else{
               return res.json({msg:"unverifiedEmail!User already exists, sign in instead",userExists:true })
             
            }
            
            
         }
        
      }
      else{
         var pwd;
         bcrypt.hash(req.body.password,10, (err, hash)=>{
            pwd= hash;
            myUser = new userM({
            name: req.body.name,
            password:pwd,
            email:req.body.email
         })
        
         //send response
         myColl.insertOne(myUser).then(()=>{
            req.session.name = myUser.name
            verifyReq(myUser.email, myUser.groupChats=null, myUser.name, req)
            res.json({msg:"signed up!",username: myUser.name, userExists:false})
      
           
         })
         })
      }
         })
  
   })
  
   
   

   

})
app.post("/login", async(req,res,next) =>{
     req.session.reload(()=>{
        req.session.otherusers = []
        myColl.findOne({$or:[{email:req.body.email},{name:req.body.email}]}).then((doc)=>{
         if(doc!=null){
            console.log(doc.emailVerified)
            if(!doc.emailVerified){
               req.session.name =doc.name
               res.json({msg:"you need to verify email", canSign:false, verified:false, name:doc.name})
               verifyReq(doc.email, null, doc.name, req);
            }
            else{
               bcrypt.genSalt(10, (err, salt) =>{
                  if(err){
                     console.log("an error occured!")
                  }
                  else{
                     bcrypt.hash(req.body.password, salt, (err,hash)=>{
                           
                           bcrypt.compare(req.body.password, doc.password, (err, resolve)=>{
                              console.log(hash, doc.password)
                                 if(err){
                                    throw err;
                                 }
                                 if(resolve){
                                    
                                    
                                    console.log("pass match!")
                                    req.session.docId= req.sessionID
                                    req.session.groupChats = doc.groupChats
                                    req.session.cookie.expires = false
                                    req.session.name = doc.name;
                                    console.log(req.sessionID)
                                    
                                  
                  

                                 // Set to true if you need the website to include cookies in the requests sent
                                 // to the API (e.g. in case you use sessions)
                                 res.setHeader('Access-Control-Allow-Credentials', true);
                                    res.cookie("sessionID", req.sessionID ,{
                                      
                                       httpOnly:true,
                                       secure:true,
                                       sameSite:"none",
                                       
                                       
                                    })
                                    res.redirect(`${FPORT}/main.html`)
                                    // res.json({msg:"passwords match!Signing u in!", canSign:true, name: doc.name, verified:true,sessionId:doc._id})
                                    // next();
                                 }
                                 else{
                                    res.json({msg:"non matching password!", canSign:false, verified:true})
                                 }
                           });      
                     })
                  }
               })
               
            }
            
         }
         else{
               
           
            res.json({msg:"User does not exist!Try registering/checking spelling of name or email!"})
         }
        
         

     
      
         
      
       
    })
     })
   
     
    
   //    if(myDoc){
   //       console.log(req.body.password)
   //       bcrypt.compare(req.body.password, myColl.findOne({$or:[{email:req.body.inp},{username:req.body.inp}]}).password);
   //       console.log(myDoc)
   //       res.sendStatus(200);
   //    }
   //    else{
   //       res.sendStatus(400)
   //       console.log("user not found!")

   //    }

})


app.listen(3000)
module.exports = app;