 function loadJSON(Json, key1, key2, key3=null, key4){
    var myGroups = [];
    //returns object not array!
   
   console.log(Json.users)
    Json[key4].forEach(element => {
     
       var myObj = {[`${key1}`]:element[key1], [`${key2}`]:element[key2], [`${key3}`]:element[key3]}
       myGroups.push(myObj)
    });
    console.log(myGroups)
    return myGroups;
}
export default loadJSON