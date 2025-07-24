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
            return response.json()
        }).then(json=>{
            console.log(json)
        
            WelcHed.innerHTML = "Welcome " +  json.name
            
        })

// else{
//     redirectOnError("main","Not signed in!Redirecting to sign in page!", `${globalVariables.frontendLoc}signin.html`);
// }


