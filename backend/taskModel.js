const dotenv = require("dotenv");
dotenv.config()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongodb = require("mongodb")
const connectionString = process.env.MONGO_URI
const client =  new mongodb.MongoClient(connectionString);
const myDb = client.db("users");
const myColl = myDb.collection("users")
const connection = mongoose.createConnection(connectionString)
const schema = mongoose.Schema;
const connectDb =async ()=>{
   await mongoose.connect(connectionString)
}
connectDb();



const courseSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    dateDue:{
        type: String, 
        required:true
    },
    taskInfo:{
        type:String,
        required:true
    }
})

 

const Task = mongoose.model('Task', courseSchema)
//export model
module.exports= Task;