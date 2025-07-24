import globalVars from "./global.js"
const globalVariables = globalVars();
const errorHeader = document.getElementById("errorHeader");
const hiddenInels = document.getElementById("hiddenInEls")
await fetch(`${globalVariables.serverLoc}checkVer`,{
            method:'GET',
            
            headers: {
                "Accept": 'html/text',
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "http://127.0.0.1:3000/checkVer"
                
            },
            credentials:"include"
        }).then((resp) =>{
            return resp.json()
        }).then((json)=>{
            console.log(json.redirect)
            if(json.redirect){
                window.location.href = `${globalVariables.frontendLoc}signin.html`
            }
            else{
                hiddenInels.style.display="block"
            }
               
            
        })