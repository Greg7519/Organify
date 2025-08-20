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
              
              
               
                myTasks.forEach((element, ind) => {
                
                var GroupDiv = document.createElement("div")
                GroupDiv.classList.add("task")
                const GroupText = document.createElement("div")
                if(ind ==0){
                      var taskHeader = document.createElement("h2")
                        taskHeader.innerHTML="Tasks: "
                        taskHeader.style.textAlign ="center"
                        group.appendChild(taskHeader)
                        taskHeader.id = "TaskGroup"
                        taskHeader = $("#TaskGroup");
                        taskHeader.addClass("mb-6 text-lg font-bold text-emerald-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400")
                   
                }
                const BtnCont = document.createElement("div")
              
                GroupText.classList.add("groupText")
                group.appendChild(GroupDiv);
                var GroupHeader = document.createElement("h3")
                GroupHeader.classList.add("taskTitle")
                const pHeader = document.createElement("p")
                GroupDiv.style.width = "95%"
                GroupDiv.style.marginLeft = "2.5%"
              
                GroupHeader.innerHTML ="Task: " + element.title
                pHeader.innerHTML = "Date due: " + element.dateDue
                pHeader.classList.add("dateDue")
                
                GroupHeader.style.color="white"
                GroupText.classList.add("p-6")
                GroupText.appendChild(GroupHeader)
                GroupText.appendChild(pHeader)
                GroupDiv.append(GroupText)
                GroupDiv = $(".task")
                
                var pars = $(".dateDue");
                pars.addClass(" mb-5 text-slate-600 leading-normal font-light")
                GroupHeader = $(".taskTitle")
                GroupHeader.addClass("mb-5 rounded-full bg-orange-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-40 text-center")
                
                // groupHeader.innerHTML = element.groupName
                GroupDiv.addClass("relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96")
                if(ind == myTasks.length-1){
                    sessionStorage.setItem("loaded", true)
                }
                // GroupDivOg.appendChild(BtnCont)
                // groupHeader.innerHTML = element.groupName
                // pHed.innerHTML = "Administrator: " + element.admin
            });
            }
           
           
            //   var clone = document.body.cloneNode(".group")
            //     document.body.appendChild(clone)
        })
