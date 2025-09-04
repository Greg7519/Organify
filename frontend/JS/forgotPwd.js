import globalVars from "./global.js"
import updateElement from "./updateElem.js";

const btn = document.getElementById("submitBtn");
const nameTc= document.getElementById("name");
const form= document.getElementById("dataForm");
const headConf = document.getElementById("dataSent")
const profInp = document.getElementById("profession")
const signHead = document.getElementById("signedCheck")

const globalVariables = globalVars();
console.log(globalVariables.serverLoc)
var respOk = false;
sessionStorage.setItem("username", "")
sessionStorage.setItem("verified", false)

window.formfetch = function formFetch(iPAddr){
    form.addEventListener("submit", async(e)=>{
    e.preventDefault() 
    // must have names on labels
    const dataForm = new FormData(form);
    const data = new URLSearchParams(dataForm).toString()
    // if(profInp.value == "" || nameTc.value == "" ){
    //     headConf.innerHTML= "Please enter data!"
    // }
    
         const response=await fetch(iPAddr,{
            method:'POST',
            body:data,
            mode:"cors",
            
            headers: {
                "Accept": 'html/text',
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": globalVariables.frontendLoc,
                "Access-Control-Allow-Credentials":true
            },
            credentials:"include"
        }).then((response)=>{
            if(response.ok){
                 respOk = true
            }
             if(response.status==429){
                window.alert("Too many requests please try again in 15 minutes")
            }
            if(response.redirected){
                window.location.href = response.url;
            }
            // must return here for later!
            return response.json()
        }).then((text)=>{
           
                
            if(text.exists){
                window.alert("Sent an email to reset password within 15 minutes")
            }
            else{
                window.alert("User doesnt exist")
            }
            
           
          
           
        })
    })
     
        
    
       
    
    
   
 
    // var data = {name:dataForm.get("name"),profession:dataForm.get("profession")}
    // console.log(dataForm.get("name"))
   


}
// formfetch("http://127.0.0.1:3000/posting");

formfetch(`${globalVariables.serverLoc}forgotPwd`);
