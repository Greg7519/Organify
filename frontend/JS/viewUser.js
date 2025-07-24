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
                group.classList.add("group");
                const alignHor = document.createElement("div");
                alignHor.classList.add("alignHor")  
                const p = document.createElement("p");
                p.style.color = "white";
                p.innerHTML ="User: " + element;
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

            })
            //   var clone = document.body.cloneNode(".group")
            //     document.body.appendChild(clone)
        