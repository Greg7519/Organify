import globalVars from "./global.js"
const globalVariables = globalVars();
const form= document.getElementById("dataForm");
const header = document.getElementById("infoHeader")
const addBtn = document.getElementById("searchIcon");
form.addEventListener("submit", async(e) =>{
          e.preventDefault()
          const dataForm = new FormData(form);
          const data = new URLSearchParams(dataForm).toString()
          const response=await fetch(`${globalVariables.serverLoc}addUsers`,{
            method:'POST',
            body:data,
              mode:"cors",
            credentials:"include",
            headers: {
                "Accept": 'html/text',
                "Content-Type": "application/x-www-form-urlencoded",
               
            }
        }).then((resp)=>{
            console.log(resp.status)
            if(resp.redirected){
                window.location.href = resp.url
            }
            if(resp.status == 404){
                header.innerHTML = 'Not found!'
            }
            else{
                header.innerHTML =  dataForm.get("user") + " added"
            }
            
            console.log(header.value)
           
            // must return here for later!
            return resp.json()
        }).then((txt)=>{
            console.log(txt.created)
           
            
            

        })})
    
        
