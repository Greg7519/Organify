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
            if(text.canSign){

                console.log(text)
                if(text.verified==false && text.name!= null ){
                    window.location.replace(`${globalVariables.frontendLoc}verify.html`)
                    sessionStorage.setItem("username", text.name)
                }
                else{
                    if(text.canSign && text.name!= null ){
                          sessionStorage.setItem("username", text.name)
                        sessionStorage.setItem("verified", text.verified)
                        sessionStorage.setItem("sessionId",text.sessionId)
                        window.location.replace(`${globalVariables.frontendLoc}main.html`)
                    }
                   
                    else{
                        signHead.innerHTML="Failed to sign in!Check name and password"
                    }
                }
                
                
               
            }
            else{
                if(text.wrongPwd){
                
                    updateElement(pwdInp,$("#password"),'rounded-none rounded-e-lg bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',"wrong password" )
                    // pwdInp.value = ""
                    // pwdInp.removeAttribute("class")
                  
                   pwdInp.addEventListener('click', ()=>{
                        updateElement(pwdInp,$("#password"),'rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'," " )
                
                    })
                   
                }
                if(text.wrongCred){
                    var userInp = document.getElementById("email")
                    pwdInp.value = ""
                    updateElement(userInp,$("#email"),'rounded-none rounded-e-lg bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',"User doesnt exist!" )
                    // pwdInp.value = ""
                    // pwdInp.removeAttribute("class")
                  
                   userInp.addEventListener('click', ()=>{
                        updateElement(userInp,$("#email"),'rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'," " )
                
                    })
                }
                
            }
            
            
           
          
           
        })
    })
     
        
    
       
    
    
   
 
    // var data = {name:dataForm.get("name"),profession:dataForm.get("profession")}
    // console.log(dataForm.get("name"))
   


}
// formfetch("http://127.0.0.1:3000/posting");

formfetch(`${globalVariables.serverLoc}login`);
