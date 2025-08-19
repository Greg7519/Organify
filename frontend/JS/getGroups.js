console.log(sessionStorage.getItem("username"));
import globalVars from "./global.js"
import loadJSON from "./loadJSON.js"
const globalVariables = globalVars();
const groupHeader = document.getElementById("groupName")
const WelcHed = document.getElementById("welcomeHeader")
const GroupHed = document.getElementById("groupsNotFound");
const pHed = document.getElementById("users")
const group = document.getElementById("groupCont")
const allUsernames = []

await fetch(`${globalVariables.serverLoc}getUserGroups`,{method:'GET',
            
            headers: {
                "Accept": 'html/text',
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": `${globalVariables.serverLoc}`
                
            },
            mode:"cors",
            credentials:"include"
        }).then(response=>{
            
            return response.json()
        }).then(json=>{
          
            var myGroups = loadJSON(json, "name", "admin","users", "users")
            console.log(myGroups)
            var usernames = [];
            var groupsHead = document.createElement("h2");
            group.appendChild(groupsHead)
            groupsHead.id = "groupHead"
            groupsHead.style.textAlign = "center"
            groupsHead.innerHTML = "Groups:"
            groupsHead = $("#groupHead")
            groupsHead.addClass("mb-6 text-lg font-bold text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400")
            
            myGroups.forEach((element, ind) => {
                 
                const GroupDiv = document.createElement("div")
                const GroupText = document.createElement("div")
               
                GroupText.classList.add("p-6")
                const BtnCont = document.createElement("div")
                GroupDiv.classList.add("groups")
                GroupDiv.id= "group-" + ind
                console.log(GroupDiv.id)
                var myStr = GroupDiv.id
                
                group.appendChild(GroupDiv);
                const GroupHeader = document.createElement("h4")
                GroupHeader.classList.add('GroupHeader')
                GroupDiv.style.justifyContent = "space-between"
                GroupDiv.style.width ="95%"
                GroupDiv.style.marginLeft = "2.5%"
                const pHeader = document.createElement("p")
                const myBtn = document.createElement("button")

                myBtn.classList.add("btnGroup");
                
               
                myBtn.style.backgroundColor = "orangered"
                const anchor = document.createElement("a")
                anchor.href= `${globalVariables.frontendLoc}viewUsers.html`
               
                anchor.appendChild(myBtn)
                myBtn.innerHTML = "View group>>"
                BtnCont.appendChild(anchor);
                myBtn.id = ind;
                myBtn.onclick = ()=>{
                    
                    sessionStorage.setItem("groupUsers",JSON.stringify(element.users))
                   
                    console.log(ind)
                }
              
                GroupHeader.innerHTML = element.name
                pHeader.classList.add("par");
                pHeader.innerHTML = "Administrator: " + element.admin + " Users: "
                
                if(element.users.length==0){
                     pHeader.innerHTML += "None"
                }
                else{
                    element.users.forEach((val, ind, arr)=>{
                    
                        pHeader.innerHTML += val;
                        usernames.push(val)
                })
                }
                
               
                
              
                allUsernames.push(usernames);

                
                GroupText.appendChild(GroupHeader)
                GroupText.appendChild(pHeader)
                GroupDiv.append(GroupText)
                GroupText.appendChild(BtnCont)
                var groups= $(".groups") 
                var pars = $(".par");
                pars.addClass(" mb-5 text-slate-600 leading-normal font-light")
                groups.addClass("relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96");
                GroupText.classList.add("groupText")
                GroupHeader.style.width = "fit-content"
                var GroupHeads = $(".GroupHeader")
                var myBtns = $(".btnGroup")
                myBtns.addClass("text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2")
                GroupHeads.addClass("mb-5 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm  text-left")
                
                // groupHeader.innerHTML = element.groupName
                // pHed.innerHTML = "Administrator: " + element.admin
            });
            if(myGroups.length==0){
                GroupHed.innerHTML="You arent part of any groups!"
            }
            //   var clone = document.body.cloneNode(".group")
            //     document.body.appendChild(clone)
        })
