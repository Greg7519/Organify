function updateElement(elemJS,elemQuery, classes, placeholderVal=null){
    elemJS.value = ""
    elemJS.removeAttribute("class")
    elemQuery.addClass(classes)
    if(placeholderVal!=null){
        elemJS.placeholder = placeholderVal
    }
    
}
export default updateElement