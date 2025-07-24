import globalVars from "./global.js"
import loadJSON from "./loadJSON.js"
const globalVariables = globalVars();
var user = sessionStorage.getItem("currUser");
const form= document.getElementById("form");
const header =document.getElementById("infoHeader")
const userInp = document.getElementById("fname");
userInp.value = user;
form.addEventListener("submit", async(e) =>{
          e.preventDefault()      
          const dataForm = new FormData(form);
          console.log(dataForm)
          const data = new URLSearchParams(dataForm).toString()
          console.log(data)
           fetch(`${globalVariables.serverLoc}addTask`,{
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
        }).then((resp)=>{
            if(resp.status == 200){

                setTimeout(()=>{
                    window.location.href = `${globalVariables.frontendLoc}main.html`
                }, 1000)
            }
            if(resp.redirected){
                console.log(resp.url)
                WelcHed.innerHTML = "Not signed in redirecting..."
                setTimeout(()=>{
                    window.location.href = response.url
                },1000)
                
            }
        }).then(()=>{
          
        })
       
         
            
            

        })