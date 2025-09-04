var preloader = document.getElementById("preloader")
var afterload = document.getElementById("afterLoad")
const interval = window.setInterval(()=>{
    console.log(sessionStorage.getItem("loadedTasks"), sessionStorage.getItem("loadedGroups"))
    if(sessionStorage.getItem("loadedTasks") && sessionStorage.getItem("loadedGroups")){
        preloader.style.display = "none"
        afterload.style.display = "block"
        clearInterval(interval)
    }
    
},1000)
