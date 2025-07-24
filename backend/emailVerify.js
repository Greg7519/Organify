const nodemailer = require('nodemailer');
const jwt  = require("jsonwebtoken");
function sendMail(receiptEmail, subject, text, hasToken=false){
    const transporter = nodemailer.createTransport({
   
    service:"gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "serverresponse120@gmail.com",
        pass: "jxon ehxt xfxc cnto"}
    })
    var token;
    if(hasToken){
        token = jwt.sign({
        data:"Token Data"

        }, 'ourSecretKey')
    }
    else{
        token=""
    }
  
    var mailOptions = {

        from:'serverresponse120@gmail.com',
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
