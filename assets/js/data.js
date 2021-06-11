const DELETED = [];
let STORAGE = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false;
    } 
    return true;
}

function saveDataToStorage(){
    let convertToString = JSON.stringify(STORAGE);
    localStorage.setItem("book", convertToString);
}

function removeDataFromStorage() {
    let convertToString = JSON.stringify(STORAGE);
    localStorage.setItem("book", convertToString);
}

document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("book")
})