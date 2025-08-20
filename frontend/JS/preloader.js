var preloader = document.getElementById("preloader")
var afterload = document.getElementById("afterLoad")
const interval = window.setInterval(()=>{
    console.log(sessionStorage.getItem("loaded"))
    if(sessionStorage.getItem("loaded")){
        preloader.style.display = "none"
        afterload.style.display = "block"
        clearInterval(interval)
    }
    
},1000)
