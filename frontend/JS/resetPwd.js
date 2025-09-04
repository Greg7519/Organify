import globalVars from "./global.js"
import updateElement from "./updateElem.js";

const globalVariables = globalVars();
const form= document.getElementById("dataForm");
var confirmPwd = document.getElementById("ConfirmPwd")
var showPwd = document.getElementById("showPwd");
var pwdInps = document.getElementsByClassName("Pwd")
var pwdInp = document.getElementById("password")
var confirmPwd = document.getElementById("ConfirmPwd")
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
            var error = false;
    
   
    if(pwdInp.value != confirmPwd.value){
       window.alert("Passwords must match!")
        
        error = true
    }
    if(form.elements.namedItem("password").value.length < 8){
         var passInp = document.getElementById("password")
        passInp.value = ""
        updateElement(passInp,$("#password"),'rounded-none rounded-e-lg bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',"Password must be at least 8 characters long!" )
                    // pwdInp.value = ""
                    // pwdInp.removeAttribute("class")
                  
        passInp.addEventListener('click', ()=>{
            updateElement(passInp,$("#password"),'rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'," " )
                
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
            method:'PUT',
            body:data,
            
            headers: {
                "Accept": 'html/text',
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((response)=>{
            console.log(response.status)
            if(response.status==429){
                window.alert("Too many requests please try again in 15 minutes")
            }
            // must return here for later!
            return response.json()
        }).then((text)=>{
           window.alert(text.msg)
           setTimeout(()=>{
            window.location.href = globalVariables.frontendLoc
           },1000)
            
          
           
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
formfetch(window.location.href);
