const DELETED = [];
let STORAGE = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Your browser doesn't support Local Storage, try another browser such Mozilla Firefox or Google Chrome or update your browser");
        return false;
    } 
    return true;
}

function updateDataToStorage(){
    // Data/Value dalam array STORAGE akan diubah menjadi string dan dimasukkan ke dalam
    // WEB STORAGE

    let convertToString = JSON.stringify(STORAGE);
    localStorage.setItem("book", convertToString);
}

document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("book")
})