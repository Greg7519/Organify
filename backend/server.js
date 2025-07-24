import {MongoClient} from "mongodb";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var http = require('http');
const User = require("./userModel.js")
const express = require("express");
const cors = require("cors")
const connectionString = "mongodb+srv://gregangeloppulos:gaming4life@cluster0.pkp1lft.mongodb.net/test?retryWrites=true&w=majority";
const client =  new MongoClient(connectionString);
const myDb = client.db("users");
const myColl = myDb.collection("users")
// async function main(){
//    try{
//       await client.connect();
//       await listDatabases(client);
//    }
//    catch(e){
//       console.error(e);
//    }
//    finally{
//       await client.close();
//    }
// }
// async function listDatabases(client){
//    var databasesList = await client.db().admin().listDatabases();
//    console.log("Databases:");
//    databasesList.databases.forEach(db =>{
//       console.log(`-${db.name}`)
//    }
      
//    );
// }
// main().catch(console.error);
// listDatabases(client)
// async function run(database,collectionP,data){
//     try{
//         await client.connect();
//         const db = client.db(database);
//         const collection = db.collection(collectionP);
//         var object = data;
//         await collection.insertOne(object,function(err,res){
//             if(err) throw err;
           
//             db.close()
//         })

//          window.alert("inserted doc")
//     }
//     finally{
//         await client.close()
//     }
// }
// // const btn = document.getElementById("submitBtn");
// // const name = document.getElementById("name");
// // const profession = document.getElementById("profession")
// function insertData(){
//     // data = {name:name.textContent,profession:profession.textContent}
//     // run("sample_mflix", "users",data);
// }

const app = express()
const encoder = express.urlencoded({extended:false})
app.use(cors())
//be careful of sending data
app.use(encoder)
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-type':'text/html'})
//     res.write(req.url)
//     res.end('hello');
// }).listen(8082)

app.post("/posting", async(req,res)=>{
   
   const doc = {name: await req.body.name, profession:await req.body.profession}
   await myColl.insertOne(doc);
   return 0;
   

})
app.use(encoder)
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-type':'text/html'})
//     res.write(req.url)
//     res.end('hello');
// }).listen(8082)

app.post("/users", async(req,res)=>{
   const user = new User(req.body);
   myColl.insertOne(user)
   

})
app.listen(3000);
//be careful of sending data


