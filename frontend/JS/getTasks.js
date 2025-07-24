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

await fetch(`${globalVariables.serverLoc}getTasks`,{method:'GET',
            
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
            
            
            var myTasks = loadJSON(json, "name", "title","dateDue", "tasks")
            console.log(myTasks)
           
             if(myTasks.length==0){
                taskHeader.innerHTML="You dont have any tasks available!"
                document.body.appendChild(taskHeader)
            }
            else{
                const taskHeader = document.createElement("h2")
                taskHeader.innerHTML="Tasks: "
                taskHeader.style.textAlign = "center"
                myTasks.forEach((element, ind) => {
                
                const GroupDiv = document.createElement("div")
                const GroupText = document.createElement("div")
                if(ind ==0){
                   group.appendChild(taskHeader)
                }
                const BtnCont = document.createElement("div")
                GroupDiv.classList.add("group");
                GroupText.classList.add("groupText")
                group.appendChild(GroupDiv);
                const GroupHeader = document.createElement("h3")
                const pHeader = document.createElement("p")
              
              
                GroupHeader.innerHTML ="Task: " + element.title
                pHeader.innerHTML = "Date due: " + element.dateDue
                pHeader.style.color = "white";
             
                
                GroupHeader.style.color="white"
                GroupText.appendChild(GroupHeader)
                GroupText.appendChild(pHeader)
                GroupDiv.append(GroupText)
                GroupDiv.appendChild(BtnCont)
                // groupHeader.innerHTML = element.groupName
                // pHed.innerHTML = "Administrator: " + element.admin
            });
            }
           
           
            //   var clone = document.body.cloneNode(".group")
            //     document.body.appendChild(clone)
        })
