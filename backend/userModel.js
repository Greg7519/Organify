
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongodb = require("mongodb")
const dotenv = require("dotenv");
dotenv.config()
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
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        minlength:6,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        minlength:6,
        required:true
    },
    emailVerified:{
        type:Boolean,
        default: false
    }
})
courseSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});
 

const User = mongoose.model('User', courseSchema)
//export model
module.exports= User;