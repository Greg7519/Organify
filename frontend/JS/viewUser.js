console.log(sessionStorage.getItem("username"));
import globalVars from "./global.js"
import loadJSON from "./loadJSON.js"
const globalVariables = globalVars();
const groupHeader = document.getElementById("groupName")
const WelcHed = document.getElementById("welcomeHeader")
const GroupHed = document.getElementById("groupsNotFound");
const pHed = document.getElementById("users")
const groupCont = document.getElementById("groupCont")
const myUsers = JSON.parse(sessionStorage.getItem("groupUsers"))

          
            console.log(myUsers)
            myUsers.forEach((element, ind) => {
                const group = document.createElement("div");
            
                const alignHor = document.createElement("div");
                alignHor.classList.add("alignHor")  
                const p = document.createElement("p");
                p.style.color = "white";
                p.innerHTML ="User: " + element;
                p.classList.add("GroupHeader")
                const alignVert = document.createElement("div");
                alignVert.classList.add("alignVert")
                const anchor = document.createElement("a");
                anchor.href= `${globalVariables.frontendLoc}addTask.html`
                const btn = document.createElement("button");
                anchor.appendChild(btn)
                btn.style.margin = "5px";
                btn.classList.add("btnGroup");
                btn.onclick =()=>{
                      
                    sessionStorage.setItem("currUser", element);
                    

                }
                btn.innerHTML = "Add task"
                alignHor.appendChild(p);
                alignHor.appendChild(alignVert);
                alignVert.appendChild(anchor);
                group.appendChild(alignHor)

                groupCont.appendChild(group)
                group.id= "group-" + ind
                group.classList.add("groups");
                group.style.width ="95%"
                group.style.marginLeft = "2.5%"
                // GroupText.appendChild(BtnCont)
                var groups= $(".groups") 
                  var GroupHeads = $(".GroupHeader")
                var myBtns = $(".btnGroup")
                myBtns.addClass("text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-5 ")
                var GroupHeads = $(".GroupHeader")
                GroupHeads.addClass("ml-5 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm  text-left")
                groups.addClass("relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96");
               
                // GroupHeads.style.width = "fit-content"
               
                // var myBtns = $(".btnGroup")
                // myBtns.addClass("text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2")
             

            })
            //   var clone = document.body.cloneNode(".group")
            //     document.body.appendChild(clone)
        