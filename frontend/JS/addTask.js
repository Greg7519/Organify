import globalVars from "./global.js"
import loadJSON from "./loadJSON.js"
const globalVariables = globalVars();
var user = sessionStorage.getItem("currUser");
const form= document.getElementById("form");
const header =document.getElementById("infoHeader")
const userInp = document.getElementById("fname");
userInp.value = user;
var dateReg = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0,1,2])\/(19|20)\d{2}/
const currDate = new Date()
form.addEventListener("submit", async(e) =>{
          e.preventDefault()      
          const dataForm = new FormData(form);
          console.log(dataForm)
          const data = new URLSearchParams(dataForm).toString()
          var date = dataForm.get("Date")
          console.log(currDate)
          var reversedDate = date.split("/").reverse().join("-");
          console.log(dateReg.test(date))
          if(!dateReg.test(date)){
            window.alert("Invalid date entered!Enter valid date in dd/mm/yyyy")
           
          }
          if(new Date(reversedDate) < currDate){
            console.log(reversedDate, currDate.toLocaleDateString("en-CA"))
            window.alert("Dont enter a past date")
          }
          else{
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
                 window.alert("Task added!")
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
          }
         
       
         
            
            

        })