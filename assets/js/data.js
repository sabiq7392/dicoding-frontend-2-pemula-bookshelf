function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

function saveDataToStorage(){ // belom dites
    let convertToString = JSON.stringify(STORAGE);
    localStorage.setItem("book", convertToString);
}
