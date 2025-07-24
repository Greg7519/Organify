import globalVars from "./global.js"
const globalVariables = globalVars();
const btn = document.getElementById("submitBtn");
const nameTc= document.getElementById("name");
const emailCont = document.getElementById("email")
const form= document.getElementById("dataForm");
const headConf = document.getElementById("dataSent")
const profInp = document.getElementById("profession")
const signHead = document.getElementById("signedCheck")

sessionStorage.setItem("username", "")
sessionStorage.setItem("verified", false)
window.formfetch = function formFetch(iPAddr){
    form.addEventListener("submit", async(e)=>{
          e.preventDefault()
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var error = false;
    if(!regex.test(form.elements.namedItem("email").value)){
        signHead.innerHTML = "Please enter a valid  email address!"
        console.log("sjjad")
        error = true
    }
    if(form.elements.namedItem("password").value.length < 8){
        signHead.innerHTML += "Too small password";
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
                signHead.innerHTML = text.msg;
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
