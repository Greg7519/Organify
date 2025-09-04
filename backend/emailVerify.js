const dotenv = require("dotenv");
dotenv.config()
const nodemailer = require('nodemailer');
const jwt  = require("jsonwebtoken");
function sendMail(receiptEmail, subject, text, hasToken=false){
    const transporter = nodemailer.createTransport({
   
    service:"gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS}
    })
    var token;
    if(hasToken){
        token = jwt.sign({
        data:"Token Data"

        }, process.env.JWT_KEY,{expiresIn:'10m'})
        
    }
    else{
        token=""
    }
  
    var mailOptions = {

        from: process.env.EMAIL_SENDER,
        to:receiptEmail,
        subject:subject,
        text:text + token
    }
    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log(info)
        }
    })

}
module.exports = {sendMail}
