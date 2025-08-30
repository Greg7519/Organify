console.log(sessionStorage.getItem("username"));
import globalVars from "./global.js"

const globalVariables = globalVars();
const WelcHed = document.getElementById("welcomeHeader")
const GroupHed = document.getElementById("groupsNotFound");
sessionStorage.clear()
await fetch(`${globalVariables.serverLoc}getUserInfo`,{method:'GET',
            
            headers: {
                "Accept": 'html/text',
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": `${globalVariables.serverLoc}`
                
            },
            mode:"cors",
            credentials:"include"
        }).then(response=>{
            if(response.redirected){
                WelcHed.innerHTML = "Not signed in redirecting..."
                setTimeout(()=>{
                    window.location.href = response.url
                },1000)
                
            }
            if(response.status==429){
                window.alert("Too many requests please try again in 15 minutes")
            }
            return response.json()
        }).then(json=>{
            console.log(json)
            var innerP = document.createElement("span");
            innerP.style.color = "#0073A6";
            innerP.innerHTML = json.name
            WelcHed.innerHTML = "Welcome " 
            WelcHed.appendChild(innerP)
            
        })

// else{
//     redirectOnError("main","Not signed in!Redirecting to sign in page!", `${globalVariables.frontendLoc}signin.html`);
// }


