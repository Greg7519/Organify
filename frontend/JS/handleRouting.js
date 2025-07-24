
window.redirectOnError =function redirectOnError(locName, msg, redLoc){
    if(window.location.href.includes(locName) &&(sessionStorage.getItem("username") == null || sessionStorage.getItem("username")== undefined) ){
        const header = document.getElementById("errorHeader");
        header.innerHTML =msg;
        setTimeout(()=>{
            window.location.replace(redLoc)
        
        },1000)
    }

}
// redirectOnError("main","Not signed in!Redirecting to sign in page!");
// redirectOnError("verify","Not pending any verify request!Redirecting to sign in page!");