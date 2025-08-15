import globalVars from "./global.js"
import updateElement from "./updateElem.js";

const globalVariables = globalVars();
const btn = document.getElementById("submitBtn");
const nameTc= document.getElementById("name");
const emailCont = document.getElementById("email")
const form= document.getElementById("dataForm");
const headConf = document.getElementById("dataSent")
const profInp = document.getElementById("profession")
const signHead = document.getElementById("signedCheck")
var showPwd = document.getElementById("showPwd");
var pwdInp = document.getElementById("password")
var confirmPwd = document.getElementById("ConfirmPwd")
var pwdInps = document.getElementsByClassName("Pwd")
showPwd.addEventListener("click", ()=>{
    for(let i=0; i< pwdInps.length; i++){
        if(pwdInps.item(i).type ==="password"){
        pwdInps.item(i).type = "text"
        }
        else{
            pwdInps.item(i).type="password"
        }
   
    
    }
        
})
sessionStorage.setItem("username", "")
sessionStorage.setItem("verified", false)
window.formfetch = function formFetch(iPAddr){
    form.addEventListener("submit", async(e)=>{
          e.preventDefault()
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var error = false;
    if(!regex.test(form.elements.namedItem("email").value)){
        var userInp = document.getElementById("email")
        userInp.value = ""
        updateElement(userInp,$("#email"),'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',"Invalid email!" )
                    // pwdInp.value = ""
                    // pwdInp.removeAttribute("class")
                  
        userInp.addEventListener('click', ()=>{
            updateElement(userInp,$("#email"),'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'," " )
                
        })
        error = true
    }
    if(pwdInp.value != confirmPwd.value){
       window.alert("Passwords must match!")
        
        error = true
    }
    if(form.elements.namedItem("password").value.length < 8){
         var passInp = document.getElementById("password")
        passInp.value = ""
        updateElement(passInp,$("#password"),'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',"Password must be at least 8 characters long!" )
                    // pwdInp.value = ""
                    // pwdInp.removeAttribute("class")
                  
        passInp.addEventListener('click', ()=>{
            updateElement(passInp,$("#password"),'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'," " )
                
        })
          error = true
    }
    if(error){
        console.log(error)
    }
    else{
          const dataForm = new FormData(form);
        const data = new URLSearchParams(dataForm).toString()
          const response=await fetch(iPAddr,{
            method:'POST',
            body:data,
            
            headers: {
                "Accept": 'html/text',
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((response)=>{
            console.log(response.status)
            // must return here for later!
            return response.json()
        }).then((text)=>{
            if(text.userExists){
                var nameInp = document.getElementById("name")
                nameInp.value = ""
                updateElement(nameInp,$("#name"),'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',"User already exists!Sign in instead" )
                            // pwdInp.value = ""
                            // pwdInp.removeAttribute("class")
                        
                nameInp.addEventListener('click', ()=>{
                    updateElement(userInp,$("#email"),'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'," " )
                        
                })
        error = true
            }
            else{
                sessionStorage.setItem("username", text.username)
                window.location.replace(`${globalVariables.frontendLoc}verify.html`)
            }
            
          
           
        })
       
       
    }
     
    // if(profInp.value == "" || nameTc.value == "" ){
    //     headConf.innerHTML= "Please enter data!"
    // }
    
       
    })
     
        
    
       
    
    
   
 
    // var data = {name:dataForm.get("name"),profession:dataForm.get("profession")}
    // console.log(dataForm.get("name"))
   


}
// formfetch("http://127.0.0.1:3000/posting");
formfetch(`${globalVariables.serverLoc}register`);
