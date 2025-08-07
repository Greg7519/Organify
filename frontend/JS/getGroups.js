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
            groupsHead.style.textAlign = "center"
            groupsHead.innerHTML = "Groups:"
            group.appendChild(groupsHead)
            myGroups.forEach((element, ind) => {
                 
                const GroupDiv = document.createElement("div")
                const GroupText = document.createElement("div")
                const BtnCont = document.createElement("div")
                GroupDiv.classList.add("group");
                GroupText.classList.add("groupText")
                group.appendChild(GroupDiv);
                const GroupHeader = document.createElement("h3")
                const pHeader = document.createElement("p")
                const myBtn = document.createElement("button")
                BtnCont.classList.add("alignVert")
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
                pHeader.innerHTML = "Administrator: " + element.admin + " Users: "
                pHeader.style.color = "white";
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

                GroupHeader.style.color="white"
                GroupText.appendChild(GroupHeader)
                GroupText.appendChild(pHeader)
                GroupDiv.append(GroupText)
                GroupDiv.appendChild(BtnCont)
                // groupHeader.innerHTML = element.groupName
                // pHed.innerHTML = "Administrator: " + element.admin
            });
            if(myGroups.length==0){
                GroupHed.innerHTML="You arent part of any groups!"
            }
            //   var clone = document.body.cloneNode(".group")
            //     document.body.appendChild(clone)
        })
