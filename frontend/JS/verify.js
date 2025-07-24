import globalVars from "./global.js"
const globalVariables = globalVars();
 const header1 = document.getElementById("statusVer");
 var checkInt;
window.awaitverify =  async() =>{
      if(header1.innerHTML.length ==0){
        header1.innerHTML = "Please verify your email"
      }
       
      fetch(`${globalVariables.serverLoc}verify`).then((response)=>{
        if(response.redirected){
            header1.innerHTML = "Email verified"
            setTimeout(()=>{
              window.location.href = response.url
              window.close()
            },1000)
            
        }
        
      })
      
}
checkInt = setInterval(()=>{
    awaitverify()
},500)
// async returns a promise sos!
// checkInt = setInterval(()=>{
//          awaitVerfiication().then(()=>{
//             hasVer = true
//             header1.innerHTML = "Email Verified"
//             setTimeout(() => {
//                 window.location.replace("http://127.0.0.1:5501/main.html")
//             }, 1000);
//          }).catch(()=>{
//             header1.innerHTML = "Email not verified!"
//          })

// },500)

         



    
